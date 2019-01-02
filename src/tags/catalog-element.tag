<!--
Copyright (C) 2016-2018 Jones Magloire @Joxit

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
<catalog-element>
  <!-- Begin of tag -->
  <material-card class="list highlight" onclick="registryUI.taglist.go('{item}');" item="{item}">
    <material-waves onmousedown="{launch}" center="true" color="#ddd" />
    <span>
      <i class="material-icons">send</i>
      { opts.item }
    </span>
  </material-card>
  <script>
    this.on('mount', function() {
      const card = this.tags['material-card'];
      // Launch waves
      card.launch = function(e) {
        card.tags['material-waves'].trigger('launch',e);
      }
    })
  </script>
  <!-- End of tag -->
</catalog-element>
