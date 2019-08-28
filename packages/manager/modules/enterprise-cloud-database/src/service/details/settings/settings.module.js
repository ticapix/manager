import angular from 'angular';

import enterpriseCloudDatabaseServiceDetailsSettingsComponent from './settings.component';
import maintenanceWindow from '../../maintenance-window';
import routing from './settings.routing';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsSettings';

angular
  .module(moduleName, [
    maintenanceWindow,
  ])
  .config(routing)
  .component('enterpriseCloudDatabaseServiceDetailsSettingsComponent', enterpriseCloudDatabaseServiceDetailsSettingsComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
