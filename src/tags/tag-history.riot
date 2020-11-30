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
<tag-history>
  <material-card ref="tag-history-tag" class="tag-history header">
    <div class="material-card-title-action">
      <material-button waves-center="true" rounded="true" waves-color="#ddd">
        <i class="material-icons">arrow_back</i>
      </material-button>
      <h2>
        History of { registryUI.taghistory.image }:{ registryUI.taghistory.tag } <i class="material-icons">history</i>
      </h2>
    </div>
  </material-card>
  <div hide="{ registryUI.taghistory.loadend }" class="spinner-wrapper">
    <material-spinner />
  </div>

  <material-tabs if="{ this.archs }" useLine="true" tabs="{ this.archs }" tabchanged="{ this.tabchanged }" />

  <material-card each="{ guiElement in this.elements }" class="tag-history-element">
    <tag-history-element each="{ entry in guiElement }" if="{ entry.value && entry.value.length > 0}" />
  </material-card>
  <script type="text/javascript">
    const self = this;
    const eltIdx = function (e) {
      switch (e) {
        case 'created': return 1;
        case 'created_by': return 2;
        case 'size': return 3;
        case 'os': return 4;
        case 'architecture': return 5;
        case 'id': return 6;
        case 'linux': return 7;
        case 'docker_version': return 8;
        default: return 10;
      }
    };

    const eltSort = function (e1, e2) {
      return eltIdx(e1.key) - eltIdx(e2.key);
    };

    const modifySpecificAttributeTypes = function (attribute, value) {
      switch (attribute) {
        case 'created':
          return new Date(value).toLocaleString();
        case 'created_by':
          const cmd = value.match(/\/bin\/sh *-c *#\(nop\) *([A-Z]+)/);
          return (cmd && cmd[1]) || 'RUN'
        case 'size':
          return registryUI.bytesToSize(value);
        case 'Entrypoint':
        case 'Cmd':
          return (value || []).join(' ');
        case 'Labels':
          return Object.keys(value || {}).map(function (elt) {
            return value[elt] ? elt + '=' + value[elt] : '';
          });
        case 'Volumes':
        case 'ExposedPorts':
          return Object.keys(value);
      }
      return value || '';
    };

    const getConfig = function (blobs) {
      const res = ['architecture', 'User', 'created', 'docker_version', 'os', 'Cmd', 'Entrypoint', 'Env', 'Labels', 'User', 'Volumes', 'WorkingDir', 'author', 'id', 'ExposedPorts']
        .reduce(function (acc, e) {
          const value = blobs[e] || blobs.config[e];
          if (value && e === 'architecture' && blobs.variant) {
            acc[e] = value + blobs.variant;
          } else if (value) {
            acc[e] = value;
          }
          return acc;
        }, {});

      if (!res.author && (res.Labels && res.Labels.maintainer)) {
        res.author = blobs.config.Labels.maintainer;
        delete res.Labels.maintainer;
      }

      return res;
    };

    const processBlobs = function (blobs) {
      function exec(elt) {
        const guiElements = [];
        for (var attribute in elt) {
          if (elt.hasOwnProperty(attribute) && attribute != 'empty_layer') {
            const value = elt[attribute];
            const guiElement = {
              "key": attribute,
              "value": modifySpecificAttributeTypes(attribute, value)
            };
            guiElements.push(guiElement);
          }
        }
        return guiElements.sort(eltSort);
      }
      self.elements = new Array(blobs.history.length + 1);
      self.elements[0] = exec(getConfig(blobs));
      blobs.history.forEach(function (elt, i) { self.elements[blobs.history.length - i] = exec(elt) });
      registryUI.taghistory.loadend = true;
      self.update();
    };

    const multiArchList = function (manifests) {
      manifests = manifests.manifests || manifests;
      self.archs = manifests.map(function (manifest) {
        return {
          title: manifest.platform.os + '/' + manifest.platform.architecture + (manifest.platform.variant ? manifest.platform.variant : ''),
          digest: manifest.digest
        }
      })
      self.update();
    };

    self.tabchanged = function (arch, idx) {
      self.elements = []
      self.image.variants[idx] = self.image.variants[idx] || new registryUI.DockerImage(registryUI.taghistory.image, arch.digest);
      if (self.image.variants[idx].blobs) {
        return processBlobs(self.image.variants[idx].blobs);
      }
      self.image.variants[idx].fillInfo();
      self.image.variants[idx].on('blobs', processBlobs);
    };

    registryUI.taghistory.display = function () {
      self.elements = []
      self.image = new registryUI.DockerImage(registryUI.taghistory.image, registryUI.taghistory.tag, true);
      self.image.fillInfo()
      self.image.on('blobs', processBlobs);
      self.image.on('list', multiArchList)
    };

    this.on('mount', function () {
      self.refs['tag-history-tag'].tags['material-button'].root.onclick = function () {
        registryUI.taglist.go(registryUI.taghistory.image);
      };
    });

    registryUI.taghistory.display();
    self.update();
  </script>
</tag-history>