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
<change>
<dialog id="change-server-dialog" class="mdl-dialog">
<h4 class="mdl-dialog__title">Change your Server ?</h4>
<div class="mdl-dialog__content">
 <div class="mdl-textfield mdl-js-textfield">
  <select class="mdl-textfield__input mdl-textfield__select" name="server-list" id="server-list">
   <option each="{ url in registryUI.url() }" value={url}>{url}</option>
  </select>
 </div>
</div>
<div class="mdl-dialog__actions">
 <button type="button" class="mdl-button change" onClick="registryUI.changeTag.change();">Change</button>
 <button type="button" class="mdl-button close" onClick="registryUI.changeTag.close();">Cancel</button>
</div>
</dialog> <script type="text/javascript">
registryUI.changeTag = registryUI.changeTag || {};
registryUI.changeTag.update = this.update;
this.on('updated', function () {
  componentHandler.upgradeElements(this['change-server-dialog']);
  registryUI.changeTag.dialog = registryUI.changeTag.dialog
      || document.querySelector('#change-server-dialog');
  registryUI.changeTag.tileServerList = registryUI.changeTag.tileServerList
      || registryUI.changeTag.dialog.querySelector('#server-list');
  if (!registryUI.changeTag.dialog.showModal) {
    dialogPolyfill.registerDialog(registryUI.changeTag.dialog);
  }
});
registryUI.changeTag.show = function() {
  registryUI.changeTag.dialog.showModal();
};
registryUI.changeTag.change = function() {
  registryUI.changeTag.dialog.close();
};
registryUI.changeTag.close = function() {
  registryUI.changeTag.dialog.close();
};
</script>
</change>
