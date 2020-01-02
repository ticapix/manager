angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.line.voicemailManagement',
    {
      url: '/voicemailManagement',
      views: {
        'lineView@telecom.telephony.billingAccount.line': {
          templateUrl:
            'app/telecom/telephony/line/answer/voicemailManagement/telecom-telephony-line-answer-voicemailManagement.html',
          noTranslations: true,
        },
        'voicemailView@telecom.telephony.billingAccount.line.voicemailManagement': {
          templateUrl:
            'app/telecom/telephony/service/voicemail/management/telecom-telephony-service-voicemail-management.html',
          controller: 'TelecomTelephonyServiceVoicemailManagementCtrl',
          controllerAs: 'VoicemailManagementCtrl',
        },
      },
      translations: {
        value: ['..', '../../../service/voicemail/management'],
        format: 'json',
      },
    },
  );
});
