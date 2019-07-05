import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-ui-angular';

import component from './type.component';

const moduleName = 'ovhManagerPciWorkflowTypeModule';

angular
  .module(moduleName, [
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .component('workflowType', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
