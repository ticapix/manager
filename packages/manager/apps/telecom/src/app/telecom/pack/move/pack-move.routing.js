export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('telecom.pack.move', {
      url: '/move',
      views: {
        'packView@telecom.pack': 'packMove',
      },
      translations: {
        value: ['.'],
        format: 'json',
      },
      resolve: {
        packName: /* @ngInject */ $transition$ => $transition$.params().packName,
      },
    });
};
