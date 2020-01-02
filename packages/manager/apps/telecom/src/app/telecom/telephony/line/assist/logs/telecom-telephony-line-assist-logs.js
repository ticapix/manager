angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state('telecom.telephony.billingAccount.line.assist.logs', {
    url: '/logs',
    views: {
      'lineView@telecom.telephony.billingAccount.line': {
        templateUrl:
          'app/telecom/telephony/service/assist/logs/telecom-telephony-service-assist-logs.html',
        controller: 'TelecomTelephonyServiceAssistLogsCtrl',
        controllerAs: 'LogsCtrl',
      },
    },
    translations: { value: ['../../../service/assist/logs'], format: 'json' },
  });
});
