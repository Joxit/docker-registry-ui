<!--
 Copyright (C) 2016  Jones Magloire @Joxit

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->
<catalog>
  <!-- Begin of tag -->
  <div id="catalog-tag" class="catalog">
    <div class="section-centerd mdl-card mdl-shadow--2dp mdl-cell--6-col">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Repositories of { registryUI.url() }</h2>
      </div>
      <div id="catalog-spinner" style="{ registryUI.catalog.loadend ? 'display:none;': '' }" class="mdl-spinner mdl-js-spinner is-active section-centerd"></div>
      <ul class="mdl-list">
        <li class="mdl-list__item mdl-menu__item" style="opacity: 1;" each="{ item in registryUI.catalog.repositories }" onclick="registryUI.catalog.go('{item}');">
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-icon">send</i>
            { item }
          </span>
        </li>
      </ul>
    </div>
    <div id="error-snackbar" aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>
  </div>

  <script>
    registryUI.catalog.instance = this;
    this.mixin('rg.router');
    registryUI.catalog.display = function () {
      var oReq = new XMLHttpRequest();
      registryUI.catalog.createSnackbar = function (msg) {
        var snackbar = document.querySelector('#error-snackbar');
        registryUI.catalog.error = msg;
        var data = {
          message: registryUI.catalog.error,
          timeout: 100000,
          actionHandler: function () {
            snackbar.classList.remove('mdl-snackbar--active');
          },
          actionText: 'Undo'
        };
        snackbar.MaterialSnackbar.showSnackbar(data);
      };
      oReq.addEventListener('load', function () {
        if (this.status == 200) {
          registryUI.catalog.repositories = JSON.parse(this.responseText).repositories.sort();
        } else if (this.status == 404) {
          registryUI.catalog.createSnackbar('Server not found');
        } else {
          registryUI.catalog.createSnackbar(this.responseText);
        }
      });
      oReq.addEventListener('error', function () {
        registryUI.catalog.createSnackbar('An error occured');
      });
      oReq.addEventListener('loadend', function () {
        registryUI.catalog.loadend = true;
        registryUI.catalog.instance.update();
      });
      oReq.open('GET', registryUI.url() + '/v2/_catalog');
      oReq.withCredentials = false;
      oReq.send();
    };
    this.on('updated', function () {
      componentHandler.upgradeElements(this['catalog-tag']);
    });
    registryUI.catalog.go = function (image) {
      rg.router.go('taglist', {
        repository: image.split('/')[0],
        image: image.split('/')[1]
      });
    };
    registryUI.catalog.display();
  </script>
  <!-- End of tag -->
</catalog>
