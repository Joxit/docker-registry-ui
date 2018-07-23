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
<app>
  <header>
    <material-navbar>
      <div class="logo">Docker Registry UI</div>
      <menu></menu>
    </material-navbar>
  </header>
  <main>
    <catalog if="{route.routeName == 'home'}"></catalog>
    <taglist if="{route.routeName == 'taglist'}"></taglist>
    <change></change>
    <add></add>
    <remove></remove>
    <material-snackbar></material-snackbar>
  </main>
  <footer>
    <material-footer>
      <a class="material-footer-logo" href="https://joxit.github.io/docker-registry-ui/">Docker Registry UI %%GULP_INJECT_VERSION%%</a>
      <ul class="material-footer-link-list">
        <li>
          <a href="https://github.com/Joxit/docker-registry-ui">Contribute on GitHub</a>
        </li>
        <li>
          <a href="https://github.com/Joxit/docker-registry-ui/blob/master/LICENSE">Privacy &amp; Terms</a>
        </li>
      </ul>

    </material-footer>
  </footer>
  <script>

    registryUI.appTag = this;
    route.base('#!')
    route('', function() {
      route.routeName = 'home';
      if (registryUI.catalog.display) {
        registryUI.catalog.loadend = false;
        registryUI.catalog.display();
      }
      registryUI.appTag.update();
    });
    route('/taglist/*', function(image) {
      route.routeName = 'taglist';
      registryUI.taglist.name = image
      if (registryUI.taglist.display) {
        registryUI.taglist.loadend = false;
        registryUI.taglist.display();
      }
      registryUI.appTag.update();
    });
    registryUI.home = function() {
      if(route.routeName == 'home') {
        registryUI.catalog.display();
      } else {
        route('');
      }
    };
    registryUI.snackbar = function (message, isError) {
      registryUI.appTag.tags['material-snackbar'].addToast({'message': message, 'isError': isError}, 15000);
    };
    registryUI.errorSnackbar = function (message) {
      return registryUI.snackbar(message, true);
    }
    registryUI.cleanName = function() {
      var url = (registryUI.url() && registryUI.url().length > 0 && registryUI.url()) || window.location.host;
      if (url) {
        return url.startsWith('http') ? url.replace(/https?:\/\//, '') : url;
      }
      return '';
    }
    route.parser(null, function(path, filter) {
      const f = filter
        .replace(/\?/g, '\\?')
        .replace(/\*/g, '([^?#]+?)')
        .replace(/\.\./, '.*')
      const re = new RegExp('^' + f + '$')
      const args = path.match(re)
      if (args) return args.slice(1)
    });

    registryUI.isDigit = function(char) {
      return char >= '0' && char <= '9';
    }

    registryUI.DockerImage = function (name, tag) {
      this.name = name;
      this.tag = tag;
      riot.observable(this);
      this.on('get-size', function() {
        if (this.size !== undefined) {
          return this.trigger('size', this.size);
        }
        return this.fillInfo();
      });
      this.on('get-sha256', function() {
        if (this.size !== undefined) {
          return this.trigger('sha256', this.sha256);
        }
        return this.fillInfo();
      });
    };

    registryUI.DockerImage._tagReduce = function (acc, e) {
      if (acc.length > 0 && registryUI.isDigit(acc[acc.length - 1].charAt(0)) == registryUI.isDigit(e)) {
        acc[acc.length - 1] += e;
      } else {
        acc.push(e);
      }
      return acc;
    }

    registryUI.DockerImage.compare = function(e1, e2) {
      var tag1 = e1.tag.match(/./g).reduce(registryUI.DockerImage._tagReduce, []);
      var tag2 = e2.tag.match(/./g).reduce(registryUI.DockerImage._tagReduce, []);

      for (var i = 0; i < tag1.length && i < tag2.length; i++) {
        var compare = tag1[i].localeCompare(tag2[i]);
        if (registryUI.isDigit(tag1[i].charAt(0)) && registryUI.isDigit(tag2[i].charAt(0))) {
          var diff = tag1[i] - tag2[i];
          if (diff != 0) {
            return diff;
          }
        } else if (compare != 0) {
          return compare;
        }
      }
      return e1.tag.length - e2.tag.length;
    };

    registryUI.DockerImage.prototype.fillInfo = function() {
      if (this._fillInfoWaiting) {
        return;
      }
      this._fillInfoWaiting = true;
      var oReq = new Http();
      var self = this;
      oReq.addEventListener('loadend', function () {
        if (this.status == 200 || this.status == 202) {
          var response = JSON.parse(this.responseText);
          self.size = response.layers.reduce(function (acc, e) {
            return acc + e.size;
          }, 0);
          self.sha256 = response.config.digest;
          self.trigger('size', self.size);
          self.trigger('sha256', self.sha256);
        } else if (this.status == 404) {
          registryUI.errorSnackbar('Manifest for ' + self.name + ':' + self.tag + ' not found');
        } else {
          registryUI.snackbar(this.responseText);
        }
      });
      oReq.open('GET', registryUI.url() + '/v2/' + self.name + '/manifests/' + self.tag);
      oReq.setRequestHeader('Accept', 'application/vnd.docker.distribution.manifest.v2+json');
      oReq.send();
    }
    route.start(true);
  </script>
</app>