/*
 * Copyright (C) 2016  Jones Magloire @Joxit
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
  this._events = {};
  this._headers = {};
}

Http.prototype.addEventListener = function(e, f) {
  this._events[e] = f;
  var self = this;
  switch (e) {
    case 'loadend':
      {
        self.oReq.addEventListener('loadend', function() {
          if (this.status == 401) {
            var req = new XMLHttpRequest();
            for (key in this.http._events) {
              req.addEventListener(key, this.http._events[key]);
            }
            for (key in this.http._headers) {
              req.setRequestHeader(key, this.http._headers[key]);
            }
            req.withCredentials = true;
            req.open(this.http._method, this.http._url);
            req.send();
          } else {
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
  this.oReq.http = this;
  this.oReq.send();
};
