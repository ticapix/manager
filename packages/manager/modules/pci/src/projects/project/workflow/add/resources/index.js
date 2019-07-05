import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-ui-angular';

import component from './resources.component';

const moduleName = 'ovhManagerPciWorkflowCreateResources';

angular
  .module(moduleName, [
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .component('workflowResources', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
