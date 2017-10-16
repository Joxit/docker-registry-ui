<!--
 Copyright (C) 2016  Jones Magloire @Joxit

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
<remove-image>
  <a href="#" onclick="registryUI.removeImage.remove('{ opts.name }', '{ opts.tag }')">
    <i class="material-icons">delete</i>
  </a>
  <script type="text/javascript">
    registryUI.removeImage = registryUI.removeImage || {}
    registryUI.removeImage.update = this.update;
    
    registryUI.removeImage.remove = function (name, tag) {
      var oReq = new Http();
      oReq.addEventListener('loadend', function () {
        registryUI.taglist.refresh();
        if (this.status == 200) {
          if (!this.hasHeader('Docker-Content-Digest')) {
            registryUI.errorSnackbar('You need to add Access-Control-Expose-Headers: [\'Docker-Content-Digest\'] in your server configuration.');
            return;
          }
          var digest = this.getResponseHeader('Docker-Content-Digest');
          var oReq = new Http();
          oReq.addEventListener('loadend', function () {
            if (this.status == 200 || this.status == 202) {
              registryUI.taglist.refresh();
              registryUI.snackbar('Deleting ' + name + ':' + tag + ' image. Run `registry garbage-collect config.yml` on your registry');
            } else if (this.status == 404) {
              registryUI.errorSnackbar('Digest not found');
            } else {
              registryUI.snackbar(this.responseText);
            }
          });
          oReq.open('DELETE', registryUI.url() + '/v2/' + name + '/manifests/' + digest);
          oReq.setRequestHeader('Accept', 'application/vnd.docker.distribution.manifest.v2+json');
          oReq.addEventListener('error', function () {
            registryUI.errorSnackbar('An error occurred when deleting image. Check if your server accept DELETE methods Access-Control-Allow-Methods: [\'DELETE\'].');
          });
          oReq.send();
        } else if (this.status == 404) {
          registryUI.errorSnackbar('Manifest for ' + name + ':' + tag + ' not found');
        } else {
          registryUI.snackbar(this.responseText);
        }
      });
      oReq.open('HEAD', registryUI.url() + '/v2/' + name + '/manifests/' + tag);
      oReq.setRequestHeader('Accept', 'application/vnd.docker.distribution.manifest.v2+json');
      oReq.send();
    };
  </script>
</remove-image>
