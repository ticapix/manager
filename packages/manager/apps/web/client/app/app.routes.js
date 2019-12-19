angular.module('App').config(($stateProvider) => {
  $stateProvider.state('app', {
    abstract: true,
    url: '',
    controller: 'AppCtrl',
    controllerAs: 'AppCtrl',
    templateUrl: 'app.html',
    translations: { value: ['./core', './common'], format: 'json' },
    resolve: {
      rootState: () => 'app.configuration',
      user: /* @ngInject */ (OvhApiMe) => OvhApiMe.v6().get().$promise,
    },
  });

  $stateProvider.state('app.mfaEnrollment', {
    url: '/mfa-enrollment',
    views: {
      'app@': {
        component: 'mfaEnrollment',
      },
    },
    params: {
      forced: {
        dynamic: true,
      },
    },
    translations: { value: ['.'], format: 'json' },
    resolve: {
      forced: /* @ngInject */ ($transition$) => $transition$.params().forced,
      from: /* @ngInject */ ($transition$) => $transition$.$from().name,
    },
  });

  $stateProvider.state('app.microsoft', {
    abstract: true,
    template: '<div ui-view></div>',
  });
});
