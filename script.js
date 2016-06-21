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
var registryUI = {}
registryUI.url = function() {
  return registryUI.getRegistryServer(0);
}
registryUI.getRegistryServer = function(i) {
  try {
    var res = JSON.parse(localStorage.getItem('registryServer'));
    if (res instanceof Array) {
      return (!isNaN(i)) ? res[i] : res.map(function(url) {
        return url.trim().replace(/\/*$/, '');
      });
    }
  } catch (e) {}
  return (!isNaN(i)) ? '' : [];
}
registryUI.addServer = function(url) {
  var registryServer = registryUI.getRegistryServer();
  url = url.trim().replace(/\/*$/, '');
  var index = registryServer.indexOf(url);
  if (index != -1) {
    return;
  }
  registryServer.push(url);
  localStorage.setItem('registryServer', JSON.stringify(registryServer));
}
registryUI.changeServer = function(url) {
  var registryServer = registryUI.getRegistryServer();
  url = url.trim().replace(/\/*$/, '');
  var index = registryServer.indexOf(url);
  if (index == -1) {
    return;
  }
  registryServer.splice(index, 1);
  registryServer = [url].concat(registryServer);
  localStorage.setItem('registryServer', JSON.stringify(registryServer));
}
registryUI.removeServer = function(url) {
  var registryServer = registryUI.getRegistryServer();
  url = url.trim().replace(/\/*$/, '');
  var index = registryServer.indexOf(url);
  if (index == -1) {
    return;
  }
  registryServer.splice(index, 1);
  localStorage.setItem('registryServer', JSON.stringify(registryServer));
}
registryUI.catalog = {};
registryUI.taglist = {};

riot.mount('add');
riot.mount('change');
riot.mount('remove');
riot.mount('menu');
riot.mount('app');
