import angular from 'angular';

import '@ovh-ux/ng-translate-async-loader';
import 'ovh-api-services';
import 'ovh-ui-angular';
import 'angular-translate';

import component from './accounts.component';
import state from './accounts.routing';

const moduleName = 'ovhManagerEmailDomainDelegateAccounts';

angular
  .module(moduleName, [
    'ngTranslateAsyncLoader',
    'oui',
    'ovh-api-services',
    'pascalprecht.translate',
  ])
  .component(component.name, component)
  .config(/* @ngInject */ ($stateProvider) => {
    $stateProvider.state(state.name, state);
  })
  .run(/* @ngTranslationsInject:json ../../email/translations */);

export default moduleName;
