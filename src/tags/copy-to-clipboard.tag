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
<copy-to-clipboard>
  <input ref="input" style="display: none; width: 1px; height: 1px;" value="{ this.dockerCmd }">
  <material-button waves-center="true" rounded="true" waves-color="#ddd" onclick="{ this.copy }" title="Copy pull command.">
    <i class="material-icons">content_copy</i>
  </material-button>
  <script type="text/javascript">
    this.dockerCmd = 'docker pull ' + registryUI.cleanName() + '/' + opts.image.name + ':' + opts.image.tag;
    this.copy = function () {
      const copyText = this.refs['input'];
      copyText.style.display = 'block';
      copyText.select();
      document.execCommand('copy');
      copyText.style.display = 'none';

      registryUI.snackbar('`' + this.dockerCmd + '` has been copied to clipboard.')
    };
  </script>
</copy-to-clipboard>