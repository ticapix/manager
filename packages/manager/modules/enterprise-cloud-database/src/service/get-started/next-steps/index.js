import angular from 'angular';

import flags from '../../connection-details/flags';
import maintenanceWindow from '../../maintenance-window';
import nextStepsComponent from './next-steps.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceGetStartedNextStepsComponent';

angular
  .module(moduleName, [
    flags,
    maintenanceWindow,
  ])
  .component('ovhManagerEnterpriseCloudDatabaseServiceGetStartedNextStepsComponent', nextStepsComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
