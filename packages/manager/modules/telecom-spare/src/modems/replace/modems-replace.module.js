import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';
import 'ovh-ui-angular';
import 'ovh-api-services';

import component from './modems-replace.component';
import routing from './modems-replace.routing';

const moduleName = 'ovhManagerTelecomSpareModemsReplace';

angular
  .module(moduleName, [
    'ui.router',
    'oui',
    'ovh-api-services',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .config(routing)
  .component('replaceModemsSpare', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;