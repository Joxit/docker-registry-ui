import { component } from 'riot';

import DockerRegistryUI from './components/docker-registry-ui.riot';

import './style.scss';

const createApp = component(DockerRegistryUI);
const tags = document.getElementsByTagName('docker-registry-ui');
for (let i = 0; i < tags.length; i++) {
  createApp(tags.item(i));
}
