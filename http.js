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
}

Http.prototype.addEventListener = function(e, f) {
  this._events[e] = f;
  switch (e) {
    case 'loadend':
      {
        this.oReq.addEventListener('loadend', function() {
          if (this.status == 401) {
            var req = new XMLHttpRequest();
            for (key in this.http._events) {
              req.addEventListener(key, this.http._events[key]);
            }
            req.withCredentials = true;
            req.open(this.http._method, this.http._url);
            req.send();
          } else {
            f.bind(this.oReq);
          }
        });
        break;
      }
    default:
      {
        this.oReq.addEventListener(e, function() {
          f.bind(this.oReq);
        });
        break;
      }
  }
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
