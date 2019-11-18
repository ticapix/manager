import angular from 'angular';
import '@uirouter/angularjs';
import '@ovh-ux/ng-at-internet';
import '@ovh-ux/ng-at-internet-ui-router-plugin';
import '@ovh-ux/ng-ui-router-title';
import '@ovh-ux/manager-core';
import '@ovh-ux/ng-ovh-telecom-universe-components';
import '@ovh-ux/manager-telecom-styles';
import 'angular-translate';
import '@ovh-ux/ng-ovh-api-wrappers';

import component from './telecom-dashboard-bills.component';

const moduleName = 'ovhManagerTelecomDashboardBills';

angular
  .module(moduleName, [
    'ngAtInternet',
    'ngAtInternetUiRouterPlugin',
    'ngUiRouterTitle',
    'ngOvhApiWrappers',
    'ovh-api-services',
    'ovhManagerBanner',
    'ovhManagerCore',
    'pascalprecht.translate',
    'ngOvhTelecomUniverseComponents',
    'ui.router',
  ])
  .component('telecomDashboardBills', component);

export default moduleName;
