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
<menu>
  <material-button id="menu-control-button" onclick="registryUI.menuTag.toggle();" waves-center="true" rounded="true" waves-opacity="0.6" waves-duration="600">
    <i class="material-icons">more_vert</i>
  </material-button>
  <material-dropdown id="menu-control-dropdown">
    <p onclick="registryUI.addTag.show(); registryUI.menuTag.close();">Add URL</p>
    <p onclick="registryUI.changeTag.show(); registryUI.menuTag.close();">Change URL</p>
    <p onclick="registryUI.removeTag.show(); registryUI.menuTag.close();">Remove URL</p>
  </material-dropdown>
  <div class="overlay" onclick="registryUI.menuTag.close();" show="{ registryUI.menuTag.isOpen && registryUI.menuTag.isOpen() }"></div>
  <script type="text/javascript">
    registryUI.menuTag = registryUI.menuTag || {};
    registryUI.menuTag.update = this.update;
    this.one('mount', function(args) {
      const self = this;
      registryUI.menuTag.close = function() {
        self.tags['material-dropdown'].close();
        self.update();
      }
      registryUI.menuTag.isOpen = function() {
        return self.tags['material-dropdown'].opened;
      }
      registryUI.menuTag.toggle = function() {
        self.tags['material-dropdown'].opened ? self.tags['material-dropdown'].close() : self.tags['material-dropdown'].open();
        self.update();
      };
    });
  </script>
</menu>
