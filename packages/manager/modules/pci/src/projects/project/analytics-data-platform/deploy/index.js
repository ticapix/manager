import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

import reviewTemplate from './review.html';

const moduleName = 'ovhManagerAnalyticsDataPlatformDeploy';

angular
  .module(moduleName, [
    'ui.router',
    'oc.lazyLoad',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('pci.projects.project.analytics-data-platform.deploy.**', {
      url: '/deploy',
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector().get('$ocLazyLoad');
        return import('./deploy.module')
          .then(mod => $ocLazyLoad.inject(mod.default || mod));
      },
    });
  }).run(/* @ngInject */($templateCache) => {
    // import templates required by ng-include
    $templateCache.put('analytics-data-platform/deploy/review.html', reviewTemplate);
  });

export default moduleName;
