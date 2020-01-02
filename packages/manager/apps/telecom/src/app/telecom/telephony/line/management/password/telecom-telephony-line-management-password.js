angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state('telecom.telephony.billingAccount.line.password', {
    url: '/password',
    views: {
      'lineView@telecom.telephony.billingAccount.line': {
        templateUrl:
          'app/telecom/telephony/line/management/password/telecom-telephony-line-management-password.html',
        controller: 'TelecomTelephonyLinePasswordCtrl',
        controllerAs: 'PasswordCtrl',
      },
    },
    translations: { value: ['.'], format: 'json' },
  });
});
