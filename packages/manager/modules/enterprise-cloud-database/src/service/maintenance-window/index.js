import angular from 'angular';
import '@uirouter/angularjs';

import maintenanceWindowComponent from './maintenance-window.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceMaintenanceWindowComponent';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceMaintenanceWindowComponent', maintenanceWindowComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
