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
<catalog>
 <div class="catalog">
  <div class="section-centerd mdl-card mdl-shadow--2dp mdl-cell--6-col">
  <ul class="mdl-list">
    <div class="mdl-card__title">
     <h2 class="mdl-card__title-text">Repositories of { registryUI.url() }</h2>
    </div>
    <li class="mdl-list__item" each="{ item in catalog.repositories }">
      <span class="mdl-list__item-primary-content">
       <i class="material-icons mdl-list__item-icon">insert_link</i> { item }
      </span>
    </li>
  </ul>
  </div>
 </div>

 <script>
catalog.instance = this;
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", function () {
  catalog.repositories = JSON.parse(this.responseText).repositories;
  catalog.instance.update();
});
oReq.open("GET", registryUI.url() + "/v2/_catalog", true);
oReq.setRequestHeader('Origin', '*');
oReq.withCredentials = false;
oReq.send();
catalog.inst
this.update();
 </script>

</catalog>
