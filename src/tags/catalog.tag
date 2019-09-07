<!--
Copyright (C) 2016-2019 Jones Magloire @Joxit

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
  <material-card ref="catalog-tag" class="catalog header">
    <div class="material-card-title-action">
      <h2>
        Repositories of { registryUI.name() }
        <div class="item-count">{ registryUI.catalog.length } images</div>
      </h2>
    </div>
  </material-card>
  <div hide="{ registryUI.catalog.loadend }" class="spinner-wrapper">
    <material-spinner></material-spinner>
  </div>
  <catalog-element each="{ item in registryUI.catalog.repositories }" />
  <script>
    registryUI.catalog.instance = this;
    registryUI.catalog.display = function() {
      registryUI.catalog.repositories = [];
      const oReq = new Http();
      oReq.addEventListener('load', function() {
        registryUI.catalog.repositories = [];
        if (this.status == 200) {
          if (!registryUI.url()) {
            registryUI._url = window.location.origin + window.location.pathname.replace(/\/+$/, '')
          }
          registryUI.catalog.repositories = JSON.parse(this.responseText).repositories || [];
          registryUI.catalog.repositories.sort();
          registryUI.catalog.length = registryUI.catalog.repositories.length;         registryUI.catalog.repositories = registryUI.catalog.repositories.reduce(function(acc, e) {
            const slash = e.indexOf('/');
            if (slash > 0) {
              const repoName = e.substring(0, slash) + '/';
              if (acc.length == 0 || acc[acc.length - 1].repo != repoName) {
                acc.push({repo: repoName, images: []});
              }
              acc[acc.length - 1].images.push(e);
              return acc;
            }
            acc.push(e);
            return acc;
          }, []);
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
