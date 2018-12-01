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
<tag-history-button>
  <a href="#" title="This will show the history of given tag"
     onclick="go('{ opts.image.name }', '{ opts.image.tag }');">
    <i class="material-icons">history</i>
  </a>

  <script type="text/javascript">
    go = function (image, tag) {
      route('/taghistory/image/' + image + '/tag/' + tag);
    };
  </script>

</tag-history-button>