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
<tag-history-button>
  <material-button ref="button" title="This will show the history of given tag" waves-center="true" rounded="true" waves-color="#ddd">
    <i class="material-icons">history</i>
  </material-button>
  <script>
  this.on('mount', function() {
    const self = this;
    this.refs.button.root.onclick = function() {
      registryUI.taghistory._image = self.opts.image;
      registryUI.taghistory.go(self.opts.image.name, self.opts.image.tag);
    };
  });
  this.update()
  </script>
</tag-history-button>