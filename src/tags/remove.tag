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
<remove>
  <dialog ref="remove-server-dialog" class="mdl-dialog">
    <h4 class="mdl-dialog__title">Remove your Registry Server ?</h4>
    <div class="mdl-dialog__content">
      <div class="mdl-textfield mdl-js-textfield">
        <ul class="mdl-list">
          <li class="mdl-list__item" each="{ url in registryUI.getRegistryServer() }">
            <span class="mdl-list__item-primary-content">
              <a href="#" onClick="registryUI.removeTag.removeUrl('{url}');">
                <i class="material-icons mdl-list__item-icon">delete</i>
              </a>
              <span class="url">{url}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button close" onClick="registryUI.removeTag.close();">Close</button>
    </div>
  </dialog>
  <script type="text/javascript">
    registryUI.removeTag = registryUI.removeTag || {}
    registryUI.removeTag.update = this.update;

    registryUI.removeTag.removeUrl = function (url) {
      registryUI.removeServer(url);
      registryUI.removeTag.update();
    };

    registryUI.removeTag.close = function () {
      registryUI.removeTag.dialog.close();
      registryUI.removeTag.update();
    };

    registryUI.removeTag.show = function () {
      registryUI.removeTag.update();
      registryUI.removeTag.dialog.showModal();
    };

    this.on('updated', function () {
      registryUI.removeTag.dialog = this.refs['remove-server-dialog'];
      if (!registryUI.removeTag.dialog.showModal) {
        dialogPolyfill.registerDialog(registryUI.removeTag.dialog);
      }
    });
  </script>
</remove>
