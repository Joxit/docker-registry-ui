import { component } from 'riot';

import DockerRegistryUI from './components/docker-registry-ui.riot';

import './style.css';
import './roboto.css';
import './material-icons.css';

import 'riot-mui/src/material-elements/material-navbar/material-navbar.scss';
import 'riot-mui/src/material-elements/material-footer/material-footer.scss';

const createApp = component(DockerRegistryUI);
const tags = document.getElementsByTagName('docker-registry-ui');
for (let i = 0; i < tags.length; i++) {
  createApp(tags.item(i));
}
