angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state('telecom.telephony.billingAccount.line.calls.forward', {
    url: '/forward',
    views: {
      'lineView@telecom.telephony.billingAccount.line': {
        templateUrl:
          'app/telecom/telephony/line/calls/forward/telecom-telephony-line-calls-forward.html',
        controller: 'TelecomTelephonyLineCallsForwardCtrl',
        controllerAs: 'LineForwardCtrl',
      },
    },
    translations: { value: ['.'], format: 'json' },
  });
});
