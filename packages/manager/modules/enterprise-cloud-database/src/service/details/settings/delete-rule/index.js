import angular from 'angular';

import deleteRuleComponent from './delete-rule.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteRule';

angular
  .module(moduleName, [])
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteRuleComponent', deleteRuleComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
