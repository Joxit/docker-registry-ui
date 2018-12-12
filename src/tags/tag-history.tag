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

  <material-card each="{ guiElement in registryUI.taghistory.elements }" class="tag-history-element">
    <div each="{ entry in guiElement }" class="{ entry.key }">
      <div class="headline"><i class="material-icons"></i>
        <p>{ entry.key.replace('_', ' ') }</p>
      </div>
      <div class="value"> { entry.value }</div>
    </div>

  </material-card>
  <script type="text/javascript">
    registryUI.taghistory.instance = this;
    registryUI.taghistory.display = function() {
      registryUI.taghistory.elements = []
      let oReq = new Http();
      const image = new registryUI.DockerImage(registryUI.taghistory.image, registryUI.taghistory.tag)
      image.fillInfo()
      image.on('blobs', function(blobs) {
        function modifySpecificAttributeTypes(attribute, value) {
          switch (attribute) {
            case "created":
              return new Date(value).toLocaleString();
            case "container_config":
            case "config":
              return "";
          }
          return value;
        }

        function exec(elt) {
          const guiElements = [];
          for (const attribute in elt) {
            if (elt.hasOwnProperty(attribute) && attribute != 'history' && attribute != 'rootfs') {
              const value = elt[attribute];
              const guiElement = {
                "key": attribute,
                "value": modifySpecificAttributeTypes(attribute, value)
              };
              guiElements.push(guiElement);
            }
          }
          registryUI.taghistory.elements.push(guiElements);
        }
        exec(blobs)
        blobs.history.forEach(function(elt) { exec(elt) });
        registryUI.taghistory.loadend = true;
        registryUI.taghistory.instance.update();
      });
    };

    registryUI.taghistory.display();
    registryUI.taghistory.instance.update();
  </script>
</tag-history>