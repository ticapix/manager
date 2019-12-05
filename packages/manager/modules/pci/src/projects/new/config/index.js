import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';
import 'ovh-ui-angular';

import routing from './routing';
import component from './component';

const moduleName = 'pciProjectNewConfig';

angular
  .module(moduleName, [
    'ui.router',
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */)
  .component(component.name, component);

export default moduleName;