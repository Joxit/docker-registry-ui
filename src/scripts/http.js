/*
 * Copyright (C) 2016-2019 Jones Magloire @Joxit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function Http() {
  this.oReq = new XMLHttpRequest();
  this.oReq.hasHeader = Http.hasHeader;
  this.oReq.getErrorMessage = Http.getErrorMessage;
  this._events = {};
  this._headers = {};
}

Http.prototype.getContentDigest = function(cb) {
  if (this.oReq.hasHeader('Docker-Content-Digest')) {
    // Same origin or advanced CORS headers set:
    // 'Access-Control-Expose-Headers: Docker-Content-Digest'
    cb(this.oReq.getResponseHeader('Docker-Content-Digest'))
  } else if (window.crypto && window.TextEncoder) {
    crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(this.oReq.responseText)
    ).then(function (buffer) {
      cb(
        'sha256:' + Array.from(
          new Uint8Array(buffer)
        ).map(function(byte) {
          return byte.toString(16).padStart(2, '0');
        }).join('')
      );
    })
  } else {
    // IE and old Edge
    // simply do not call the callback and skip the setup downstream
  }
};

Http.prototype.addEventListener = function(e, f) {
  this._events[e] = f;
  const self = this;
  switch (e) {
    case 'loadend':
      {
        self.oReq.addEventListener('loadend', function() {
          if (this.status == 401) {
            const req = new XMLHttpRequest();
            req.open(self._method, self._url);
            for (key in self._events) {
              req.addEventListener(key, self._events[key]);
            }
            for (key in self._headers) {
              req.setRequestHeader(key, self._headers[key]);
            }
            req.withCredentials = true;
            req.hasHeader = Http.hasHeader;
            req.getErrorMessage = Http.getErrorMessage;
            self.oReq = req;
            req.send();
          } else {
            f.bind(this)();
          }
        });
        break;
      }
    case 'load':
      {
        self.oReq.addEventListener('load', function() {
          if (this.status !== 401) {
            f.bind(this)();
          }
        });
        break;
      }
    default:
      {
        self.oReq.addEventListener(e, function() {
          f.bind(this)();
        });
        break;
      }
  }
};

Http.prototype.setRequestHeader = function(header, value) {
  this.oReq.setRequestHeader(header, value);
  this._headers[header] = value;
};

Http.prototype.open = function(m, u) {
  this._method = m;
  this._url = u;
  this.oReq.open(m, u);
};

Http.prototype.send = function() {
  this.oReq.send();
};

Http.hasHeader = function(header) {
  return this.getAllResponseHeaders().split('\n').some(function(h) {
    return new RegExp('^' + header + ':', 'i').test(h);
  });
};

Http.getErrorMessage = function() {
  if (registryUI.url() && registryUI.url().match('^http://') && window.location.protocol === 'https:') {
    return 'Mixed Content: The page at `' + window.location.origin + '` was loaded over HTTPS, but requested an insecure server endpoint `' + registryUI.url() + '`. This request has been blocked; the content must be served over HTTPS.';
  } else if (!registryUI.url()) {
    return 'Incorrect server endpoint.';
  } else if (this.withCredentials && !this.hasHeader('Access-Control-Allow-Credentials')) {
    return 'The `Access-Control-Allow-Credentials` header in the response is missing and must be set to `true` when the request\'s credentials mode is on. Origin `'+ registryUI.url() +'` is therefore not allowed access.';
  }
  return 'An error occured: Check your connection and your registry must have `Access-Control-Allow-Origin` header set to `' + window.location.origin + '`';
};