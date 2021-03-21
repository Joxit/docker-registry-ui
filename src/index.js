import { component, register } from 'riot';
import MaterialCard from 'riot-mui/src/material-elements/material-card/material-card.riot';
import MaterialSpinner from 'riot-mui/src/material-elements/material-spinner/material-spinner.riot';
import MaterialNavbar from 'riot-mui/src/material-elements/material-navbar/material-navbar.riot';
import MaterialFooter from 'riot-mui/src/material-elements/material-footer/material-footer.riot';
import MaterialButton from 'riot-mui/src/material-elements/material-button/material-button.riot';
import MaterialCheckbox from 'riot-mui/src/material-elements/material-checkbox/material-checkbox.riot';
import MaterialTabs from 'riot-mui/src/material-elements/material-tabs/material-tabs.riot';

import DockerRegistryUI from './components/docker-registry-ui.riot';

import './style.scss';

register('material-card', MaterialCard);
register('material-footer', MaterialFooter);
register('material-navbar', MaterialNavbar);
register('material-spinner', MaterialSpinner);
register('material-button', MaterialButton);
register('material-checkbox', MaterialCheckbox);
register('material-tabs', MaterialTabs);

const createApp = component(DockerRegistryUI);
const tags = document.getElementsByTagName('docker-registry-ui');
for (let i = 0; i < tags.length; i++) {
  createApp(tags.item(i));
}
