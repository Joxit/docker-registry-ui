<!--
 Copyright (C) 2016-2019 Jones Magloire @Joxit

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
<change>
  <material-popup>
    <div class="material-popup-title">Change your Server ?</div>
    <div class="material-popup-content">
      <div class="select-padding">
        <select class="mdl-textfield__input mdl-textfield__select" name="server-list" ref="server-list">
          <option each="{ url in registryUI.getRegistryServer() }" value={url}>{url}</option>
        </select>
      </div>
    </div>
    <div class="material-popup-action">
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onClick="registryUI.changeTag.change();">Change</material-button>
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onClick="registryUI.changeTag.close();">Cancel</material-button>
    </div>
  </material-popup>
  <script type="text/javascript">
    registryUI.changeTag = registryUI.changeTag || {};
    this.one('mount', function () {
      registryUI.changeTag.dialog = this.tags['material-popup'];
      registryUI.changeTag.dialog.getServerUrl = function () {
        return this.refs['server-list']
          ? this.refs['server-list'].value
          : '';
      };
      registryUI.changeTag.dialog.on('updated', function () {
        if (this.refs['server-list']) {
          this.refs['server-list'].value = registryUI.url();
        }
      });
    });
    registryUI.changeTag.show = function () {
      registryUI.changeTag.dialog.open();
    };
    registryUI.changeTag.change = function () {
      if (registryUI.changeTag.dialog.getServerUrl().length > 0) {
        registryUI.changeServer(registryUI.changeTag.dialog.getServerUrl());
      }
      registryUI.home();
      registryUI.changeTag.dialog.close();
    };
    registryUI.changeTag.close = function () {
      registryUI.changeTag.dialog.close();
    };
  </script>
</change>