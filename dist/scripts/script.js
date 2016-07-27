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
function Http(){this.oReq=new XMLHttpRequest,this._events={}}Http.prototype.addEventListener=function(t,e){this._events[t]=e;var r=this;switch(t){case"loadend":r.oReq.addEventListener("loadend",function(){if(401==this.status){var t=new XMLHttpRequest;for(key in this.http._events)t.addEventListener(key,this.http._events[key]);t.withCredentials=!0,t.open(this.http._method,this.http._url),t.send()}else e.bind(this)()});break;default:r.oReq.addEventListener(t,function(){e.bind(this)()})}},Http.prototype.open=function(t,e){this._method=t,this._url=e,this.oReq.open(t,e)},Http.prototype.send=function(){this.oReq.http=this,this.oReq.send()};var registryUI={};registryUI.url=function(){return registryUI.getRegistryServer(0)},registryUI.getRegistryServer=function(t){try{var e=JSON.parse(localStorage.getItem("registryServer"));if(e instanceof Array)return isNaN(t)?e.map(function(t){return t.trim().replace(/\/*$/,"")}):e[t]}catch(r){}return isNaN(t)?[]:""},registryUI.addServer=function(t){var e=registryUI.getRegistryServer();t=t.trim().replace(/\/*$/,"");var r=e.indexOf(t);r==-1&&(e.push(t),localStorage.setItem("registryServer",JSON.stringify(e)))},registryUI.changeServer=function(t){var e=registryUI.getRegistryServer();t=t.trim().replace(/\/*$/,"");var r=e.indexOf(t);r!=-1&&(e.splice(r,1),e=[t].concat(e),localStorage.setItem("registryServer",JSON.stringify(e)))},registryUI.removeServer=function(t){var e=registryUI.getRegistryServer();t=t.trim().replace(/\/*$/,"");var r=e.indexOf(t);r!=-1&&(e.splice(r,1),localStorage.setItem("registryServer",JSON.stringify(e)))},registryUI.catalog={},registryUI.taglist={},riot.mount("add"),riot.mount("change"),riot.mount("remove"),riot.mount("menu"),riot.mount("app");