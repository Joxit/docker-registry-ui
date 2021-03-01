import { component } from 'riot';

import DockerRegistryUI from './components/docker-registry-ui.riot';

import './style.css';
import './roboto.css';
import './material-icons.css';


component(DockerRegistryUI)(document.getElementsByTagName('body').item(0))
