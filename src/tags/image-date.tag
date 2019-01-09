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
<image-date>
  <div title="Creation date { this.localDate }">{ this.dateFormat(this.date) } ago</div>
  <script type="text/javascript">
    const self = this;
    this.dateFormat = function(date) {
      if (date === undefined) {
        return '';
      }
      const labels = ['a second', 'seconds', 'a minute', 'minutes', 'an hour', 'hours', 'a day', 'days', 'a month', 'months', 'a year', 'years'];
      const maxSeconds = [1, 60, 3600, 86400, 2592000, 31104000, Infinity];
      const diff = (new Date() - date) / 1000;
      for (var i = 0; i < maxSeconds.length - 1; i++) {
        if (maxSeconds[i] * 2 >= diff) {
          return labels[i * 2];
        } else if (maxSeconds[i + 1] > diff) {
          return Math.floor(diff / maxSeconds[i]) + ' ' + labels[i * 2 + 1];
        }
      }
    };
    opts.image.on('creation-date', function(date) {
      self.date = date;
      self.localDate = date.toLocaleString()
      self.update();
    });
    opts.image.trigger('get-date');
  </script>
</image-date>