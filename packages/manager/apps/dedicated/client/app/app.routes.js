import UserModel from './user/User.class';

angular.module('App').config(
  /* @ngInject */ ($stateProvider) => {
    $stateProvider.state('app', {
      abstract: true,
      resolve: {
        currentUser: /* @ngInject */ (User) =>
          User.getUser().then((user) => new UserModel(user)),
        rootState: () => 'app.configuration',
      },
      templateUrl: 'app.html',
      translations: {
        value: ['common', 'double-authentication', 'user-contracts'],
        format: 'json',
      },
      url: '',
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

    // CDN & NAS
    $stateProvider.state('app.networks', {
      abstract: true,
      template: '<ui-view />',
      url: '/configuration',
    });

    // Microsoft
    $stateProvider.state('app.microsoft', {
      abstract: true,
      template: '<ui-view />',
    });
  },
);
