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
  <material-card ref="taglist-tag" class="taglist">
    <div class="material-card-title-action">
      <a href="#!" onclick="registryUI.home();">
        <i class="material-icons">arrow_back</i>
      </a>
      <h2>Tags of { registryUI.name() + '/' + registryUI.taglist.name }</h2>
    </div>
    <div hide="{ registryUI.taglist.loadend }" class="spinner-wrapper">
      <material-spinner></material-spinner>
    </div>
    <table show="{ registryUI.taglist.loadend }" style="border: none;">
      <thead>
        <tr>
          <th class="material-card-th-left">Repository</th>
          <th></th>
          <th>Size</th>
          <th class="{ registryUI.taglist.asc ? 'material-card-th-sorted-ascending' : 'material-card-th-sorted-descending' }" onclick="registryUI.taglist.reverse();">Tag</th>
          <th show="{ registryUI.isImageRemoveActivated }"></th>
        </tr>
      </thead>
      <tbody>
        <tr each="{ item in registryUI.taglist.tags }">
          <td class="material-card-th-left">{ registryUI.taglist.name }</td>
          <td class="copy-to-clipboard">
            <copy-to-clipboard name={ registryUI.taglist.name } tag={ item }/>
          </td>
          <td><image-size name={ registryUI.taglist.name } tag={ item } /></td>
          <td>{ item }</td>
          <td show="{ registryUI.isImageRemoveActivated }">
            <remove-image name={ registryUI.taglist.name } tag={ item }/>
          </td>
        </tr>
      </tbody>
    </table>
  </material-card>
  <script>
    registryUI.taglist.instance = this;
    registryUI.taglist.display = function () {
      registryUI.taglist.tags = [];
      if (route.routeName == 'taglist') {
        var oReq = new Http();
        registryUI.taglist.instance.update();
        oReq.addEventListener('load', function () {
          registryUI.taglist.tags = [];
          if (this.status == 200) {
            registryUI.taglist.tags = JSON.parse(this.responseText).tags || [];
            registryUI.taglist.tags.sort();
          } else if (this.status == 404) {
            registryUI.snackbar('Server not found', true);
          } else {
            registryUI.snackbar(this.responseText, true);
          }
        });
        oReq.addEventListener('error', function () {
          registryUI.snackbar(this.getErrorMessage(), true);
            registryUI.taglist.tags = [];
        });
        oReq.addEventListener('loadend', function () {
          registryUI.taglist.loadend = true;
          registryUI.taglist.instance.update();
        });
        oReq.open('GET', registryUI.url() + '/v2/' + registryUI.taglist.name + '/tags/list');
        oReq.send();
        registryUI.taglist.asc = true;
      }
    };
    registryUI.taglist.display();
    registryUI.taglist.instance.update();

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
    registryUI.taglist.refresh = function () {
      route(registryUI.taglist.name);
    };
  </script>
  <!-- End of tag -->
</taglist>