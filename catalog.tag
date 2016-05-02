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
<!-- Begin of tag -->
<div class="catalog" if="{ registryUI.content == 'catalog' }">
 <div class="section-centerd mdl-card mdl-shadow--2dp mdl-cell--6-col">
  <div class="mdl-card__title">
   <h2 class="mdl-card__title-text">Repositories of { registryUI.url() }</h2>
  </div>
  <div id="catalog-spinner" style="{ catalog.loadend ? 'display:none;': '' }"
       class="mdl-spinner mdl-js-spinner is-active section-centerd"></div>
  <ul class="mdl-list">
   <li class="mdl-list__item" each="{ item in catalog.repositories }"><span class="mdl-list__item-primary-content">
     <a href="#" onclick="registryUI.taglist.display('{item}');"><i class="material-icons mdl-list__item-icon">insert_link</i></a> { item }
   </span></li>
  </ul>
  </div>
  <div id="error-snackbar" aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-js-snackbar mdl-snackbar">
   <div class="mdl-snackbar__text"></div>
   <button class="mdl-snackbar__action" type="button"></button>
  </div>
 </div>

 <script>
  catalog.instance = this;
  var oReq = new XMLHttpRequest();
  catalog.createSnackbar = function (msg) {
    var snackbar = document.querySelector('#error-snackbar');
    catalog.error = msg;
    var data = {
      message: catalog.error,
      timeout: 100000,
      actionHandler: function(){
        snackbar.classList.remove('mdl-snackbar--active');
      },
     actionText: 'Undo'
    };
    snackbar.MaterialSnackbar.showSnackbar(data);
  };
  oReq.addEventListener('load', function () {
    if (this.status == 200) {
      catalog.repositories = JSON.parse(this.responseText).repositories;
    } else if (this.status == 404) {
      catalog.createSnackbar('Server not found');
    } else {
      catalog.createSnackbar(this.responseText);
    }
  });
  oReq.addEventListener('error', function () {
    catalog.createSnackbar('An error occured');
  });
  oReq.addEventListener('loadend', function () {
    catalog.loadend = true;
    catalog.instance.update();
  });
  oReq.open('GET', registryUI.url() + '/v2/_catalog');
  oReq.withCredentials = false;
  oReq.send();
  catalog.instance.update();
</script> 
<!-- End of tag -->
</catalog>
