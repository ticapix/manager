import angular from 'angular';

import editSecurityGroupComponent from './edit-security-group.component';
import routing from './edit-security-group.routing';
import securityGroupNameComponent from '../../../security-group-name';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsEditSecurityGroup';

angular
  .module(moduleName, [
    securityGroupNameComponent,
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceDetailsSettingsEditSecurityGroupComponent', editSecurityGroupComponent)
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
