import angular from 'angular';

import createRuleComponent from './create-rule.component';
import ruleComponent from '../../../rule';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsCreateRule';

angular
  .module(moduleName, [
    ruleComponent,
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsCreateRuleComponent', createRuleComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
