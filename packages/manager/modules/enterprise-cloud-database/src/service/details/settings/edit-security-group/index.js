import angular from 'angular';

import editSecurityGroupComponent from './edit-security-group.component';
import securityGroupNameComponent from '../../../security-group-name';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsEditSecurityGroup';

angular
  .module(moduleName, [
    securityGroupNameComponent,
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsEditSecurityGroupComponent', editSecurityGroupComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
