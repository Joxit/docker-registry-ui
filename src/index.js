import { component, register } from 'riot';
import MaterialCard from 'riot-mui/src/material-elements/material-card/material-card.riot';
import MaterialSpinner from 'riot-mui/src/material-elements/material-spinner/material-spinner.riot';
import MaterialNavbar from 'riot-mui/src/material-elements/material-navbar/material-navbar.riot';
import MaterialFooter from 'riot-mui/src/material-elements/material-footer/material-footer.riot';

import DockerRegistryUI from './components/docker-registry-ui.riot';

import './style.scss';

register('material-card', MaterialCard);
register('material-footer', MaterialFooter);
register('material-navbar', MaterialNavbar);
register('material-spinner', MaterialSpinner);

const createApp = component(DockerRegistryUI);
const tags = document.getElementsByTagName('docker-registry-ui');
for (let i = 0; i < tags.length; i++) {
  createApp(tags.item(i));
}
