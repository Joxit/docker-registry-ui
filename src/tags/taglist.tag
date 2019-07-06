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
<taglist>
  <!-- Begin of tag -->
  <material-card class="header">
    <div class="material-card-title-action ">
      <material-button waves-center="true" rounded="true" waves-color="#ddd" onclick="registryUI.home();">
        <i class="material-icons">arrow_back</i>
      </material-button>
      <h2>
        Tags of { registryUI.name() + '/' + registryUI.taglist.name }
        <div class="item-count">{ registryUI.taglist.tags.length } tags</div>
      </h2>
    </div>
  </material-card>
  <div hide="{ registryUI.taglist.loadend }" class="spinner-wrapper">
    <material-spinner></material-spinner>
  </div>
  <pagination pages="{ registryUI.getPageLabels(this.page, registryUI.getNumPages(registryUI.taglist.tags)) }"></pagination>
  <material-card ref="taglist-tag" class="taglist"
    multi-delete={ this.multiDelete }
    tags={ registryUI.getPage(registryUI.taglist.tags, this.page) }
    show="{ registryUI.taglist.loadend }">
    <table show="{ registryUI.taglist.loadend }" style="border: none;">
      <thead>
      <tr>
        <th class="material-card-th-left">Repository</th>
        <th></th>
        <th>Creation date</th>
        <th>Size</th>

        <th
        class="{ registryUI.taglist.asc ? 'material-card-th-sorted-ascending' : 'material-card-th-sorted-descending' }"
        onclick="registryUI.taglist.reverse();">Tag
        </th>
        <th class="show-tag-history">History</th>
        <th class={ 'remove-tag': true, delete: this.parent.toDelete > 0 } if="{ registryUI.isImageRemoveActivated }">
          <material-checkbox ref="remove-tag-checkbox" class="indeterminate" show={ this.toDelete === 0} title="Toggle multi-delete. Alt+Click to select all tags."></material-checkbox>
          <material-button waves-center="true" rounded="true" waves-color="#ddd" title="This will delete selected images." onclick={ registryUI.taglist.bulkDelete } show={ this.toDelete > 0 }>
            <i class="material-icons">delete</i>
          </material-button></th>
      </tr>
      </thead>
      <tbody>
      <tr each="{ image in this.opts.tags }">
        <td class="material-card-th-left">{ image.name }</td>
        <td class="copy-to-clipboard">
          <copy-to-clipboard image={ image }/>
        </td>
        <td>
          <image-date image="{ image }"/>
        </td>
        <td>
          <image-size image="{ image }"/>
        </td>
        <td>
          <image-tag image="{ image }"/>
        </td>
        <td class="show-tag-history">
          <tag-history-button image={ image }/>
        </td>
        <td if="{ registryUI.isImageRemoveActivated }">
          <remove-image multi-delete={ this.opts.multiDelete } image={ image }/>
        </td>
      </tr>
      </tbody>
    </table>
  </material-card>
  <pagination pages="{ registryUI.getPageLabels(this.page, registryUI.getNumPages(registryUI.taglist.tags)) }"></pagination>
  <script>
    var self = registryUI.taglist.instance = this;
    self.page = registryUI.getPageQueryParam();

    this.multiDelete = false;
    this.toDelete = 0;

    this.on('delete', function() {
      if (!registryUI.isImageRemoveActivated || !this.multiDelete) {
        return;
      }
    });

    this.on('multi-delete', function() {
      if (!registryUI.isImageRemoveActivated) {
        return;
      }
      this.multiDelete = !this.multiDelete;
    });

    this.on('toggle-remove-image', function(checked) {
      if (checked) {
        this.toDelete++;
      } else {
        this.toDelete--;
      }

      if (this.toDelete <= 1) {
        this.update();
      }
    });

    this.on('page-update', function(page) {
      self.page = page < 1 ? 1 : page;
      registryUI.updateQueryString(registryUI.getQueryParams({ page: self.page }) );
      this.toDelete = 0;
      this.update();
    });

    this._getRemoveImageTags = function() {
      var images = self.refs['taglist-tag'].tags['remove-image'];
      if (!(images instanceof Array)) {
        images = [images];
      }
      return images;
    };

    registryUI.taglist.bulkDelete = function() {
      if (self.multiDelete && self.toDelete > 0) {
        self._getRemoveImageTags().filter(function(img) {
          return img.tags['material-checkbox'].checked;
        }).forEach(function(img) {
          img.delete(true);
        });
      }
    };

    this.on('update', function() {
      var checkbox = this.refs['taglist-tag'].refs['remove-tag-checkbox'];
      if (!checkbox || checkbox._toggle) { return; }

      checkbox._toggle = checkbox.toggle;
      checkbox.toggle = function(e) {
        if (e.altKey) {
          self._getRemoveImageTags()
            .filter(function(img) { return !img.tags['material-checkbox'].checked; })
            .forEach(function(img) { img.tags['material-checkbox'].toggle() });
        } else {
          this._toggle();
        }
      };

      checkbox.on('toggle', function() {
        registryUI.taglist.instance.multiDelete = this.checked;
        registryUI.taglist.instance.update();
      });
    });

    registryUI.taglist.display = function() {
      registryUI.taglist.tags = [];
      if (route.routeName == 'taglist') {
        const oReq = new Http();
        registryUI.taglist.instance.update();
        oReq.addEventListener('load', function() {
          registryUI.taglist.tags = [];
          if (this.status == 200) {
            registryUI.taglist.tags = JSON.parse(this.responseText).tags || [];
            registryUI.taglist.tags = registryUI.taglist.tags.map(function(tag) {
              return new registryUI.DockerImage(registryUI.taglist.name, tag);
            }).sort(registryUI.DockerImage.compare);
            self.trigger('page-update', Math.min(self.page, registryUI.getNumPages(registryUI.taglist.tags)))
          } else if (this.status == 404) {
            registryUI.snackbar('Server not found', true);
          } else {
            registryUI.snackbar(this.responseText, true);
          }
        });
        oReq.addEventListener('error', function() {
          registryUI.snackbar(this.getErrorMessage(), true);
          registryUI.taglist.tags = [];
        });
        oReq.addEventListener('loadend', function() {
          registryUI.taglist.loadend = true;
          registryUI.taglist.instance.update();
        });
        oReq.open('GET', registryUI.url() + '/v2/' + registryUI.taglist.name + '/tags/list');
        oReq.send();
        registryUI.taglist.asc = true;
      }
    };
    registryUI.taglist.display();
    registryUI.taglist.instance.update();

    registryUI.taglist.reverse = function() {
      if (registryUI.taglist.asc) {
        registryUI.taglist.tags.reverse();
        registryUI.taglist.asc = false;
      } else {
        registryUI.taglist.tags.sort(registryUI.DockerImage.compare);
        registryUI.taglist.asc = true;
      }
      registryUI.taglist.instance.update();
    };
  </script>
  <!-- End of tag -->
</taglist>