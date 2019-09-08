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
var registryUI = {}
registryUI.url = function() {
  var url = '${URL}';
  if (!url) {
    url = window.location.origin + window.location.pathname;
    return url.endsWith('/') ? url.substr(0, url.length - 1) : url;
  }
  return url;
};
registryUI.name = function() {
  const name = '${REGISTRY_TITLE}';
  if (name) {
    // the user can strip the http prefix if they wish
    return name;
  }
  return registryUI.stripHttps(registryUI.url());
};
registryUI.pullUrl = '${PULL_URL}';
registryUI.isImageRemoveActivated = true;
registryUI.catalog = {};
registryUI.taglist = {};
registryUI.taghistory = {};

window.addEventListener('DOMContentLoaded', function() {
  riot.mount('*');
});
