/*!
 * docker-registry-ui
 * Copyright (C) 2016  Jones Magloire @Joxit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
function Http(){this.oReq=new XMLHttpRequest,this._events={}}Http.prototype.addEventListener=function(t,e){this._events[t]=e;var i=this;switch(t){case"loadend":i.oReq.addEventListener("loadend",function(){if(401==this.status){var t=new XMLHttpRequest;for(key in this.http._events)t.addEventListener(key,this.http._events[key]);t.withCredentials=!0,t.open(this.http._method,this.http._url),t.send()}else e.bind(this)()});break;default:i.oReq.addEventListener(t,function(){e.bind(this)()})}},Http.prototype.open=function(t,e){this._method=t,this._url=e,this.oReq.open(t,e)},Http.prototype.send=function(){this.oReq.http=this,this.oReq.send()};var registryUI={};registryUI.url=function(){return"${URL}"},registryUI.catalog={},registryUI.taglist={},riot.mount("catalog"),riot.mount("taglist"),riot.mount("app");