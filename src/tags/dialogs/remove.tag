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
<remove>

  <material-popup>
    <div class="material-popup-title">Remove your Registry Server ?</div>
    <div class="material-popup-content">
      <ul class="list">
        <li each="{ url in registryUI.getRegistryServer() }">
         <span>
           <a href="#" onClick="registryUI.removeTag.removeUrl('{url}');">
             <i class="material-icons">delete</i>
           </a>
           <span class="url">{ url }</span>
         </span>
        </li>
      </ul>
    </div>
    <div class="material-popup-action">
      <material-button class="dialog-button" waves-color="rgba(158,158,158,.4)" onClick="registryUI.removeTag.close();">
        Close
      </material-button>
    </div>
  </material-popup>
  <script type="text/javascript">
    registryUI.removeTag = registryUI.removeTag || {}
    registryUI.removeTag.update = this.update;

    registryUI.removeTag.removeUrl = function(url) {
      registryUI.removeServer(url);
      registryUI.removeTag.close();
    };

    registryUI.removeTag.close = function() {
      registryUI.removeTag.dialog.close();
      registryUI.removeTag.update();
    };

    registryUI.removeTag.show = function() {
      registryUI.removeTag.dialog.open();
    };

    this.one('mount', function() {
      registryUI.removeTag.dialog = this.tags['material-popup'];
    });
  </script>
</remove>
