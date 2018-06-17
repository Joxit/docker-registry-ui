<!--
 Copyright (C) 2018  Jones Magloire @Joxit

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
<image-size>
  <div title="Compressed size of your image.">{ this.bytesToSize(this.size) }</div>
  <script type="text/javascript">
    var self = this;
    this.bytesToSize = function (bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == undefined || isNaN(bytes)) {
        return '?';
      } else if (bytes == 0) {
        return '0 Byte';
      }
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.ceil(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    };
    opts.image.on('size', function(size) {
      self.size = size;
      self.update();
    });
    opts.image.trigger('get-size');
  </script>
</image-size>