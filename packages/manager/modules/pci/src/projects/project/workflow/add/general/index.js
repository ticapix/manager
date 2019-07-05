import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-ui-angular';

import component from './general.component';

const moduleName = 'ovhManagerPciWorkflowCreateGeneralModule';

angular
  .module(moduleName, [
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .component('workflowGeneralInfo', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
