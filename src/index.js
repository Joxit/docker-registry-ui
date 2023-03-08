import { component, register } from 'riot';

import {
  MaterialCard,
  MaterialSpinner,
  MaterialNavbar,
  MaterialFooter,
  MaterialButton,
  MaterialWaves,
  MaterialCheckbox,
  MaterialTabs,
  MaterialSnackbar,
  MaterialDropdown,
  MaterialPopup,
  MaterialInput,
  MaterialSwitch,
} from 'riot-mui';

import DockerRegistryUI from './components/docker-registry-ui.riot';

import './style.scss';

register('material-card', MaterialCard);
register('material-footer', MaterialFooter);
register('material-navbar', MaterialNavbar);
register('material-spinner', MaterialSpinner);
register('material-button', MaterialButton);
register('material-waves', MaterialWaves);
register('material-checkbox', MaterialCheckbox);
register('material-snackbar', MaterialSnackbar);
register('material-tabs', MaterialTabs);
register('material-dropdown', MaterialDropdown);
register('material-popup', MaterialPopup);
register('material-input', MaterialInput);
register('material-switch', MaterialSwitch);

const createApp = component(DockerRegistryUI);
const tags = document.getElementsByTagName('docker-registry-ui');
for (let i = 0; i < tags.length; i++) {
  createApp(tags.item(i));
}
