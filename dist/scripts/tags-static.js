/*!
 * docker-registry-ui
 * Copyright (C) 2016  Jones Magloire @Joxit
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

riot.tag2('catalog', '<div id="catalog-tag" class="catalog"> <div class="section-centerd mdl-card mdl-shadow--2dp mdl-cell--6-col"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">Repositories of {registryUI.url()}</h2> </div> <div id="catalog-spinner" hide="{registryUI.catalog.loadend}" class="mdl-spinner mdl-js-spinner is-active section-centerd"></div> <ul class="mdl-list"> <li class="mdl-list__item mdl-menu__item" style="opacity: 1;" each="{item in registryUI.catalog.repositories}" onclick="registryUI.catalog.go(\'{item}\');"> <span class="mdl-list__item-primary-content"> <i class="material-icons mdl-list__item-icon">send</i> {item} </span> </li> </ul> </div> <div id="error-snackbar" aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-js-snackbar mdl-snackbar"> <div class="mdl-snackbar__text"></div> <button class="mdl-snackbar__action" type="button"></button> </div> </div>', '', '', function(opts) {
    registryUI.catalog.instance = this;
    this.mixin('rg.router');
    registryUI.catalog.display = function () {
      var oReq = new Http();
      registryUI.catalog.createSnackbar = function (msg) {
        var snackbar = document.querySelector('#error-snackbar');
        registryUI.catalog.error = msg;
        var data = {
          message: registryUI.catalog.error,
          timeout: 100000,
          actionHandler: function () {
            snackbar.classList.remove('mdl-snackbar--active');
          },
          actionText: 'Undo'
        };
        snackbar.MaterialSnackbar.showSnackbar(data);
      };
      oReq.addEventListener('load', function () {
        if (this.status == 200) {
          registryUI.catalog.repositories = JSON.parse(this.responseText).repositories.sort();
        } else if (this.status == 404) {
          registryUI.catalog.createSnackbar('Server not found');
        } else {
          registryUI.catalog.createSnackbar(this.responseText);
        }
      });
      oReq.addEventListener('error', function () {
        registryUI.catalog.createSnackbar('An error occured');
      });
      oReq.addEventListener('loadend', function () {
        registryUI.catalog.loadend = true;
        registryUI.catalog.instance.update();
      });
      oReq.open('GET', registryUI.url() + '/v2/_catalog');
      oReq.send();
    };
    this.on('updated', function () {
      componentHandler.upgradeElements(this['catalog-tag']);
    });
    registryUI.catalog.go = function (image) {
      rg.router.go('taglist', {
        repository: image.split('/')[0],
        image: image.split('/')[1]
      });
    };
    registryUI.catalog.display();
});


riot.tag2('app', '<catalog if="{!rg.router.current || rg.router.current.name == \'home\'}"></catalog> <taglist if="{rg.router.current.name == \'taglist\'}"></taglist>', '', '', function(opts) {

    this.mixin('rg.router');
    this.router.add({name: 'home', url: ''});
    this.router.add({name: 'taglist', url: '/taglist/:repository/:image'});
    this.router.on('go', state => {
      switch (state.name) {
        case 'taglist':
          if (registryUI.taglist.display) {
            registryUI.taglist.display();
          }
          break;
        case 'home':
          if (registryUI.catalog.display) {
            registryUI.catalog.display();
          }
          break;
      }
    })
    this.router.start();
});


riot.tag2('taglist', '<div id="taglist-tag" class="taglist"> <div class="section-centerd mdl-card mdl-shadow--2dp mdl-cell--6-col"> <div class="mdl-card__title"> <a href="#" onclick="registryUI.taglist.back();"> <i class="material-icons mdl-list__item-icon">arrow_back</i> </a> <h2 class="mdl-card__title-text">Tags of {registryUI.url() + \'/\' + registryUI.taglist.name}</h2> </div> <div id="taglist-spinner" hide="{registryUI.taglist.loadend}" class="mdl-spinner mdl-js-spinner section-centerd"></div> <table class="mdl-data-table mdl-js-data-table full-table" style="border: none;"> <thead> <tr> <th class="mdl-data-table__cell--non-numeric">Repository</th> <th class="mdl-data-table__header--sorted-ascending" onclick="registryUI.taglist.reverse(this);">Tag</th> </tr> </thead> <tbody> <tr each="{item in registryUI.taglist.tags}"> <td class="mdl-data-table__cell--non-numeric">{registryUI.taglist.name}</td> <td>{item}</td> </tr> </tbody> </table> </div> <div id="error-snackbar" aria-live="assertive" aria-atomic="true" aria-relevant="text" class="mdl-js-snackbar mdl-snackbar"> <div class="mdl-snackbar__text"></div> <button class="mdl-snackbar__action" type="button"></button> </div> </div>', '', '', function(opts) {
    registryUI.taglist.instance = this;
    registryUI.taglist.display = function () {
      if (rg.router.current && rg.router.current.name == 'taglist') {
        name = rg.router.current.params.repository + (rg.router.current.params.image
          ? '/' + rg.router.current.params.image
          : '');
        var oReq = new Http();
        registryUI.taglist.name = name;
        registryUI.taglist.createSnackbar = function (msg) {
          var snackbar = document.querySelector('#error-snackbar');
          registryUI.taglist.error = msg;
          var data = {
            message: registryUI.taglist.error,
            timeout: 100000,
            actionHandler: function () {
              snackbar.classList.remove('mdl-snackbar--active');
            },
            actionText: 'Undo'
          };
          snackbar.MaterialSnackbar.showSnackbar(data);
        };
        oReq.addEventListener('load', function () {
          if (this.status == 200) {
            registryUI.taglist.tags = JSON.parse(this.responseText).tags.sort();
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
        oReq.send();
      }
    };
    registryUI.taglist.display();
    registryUI.taglist.instance.update();
    this.on('updated', function () {
      componentHandler.upgradeElements(this['taglist-tag']);
    });

    registryUI.taglist.reverse = function (th) {
      if (th.className == 'mdl-data-table__header--sorted-ascending') {
        th.className = 'mdl-data-table__header--sorted-descending';
      } else {
        th.className = 'mdl-data-table__header--sorted-ascending';
      }
      registryUI.taglist.tags.reverse();
      registryUI.taglist.instance.update();
    };
    registryUI.taglist.back = function () {
      rg.router.go('home');
    };
});
