import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'ovhManagerEnterpriseCloudDatabaseServiceDetailsClusterSize';

angular.module(moduleName, [
  'oc.lazyLoad',
  'ui.router',
]).config(/* @ngInject */($stateProvider) => {
  $stateProvider.state('enterprise-cloud-database.service.details.cluster-size.**', {
    url: '/cluster-size',
    lazyLoad: ($transition$) => {
      const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');

      return import('./cluster-size.module')
        .then(mod => $ocLazyLoad.inject(mod.default || mod));
    },
  });
});

export default moduleName;
