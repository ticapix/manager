angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state('telecom.telephony.billingAccount.alias.contact', {
    url: '/contact',
    views: {
      'aliasInnerView@telecom.telephony.billingAccount.alias': {
        templateUrl:
          'app/telecom/telephony/service/contact/telecom-telephony-service-contact.html',
        controller: 'TelecomTelephonyServiceContactCtrl',
        controllerAs: 'ServiceContactCtrl',
      },
    },
    translations: { value: ['../../service/contact'], format: 'json' },
  });
});
