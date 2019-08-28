import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-ui-angular';

import component from './choose-payment-period.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseOrderChoosePaymentPeriodModule';

angular
  .module(moduleName, [
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .component('enterpriseCloudDatabaseOrderChoosePaymentPeriod', component);

export default moduleName;
