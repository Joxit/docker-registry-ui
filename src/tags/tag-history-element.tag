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
  <div class="headline"><i class="material-icons">{ registryUI.getHistoryIcon(entry.key) }</i>
    <p>{ entry.key.replace('_', ' ') }</p>
  </div>
  <div class="value" if={!(entry.value instanceof Array)}> { entry.value }</div>
  <div class="value" each={ e in entry.value } if={entry.value instanceof Array}> { e }</div>
</tag-history-element>