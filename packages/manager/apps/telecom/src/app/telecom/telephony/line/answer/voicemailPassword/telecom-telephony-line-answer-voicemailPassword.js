angular.module('managerApp').config(($stateProvider) => {
  $stateProvider.state(
    'telecom.telephony.billingAccount.line.voicemailPassword',
    {
      url: '/voicemailPassword',
      views: {
        'lineView@telecom.telephony.billingAccount.line': {
          templateUrl:
            'app/telecom/telephony/line/answer/voicemailPassword/telecom-telephony-line-answer-voicemailPassword.html',
          noTranslations: true,
        },
        'voicemailView@telecom.telephony.billingAccount.line.voicemailPassword': {
          templateUrl:
            'app/telecom/telephony/service/voicemail/password/telecom-telephony-service-voicemail-password.html',
          controller: 'TelecomTelephonyServiceVoicemailPasswordCtrl',
          controllerAs: 'VoicemailPasswordCtrl',
        },
      },
      translations: {
        value: ['..', '../../../service/voicemail/password'],
        format: 'json',
      },
    },
  );
});
