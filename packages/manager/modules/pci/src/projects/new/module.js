import angular from 'angular';
import '@uirouter/angularjs';

import components from './components';
import config from './config';
import payment from './payment';

import routing from './routing';
import component from './component';

import './index.scss';

const moduleName = 'ovhManagerPciProjectsNew';

angular
  .module(moduleName, [
    'ui.router',
    components,
    config,
    payment,
  ])
  .config(routing)
  .component(component.name, component);

export default moduleName;
