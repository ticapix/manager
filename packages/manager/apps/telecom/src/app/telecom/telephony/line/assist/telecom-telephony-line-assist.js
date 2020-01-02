angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state('telecom.telephony.billingAccount.line.assist', {
    url: '/assist',
    views: {
      'lineInnerView@telecom.telephony.billingAccount.line': {
        templateUrl:
          'app/telecom/telephony/line/assist/telecom-telephony-line-assist.html',
        controller: 'TelecomTelephonyLineAssistCtrl',
        controllerAs: 'LineAssistCtrl',
      },
    },
    translations: {
      value: ['.', './troubleshooting/procedure', '../../service/assist'],
      format: 'json',
    },
  });
});
