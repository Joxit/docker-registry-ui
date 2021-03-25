import { component, register } from 'riot';
import {
  MaterialCard,
  MaterialSpinner,
  MaterialNavbar,
  MaterialFooter,
  MaterialButton,
  MaterialCheckbox,
  MaterialTabs,
  MaterialSnackbar,
  MaterialDropdownList
} from 'riot-mui';

import DockerRegistryUI from './components/docker-registry-ui.riot';

import './style.scss';

register('material-card', MaterialCard);
register('material-footer', MaterialFooter);
register('material-navbar', MaterialNavbar);
register('material-spinner', MaterialSpinner);
register('material-button', MaterialButton);
register('material-checkbox', MaterialCheckbox);
register('material-snackbar', MaterialSnackbar);
register('material-tabs', MaterialTabs);
register('material-dropdown-list', MaterialDropdownList);

const createApp = component(DockerRegistryUI);
const tags = document.getElementsByTagName('docker-registry-ui');
for (let i = 0; i < tags.length; i++) {
  createApp(tags.item(i));
}
