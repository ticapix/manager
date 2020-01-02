angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state('telecom.telephony.billingAccount.fax.fax.campaigns', {
    url: '/campaigns',
    views: {
      'telephonyView@telecom.telephony': {
        templateUrl:
          'app/telecom/telephony/fax/fax/campaigns/telecom-telephony-fax-fax-campaigns.html',
        noTranslations: true,
      },
      'faxCampaignsView@telecom.telephony.billingAccount.fax.fax.campaigns': {
        templateUrl:
          'app/telecom/telephony/service/fax/campaigns/telecom-telephony-service-fax-campaigns.html',
        controller: 'TelecomTelephonyServiceFaxCampaignsCtrl',
        controllerAs: 'CampaignsCtrl',
      },
    },
    translations: { value: ['../../../service/fax/campaigns'], format: 'json' },
  });
});
