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
<catalog-element>
  <!-- Begin of tag -->
  <material-card class="list highlight" item="{item}" expanded="{expanded}">
    <material-waves onmousedown="{launch}" center="true" color="#ddd" />
    <span>
      <i class="material-icons">send</i>
      { typeof opts.item === "string" ? opts.item : opts.item.repo }
      <div if="{typeof opts.item !== "string"}" class="item-count right">
        { opts.item.images && opts.item.images.length } images
        <i class="material-icons animated {expanded: opts.expanded}">expand_more</i>
      </div>
    </span>
  </material-card>
  <catalog-element if="{typeof opts.item !== "string"}" class="animated {hide: !expanded, expanding: expanding}" each="{item in item.images}" />
  <script>
    this.on('mount', function() {
      const self = this;
      const card = this.tags['material-card'];
      if (!card) {
        return;
      }
      // Launch waves
      card.launch = function(e) {
        card.tags['material-waves'].trigger('launch',e);
      }
      if (this.item.images && this.item.images.length === 1) {
        this.item = this.item.images[0];
      }
      card.root.onclick = function(e) {
        if (!self.item.repo) {
          registryUI.taglist.go(self.item);
        } else {
          self.expanded = !self.expanded;
          self.update({expanded: self.expanded, expanding: true});
          setTimeout(function() {
            self.update({expanded: self.expanded, expanding: false});
          }, 50)
        }
      }
    })
  </script>
  <!-- End of tag -->
</catalog-element>
