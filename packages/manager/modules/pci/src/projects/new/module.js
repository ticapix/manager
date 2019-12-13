import angular from 'angular';
import '@uirouter/angularjs';
import 'ovh-api-services';

import components from './components';
import config from './config';
import payment from './payment';

import routing from './routing';
import component from './component';
import service from './service';

import './index.scss';

const moduleName = 'ovhManagerPciProjectsNew';

angular
  .module(moduleName, [
    'ui.router',
    'ovh-api-services',
    components,
    config,
    payment,
  ])
  .config(routing)
  .component(component.name, component)
  .service('pciProjectNew', service);

export default moduleName;
