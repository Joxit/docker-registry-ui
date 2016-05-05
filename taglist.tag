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
<taglist>
<!-- Begin of tag -->
<div class="taglist" if="{ registryUI.content == 'taglist' }">
 <div class="section-centerd mdl-card mdl-shadow--2dp mdl-cell--6-col">
  <div class="mdl-card__title">
   <a href="#" onclick="catalog.display();"><i class="material-icons mdl-list__item-icon">arrow_back</i></a>
   <h2 class="mdl-card__title-text">Tags of { registryUI.url() + '/' + registryUI.taglist.name  }</h2>
  </div>
  <div id="taglist-spinner" style="{ registryUI.taglist.loadend ? 'display:none;': '' }"
       class="mdl-spinner mdl-js-spinner is-active section-centerd"></div>
  <ul class="mdl-list">
   <li class="mdl-list__item" each="{ item in registryUI.taglist.tags }"><span class="mdl-list__item-primary-content">
     { item }
   </span></li>
  </ul>
  </div>
  <div id="error-snackbar" aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-js-snackbar mdl-snackbar">
   <div class="mdl-snackbar__text"></div>
   <button class="mdl-snackbar__action" type="button"></button>
  </div>
 </div>

 <script>
  registryUI.taglist.instance = this;
  registryUI.taglist.instance.update();
  registryUI.taglist.display = function (name){
    registryUI.content = 'taglist';
    var oReq = new XMLHttpRequest();
    registryUI.taglist.name = name;
    registryUI.taglist.createSnackbar = function (msg) {
      var snackbar = document.querySelector('#error-snackbar');
      registryUI.taglist.error = msg;
      var data = {
        message: registryUI.taglist.error,
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
        registryUI.taglist.tags = JSON.parse(this.responseText).tags;
      } else if (this.status == 404) {
        registryUI.taglist.createSnackbar('Server not found');
      } else {
        registryUI.taglist.createSnackbar(this.responseText);
      }
    });
    oReq.addEventListener('error', function () {
      registryUI.taglist.createSnackbar('An error occured');
    });
    oReq.addEventListener('loadend', function () {
      registryUI.taglist.loadend = true;
      registryUI.taglist.instance.update();
    });
    oReq.open('GET', registryUI.url() + '/v2/' + name + '/tags/list');
    oReq.withCredentials = false;
    oReq.send();
    riot.update();
  }
</script> 
<!-- End of tag -->
</taglist>
