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
<tag-history-element class="{entry.key}">
  <div class="headline"><i class="material-icons">{ this.getIcon(entry.key) }</i>
    <p>{ entry.key.replace('_', ' ') }</p>
  </div>
  <div class="value" if={!(entry.value instanceof Array)}> { entry.value }</div>
  <div class="value" each={ e in entry.value } if={entry.value instanceof Array}> { e }</div>
  <script type="text/javascript">
    this.getIcon = function(attribute) {
      switch (attribute) {
        case 'architecture':
          return 'memory';
        case 'created':
          return 'event';
        case 'docker_version':
          return '';
        case 'os':
          return 'developer_board';
        case 'Cmd':
          return 'launch';
        case 'Entrypoint':
          return 'input';
        case 'Env':
          return 'notes';
        case 'Labels':
          return 'label';
        case 'User':
          return 'face';
        case 'Volumes':
          return 'storage';
        case 'WorkingDir':
          return 'home';
        case 'author':
          return 'account_circle';
        case 'id':
        case 'digest':
          return 'settings_ethernet';
        case 'created_by':
          return 'build';
        case 'size':
          return 'get_app';
        case 'ExposedPorts':
          return 'router';
        default:
          ''
      }
    }
  </script>
</tag-history-element>