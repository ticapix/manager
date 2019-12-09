import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';
import 'ovh-ui-angular';
import 'ovh-api-services';

import component from './pack-move-contract.component';
import routing from './pack-move-contract.routing';

const moduleName = 'ovhManagerTelecomPackMoveContract';

angular
  .module(moduleName, [
    'ui.router',
    'oui',
    'ovh-api-services',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .config(routing)
  .component('packMoveContract', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
