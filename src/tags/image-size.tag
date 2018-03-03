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
  <div>{ this.bytesToSize(this.size) }</div>
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
    var oReq = new Http();
    oReq.addEventListener('loadend', function () {
      if (this.status == 200 || this.status == 202) {
        self.size = JSON.parse(this.responseText).layers.reduce(function (acc, e) {
          return acc + e.size;
        }, 0);
        self.update();
      } else if (this.status == 404) {
        registryUI.errorSnackbar('Manifest for ' + opts.name + ':' + opts.tag + ' not found');
      } else {
        registryUI.snackbar(this.responseText);
      }
    });
    oReq.open('GET', registryUI.url() + '/v2/' + opts.name + '/manifests/' + opts.tag);
    oReq.setRequestHeader('Accept', 'application/vnd.docker.distribution.manifest.v2+json');
    oReq.send();
  </script>
</image-size>