import angular from 'angular';

import createComponent from './create.component';
import routing from './create.routing';
import cardComponent from '../card';
import chooseDatabaseComponent from './choose-database';
import chooseRegionComponent from './choose-region';
import chooseClusterConfigComponent from './choose-cluster-config';
import chooseCommitmentPeriodComponent from './choose-commitment-period';
import choosePaymentPeriodComponent from './choose-payment-period';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseCreateModule';

angular
  .module(moduleName, [
    cardComponent,
    chooseDatabaseComponent,
    chooseRegionComponent,
    chooseClusterConfigComponent,
    chooseCommitmentPeriodComponent,
    choosePaymentPeriodComponent,
  ])
  .config(routing)
  .component('enterpriseCloudDatabaseCreateComponent', createComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
