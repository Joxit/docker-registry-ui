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
      <a class="material-footer-logo" href="https://joxit.github.io/docker-registry-ui/">Docker Registry UI</a>
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
      registryUI.appTag.tags['material-snackbar'].addToast({'message': message, 'isError': isError});
    };
    registryUI.errorSnackbar = function (message) {
      return registryUI.snackbar(message, true);
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
    route.start(true);
  </script>
</app>