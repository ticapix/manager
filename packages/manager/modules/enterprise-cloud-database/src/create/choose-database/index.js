import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-ui-angular';

import component from './choose-database.component';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseOrderChooseDatabaseModule';

angular
  .module(moduleName, [
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .component('enterpriseCloudDatabaseOrderChooseDatabase', component);

export default moduleName;
