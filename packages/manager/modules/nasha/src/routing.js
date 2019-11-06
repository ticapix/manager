import template from './template.html';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('nasha', {
      abstract: true,
      url: '/paas/nasha/:nashaId',
      template,
      controller: 'NashaCtrl',
      controllerAs: 'NashaCtrl',
      translations: {
        value: ['../common', '.'],
        format: 'json',
      },
    })
    .state('nasha-order-complete', {
      url: '/nasha/order/complete',
      templateUrl: 'app/nasha/order/nasha-order-complete.html',
      controller: 'NashaOrderCompleteCtrl',
      controllerAs: 'NashaOrderCompleteCtrl',
      translations: {
        value: ['../../common', '.', '..'],
        format: 'json',
      },
      params: {
        orderUrl: null,
      },
    })
    .state('nasha-add', {
      url: '/nasha/new',
      templateUrl: 'app/nasha/add/nasha-add.html',
      controller: 'NashaAddCtrl',
      controllerAs: 'NashaAddCtrl',
      translations: {
        value: ['../../common', '.', '..'],
        format: 'json',
      },
    })
    .state('nasha-unavailable', {
      url: '/nasha/unavailable',
      templateUrl: 'app/nasha/add/nasha-unavailable.html',
      controller: 'NashaUnavailableCtrl',
      controllerAs: '$ctrl',
      translations: {
        value: ['../../common', '.', '..'],
        format: 'json',
      },
    });
};
