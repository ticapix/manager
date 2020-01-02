angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.fax.management.informations',
    {
      url: '/informations',
      views: {
        'faxView@telecom.telephony.billingAccount.fax': {
          templateUrl:
            'app/telecom/telephony/fax/management/informations/telecom-telephony-fax-management-informations.html',
          controller: 'TelecomTelephonyFaxManagementInformationsCtrl',
          controllerAs: '$ctrl',
        },
      },
      translations: { value: ['.'], format: 'json' },
    },
  );
});
