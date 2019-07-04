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
<pagination>
  <!-- Begin of tag -->
  <div class="conatianer">
    <div class="pagination-centered">
      <material-button waves-color="rgba(158,158,158,.4)" each="{p in this.opts.pages}" class="{ current: p.current, space-left: p['space-left'], space-right: p['space-right']}">
        <i show="{ p.icon }" class="material-icons">{ p.icon }</i>
        <div hide="{ p.icon }">{ p.page }</div>
      </material-button>
    </div>
  <div>
  <script>
    this.on('updated', function() {
      if (!this.tags['material-button']) { return; }
      var buttons = Array.isArray(this.tags['material-button']) ? this.tags['material-button'] : [this.tags['material-button']];
      buttons.forEach(function(button) {
        button.root.onclick = function() {
          registryUI.taglist.instance.trigger('page-update', button.p.page)
        }
      });
    });
  </script>
  <!-- End of tag -->
</pagination>