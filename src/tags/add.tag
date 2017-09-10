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
  <dialog ref="add-server-dialog" class="mdl-dialog">
    <h4 class="mdl-dialog__title">Add your Server ?</h4>
    <div class="mdl-dialog__content">
      <div class="mdl-textfield mdl-js-textfield">
        <input class="mdl-textfield__input" type="text" ref="add-server-input">
        <label class="mdl-textfield__label" for="add-server-input">Server url</label>
      </div>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button change" onClick="registryUI.addTag.add();">Add</button>
      <button type="button" class="mdl-button close" onClick="registryUI.addTag.close();">Cancel</button>
    </div>
  </dialog>
  <script type="text/javascript">
    registryUI.addTag = registryUI.addTag || {};
    registryUI.addTag.update = this.update;
    this.on('updated', function () {
      registryUI.addTag.dialog = this.refs['add-server-dialog'];
      registryUI.addTag.addServer = this.refs['add-server-input'];
      componentHandler.upgradeElements(registryUI.addTag.dialog);
      if (!registryUI.addTag.dialog.showModal) {
        dialogPolyfill.registerDialog(registryUI.addTag.dialog);
      }
      this.refs['add-server-input'].onkeyup = function (e) {
        // if keyCode is Enter
        if (e.keyCode == 13) {
          registryUI.addTag.add();
        }
      };
    });
    registryUI.addTag.show = function () {
      registryUI.addTag.dialog.showModal();
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
    registryUI.addTag.update();
  </script>
</add>
