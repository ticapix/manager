angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.line.fax.customDomains',
    {
      url: '/customDomains',
      views: {
        'lineView@telecom.telephony.billingAccount.line': {
          templateUrl:
            'app/telecom/telephony/line/fax/customDomains/telecom-telephony-line-fax-customDomains.html',
          noTranslations: true,
        },
        'faxCustomDomainsView@telecom.telephony.billingAccount.line.fax.customDomains': {
          templateUrl:
            'app/telecom/telephony/service/fax/customDomains/telecom-telephony-service-fax-customDomains.html',
          controller: 'TelecomTelephonyServiceFaxCustomDomainsCtrl',
          controllerAs: '$ctrl',
        },
      },
      translations: {
        value: ['../../../service/fax/customDomains'],
        format: 'json',
      },
    },
  );
});
