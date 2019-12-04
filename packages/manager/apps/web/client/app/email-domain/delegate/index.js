import angular from 'angular';

import '@ovh-ux/ng-translate-async-loader';
import 'ovh-api-services';
import 'ovh-ui-angular';
import 'angular-translate';

import accounts from './accounts';

import component from './delegate.component';
import state from './delegate.routing';

const moduleName = 'ovhManagerEmailDomainDelegate';

angular
  .module(moduleName, [
    accounts,
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
