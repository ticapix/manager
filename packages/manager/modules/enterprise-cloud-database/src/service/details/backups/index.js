import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'enterpriseCloudDatabaseServiceDetailsBackups';

angular.module(moduleName, [
  'oc.lazyLoad',
  'ui.router',
]).config(/* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.backups.**', {
    url: '/backups',
    lazyLoad: ($transition$) => {
      const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

      return import('./backups.module')
        .then((mod) => $ocLazyLoad.inject(mod.default || mod));
    },
  });
});

export default moduleName;
