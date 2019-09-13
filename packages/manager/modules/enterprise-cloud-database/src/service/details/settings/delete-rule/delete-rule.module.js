import angular from 'angular';

import deleteRuleComponent from './delete-rule.component';
import routing from './delete-rule.route';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteRule';

angular
  .module(moduleName, [])
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsDeleteRuleComponent', deleteRuleComponent)
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
