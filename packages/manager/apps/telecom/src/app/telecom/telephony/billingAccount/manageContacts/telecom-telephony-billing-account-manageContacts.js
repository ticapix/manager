angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state('telecom.telephony.billingAccount.manageContacts', {
    url: '/manageContacts',
    views: {
      'groupInnerView@telecom.telephony.billingAccount': {
        templateUrl:
          'app/telecom/telephony/billingAccount/manageContacts/telecom-telephony-billing-account-manageContacts.html',
        controller: 'TelecomTelephonyBillingAccountManageContactsCtrl',
        controllerAs: 'ManageContactsCtrl',
      },
    },
    translations: { value: ['.'], format: 'json' },
  });
});
