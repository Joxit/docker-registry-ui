<!--
 Copyright (C) 2019 Jakob Ackermann

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
<image-content-digest>
  <div title="{ this.title }">{ this.display_id }</div>
  <script type="text/javascript">
    const self = this;
    self.chars = -1;

    self.onResize = function(chars) {
        if (chars === self.chars) {
            return;
        }
        self.chars = chars;
        if (chars >= 70) {
            self.display_id = self.digest;
            self.title = '';
        } else if (chars === 0) {
            self.display_id = '';
            self.title = self.digest;
        } else {
            self.display_id = self.digest.slice(0, chars) + '...';
            self.title = self.digest;
        }
        self.update();
    };

    opts.image.one('content-digest', function(digest) {
        self.digest = digest;
        opts.image.on('content-digest-chars', self.onResize);
        opts.image.trigger('get-content-digest-chars');
    });
    opts.image.trigger('get-content-digest');
  </script>
</image-content-digest>