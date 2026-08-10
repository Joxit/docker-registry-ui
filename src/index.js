import { component, register } from 'riot';

import DockerRegistryUI from './components/docker-registry-ui.riot';
import AppDialog from './components/app-dialog.riot';
import AppSnackbar from './components/app-snackbar.riot';
import AppTabs from './components/app-tabs.riot';
import AppCheckbox from './components/app-checkbox.riot';
import TextField from './components/text-field.riot';

import './styles/tokens.scss';
import './style.scss';

register('app-dialog', AppDialog);
register('app-snackbar', AppSnackbar);
register('app-tabs', AppTabs);
register('app-checkbox', AppCheckbox);
register('text-field', TextField);

const createApp = component(DockerRegistryUI);
const tags = document.getElementsByTagName('docker-registry-ui');
for (let i = 0; i < tags.length; i++) {
  createApp(tags.item(i));
}
