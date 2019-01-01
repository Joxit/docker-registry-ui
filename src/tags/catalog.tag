<!--
Copyright (C) 2016-2018 Jones Magloire @Joxit

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
-->
<catalog>
  <!-- Begin of tag -->
  <material-card ref="catalog-tag" class="catalog">
    <div class="material-card-title-action">
      <h2>
        Repositories of { registryUI.name() }
        <div class="item-count">{ registryUI.catalog.repositories.length } images</div>
      </h2>
    </div>
    <div hide="{ registryUI.catalog.loadend }" class="spinner-wrapper">
      <material-spinner></material-spinner>
    </div>
  </material-card>
  <material-card each="{ item in registryUI.catalog.repositories }" class="list highlight" onclick="registryUI.taglist.go('{item}');">
    <span>
      <i class="material-icons">send</i>
      { item }
    </span>
  </material-card>
  <script>
    registryUI.catalog.instance = this;
    registryUI.catalog.display = function() {
      registryUI.catalog.repositories = [];
      const oReq = new Http();
      oReq.addEventListener('load', function() {
        registryUI.catalog.repositories = [];
        if (this.status == 200) {
          registryUI.catalog.repositories = JSON.parse(this.responseText).repositories || [];
          registryUI.catalog.repositories.sort();
        } else if (this.status == 404) {
          registryUI.snackbar('Server not found', true);
        } else {
          registryUI.snackbar(this.responseText);
        }
      });
      oReq.addEventListener('error', function() {
        registryUI.snackbar(this.getErrorMessage(), true);
        registryUI.catalog.repositories = [];
      });
      oReq.addEventListener('loadend', function() {
        registryUI.catalog.loadend = true;
        registryUI.catalog.instance.update();
      });
      oReq.open('GET', registryUI.url() + '/v2/_catalog?n=100000');
      oReq.send();
    };
    registryUI.catalog.display();
  </script>
  <!-- End of tag -->
</catalog>
