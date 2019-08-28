import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-ui-angular';

import component from './choose-commitment-period.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseOrderChooseCommitmentPeriodModule';

angular
  .module(moduleName, [
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .component('enterpriseCloudDatabaseOrderChooseCommitmentPeriod', component);

export default moduleName;
