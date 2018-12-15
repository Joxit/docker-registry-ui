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
<tag-history>
  <material-card ref="tag-history-tag" class="tag-history">
    <div class="material-card-title-action">
      <a href="#!taglist/{registryUI.taghistory.image}" onclick="registryUI.home();">
        <i class="material-icons">arrow_back</i>
      </a>
      <h2>
        History of { registryUI.taghistory.image }:{ registryUI.taghistory.tag } <i class="material-icons">history</i>
      </h2>
    </div>
  </material-card>
  <div hide="{ registryUI.taghistory.loadend }" class="spinner-wrapper">
    <material-spinner></material-spinner>
  </div>

  <material-card each="{ guiElement in this.elements }" class="tag-history-element">
    <div each="{ entry in guiElement }" class="{ entry.key }" if="{ entry.value != ''}">
      <div class="headline"><i class="material-icons">{entry.icon}</i>
        <p>{ entry.key.replace('_', ' ') }</p>
      </div>
      <div class="value"> { entry.value }</div>
    </div>

  </material-card>
  <script type="text/javascript">
    const self = this;
    self.eltIdx = function(e) {
      switch (e) {
        case 'id': return 1;
        case 'created': return 2;
        case 'created_by': return 3;
        case 'size': return 4;
        case 'os': return 5;
        case 'architecture': return 6;
        case 'linux': return 7;
        case 'docker_version': return 8;
        default: return 10;
      }
    };

    self.eltSort = function(e1, e2) {
      console.log(e1, e2)
      return self.eltIdx(e1.key) - self.eltIdx(e2.key);
    };

    self.modifySpecificAttributeTypes = function(attribute, value) {
      switch (attribute) {
        case 'created':
          return new Date(value).toLocaleString();
        case 'created_by':
          const cmd = value.match(/\/bin\/sh *-c *#\(nop\) *([A-Z]+)/);
          return (cmd && cmd [1]) || 'RUN'
        case 'size':
          return registryUI.bytesToSize(value);
        case 'Entrypoint':
        case 'Env':
        case 'Cmd':
          return (value || []).join(' ');
        case 'Labels':
          return Object.keys(value || {}).map(function(elt) {
            return value[elt] ? elt + '=' + value[elt] : '';
          }).join(' ');
        case 'Volumes':
          return Object.keys(value);
      }
      return value || '';
    };

    self.getIcon = function(attribute) {
      switch (attribute) {
        case 'architecture': return 'memory';
        case 'created': return 'event';
        case 'docker_version': return '';
        case 'os': return 'developer_board';
        case 'Cmd': return 'launch';
        case 'Entrypoint': return 'input';
        case 'Env': return 'notes';
        case 'Labels': return 'label';
        case 'User': return 'face';
        case 'Volumes': return 'storage';
        case 'WorkingDir': return 'home';
        case 'author': return 'account_circle';
        case 'id': case 'digest': return 'settings_ethernet';
        case 'created_by': return 'build';
        case 'size': return 'get_app';
        default: ''

      }
    }

    self.getConfig = function(blobs) {
      const res = ['architecture', 'User', 'created', 'docker_version', 'os', 'Cmd', 'Entrypoint', 'Env', 'Labels', 'User', 'Volumes', 'WorkingDir', 'author'].reduce(function(acc, e) {
        acc[e] = blobs[e] || blobs.config[e];
        return acc;
      }, {});

      if (!res.author && (res.Labels && res.Labels.maintainer)) {
        res.author = blobs.config.Labels.maintainer;
        delete res.Labels.maintainer;
      }

      return res;
    };

    registryUI.taghistory.display = function() {
      self.elements = []
      const image = new registryUI.DockerImage(registryUI.taghistory.image, registryUI.taghistory.tag);
      image.fillInfo()
      image.on('blobs', function(blobs) {
        function exec(elt) {
          const guiElements = [];
          for (const attribute in elt) {
            if (elt.hasOwnProperty(attribute) && attribute != 'empty_layer') {
              const value = elt[attribute];
              const guiElement = {
                "key": attribute,
                "value": self.modifySpecificAttributeTypes(attribute, value),
                'icon': self.getIcon(attribute)
              };
              guiElements.push(guiElement);
            }
          }
          return guiElements.sort(self.eltSort);
        }

        self.elements.push(exec(self.getConfig(blobs)));
        blobs.history.reverse().forEach(function(elt) { self.elements.push(exec(elt)) });
        registryUI.taghistory.loadend = true;
        self.update();
      });
    };

    registryUI.taghistory.display();
    self.update();
  </script>
</tag-history>