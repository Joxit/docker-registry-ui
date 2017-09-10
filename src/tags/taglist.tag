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
<taglist>
  <!-- Begin of tag -->
  <div ref="taglist-tag" class="taglist">
    <div class="section-centerd mdl-card mdl-shadow--2dp mdl-cell--6-col">
      <div class="mdl-card__title">
        <a href="#" onclick="registryUI.taglist.back();">
          <i class="material-icons mdl-list__item-icon">arrow_back</i>
        </a>
        <h2 class="mdl-card__title-text">Tags of { registryUI.url() + '/' + registryUI.taglist.name }</h2>
      </div>
      <div ref="taglist-spinner" hide="{ registryUI.taglist.loadend }" class="mdl-spinner mdl-js-spinner section-centerd is-active"></div>
      <table class="mdl-data-table mdl-js-data-table full-table" show="{ registryUI.taglist.loadend }" style="border: none;">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Repository</th>
            <th class="{ registryUI.taglist.asc ? 'mdl-data-table__header--sorted-ascending' : 'mdl-data-table__header--sorted-descending' }" onclick="registryUI.taglist.reverse();">Tag</th>
            <th show="{ registryUI.isImageRemoveActivated }" ></th>
          </tr>
        </thead>
        <tbody>
          <tr each="{ item in registryUI.taglist.tags }">
            <td class="mdl-data-table__cell--non-numeric">{ registryUI.taglist.name }</td>
            <td>{ item }</td>
            <td show="{ registryUI.isImageRemoveActivated }" >
              <remove-image name={ registryUI.taglist.name } tag={ item } />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div ref="error-snackbar" aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>
  </div>

  <script>
    registryUI.taglist.instance = this;
    registryUI.taglist.display = function () {
      if (rg.router.current && rg.router.current.name == 'taglist') {
        name = rg.router.current.params.repository + (rg.router.current.params.image
          ? '/' + rg.router.current.params.image
          : '');
        var oReq = new Http();
        registryUI.taglist.name = name;
        registryUI.taglist.instance.update();
        registryUI.taglist.createSnackbar = function (msg) {
          var snackbar = registryUI.taglist.instance['error-snackbar'];
          registryUI.taglist.error = msg;
          var data = {
            message: registryUI.taglist.error,
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
            registryUI.taglist.tags = JSON.parse(this.responseText).tags || [];
            registryUI.taglist.tags.sort();
          } else if (this.status == 404) {
            registryUI.taglist.createSnackbar('Server not found');
          } else {
            registryUI.taglist.createSnackbar(this.responseText);
          }
        });
        oReq.addEventListener('error', function () {
          registryUI.taglist.createSnackbar('An error occured');
        });
        oReq.addEventListener('loadend', function () {
          registryUI.taglist.loadend = true;
          registryUI.taglist.instance.update();
        });
        oReq.open('GET', registryUI.url() + '/v2/' + name + '/tags/list');
        oReq.send();
        registryUI.taglist.asc = true;
      }
    };
    registryUI.taglist.display();
    registryUI.taglist.instance.update();
    this.on('updated', function () {
      componentHandler.upgradeElements(this.refs['taglist-tag']);
    });

    registryUI.taglist.reverse = function () {
      if (registryUI.taglist.asc) {
        registryUI.taglist.tags.reverse();
        registryUI.taglist.asc = false;
      } else {
        registryUI.taglist.tags.sort();
        registryUI.taglist.asc = true;
      }
      registryUI.taglist.instance.update();
    };
    registryUI.taglist.back = function () {
      rg.router.go('home');
    };
    registryUI.taglist.refresh = function () {
      rg.router.go(rg.router.current.name, rg.router.current.params);
    };
  </script>
  <!-- End of tag -->
</taglist>