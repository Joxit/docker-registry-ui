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
<add>
  <material-popup>
   <div class="material-popup-title">Add your Server ?</div>
   <div class="material-popup-content">
     <material-input ref="test" placeholder="Server URL"></material-input>
   </div>
   <div class="material-popup-action">
     <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onClick="registryUI.addTag.add();">Add</material-button>
     <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onClick="registryUI.addTag.close();">Cancel</material-button>
   </div>
  </material-popup>

  <script type="text/javascript">
    registryUI.addTag = registryUI.addTag || {};
    registryUI.addTag.update = this.update;
    this.one('mount', function () {
      registryUI.addTag.dialog = this.tags['material-popup'];
      registryUI.addTag.dialog.one('updated', function() {
        registryUI.addTag.addServer = registryUI.addTag.dialog.tags['material-input'];
        registryUI.addTag.addServer.onkeyup = function (e) {
          // if keyCode is Enter
          if (e.keyCode == 13) {
            registryUI.addTag.add();
          }
        };
      });
    });
    registryUI.addTag.show = function () {
      registryUI.addTag.dialog.open();
    };
    registryUI.addTag.add = function () {
      if (registryUI.addTag.addServer.value && registryUI.addTag.addServer.value.length > 0) {
        registryUI.addServer(registryUI.addTag.addServer.value);
      }
      registryUI.addTag.addServer.value = '';
      rg.router.go('home');
      registryUI.addTag.dialog.close();
    };
    registryUI.addTag.close = function () {
      registryUI.addTag.addServer.value = '';
      registryUI.addTag.dialog.close();
    };
  </script>
</add>
