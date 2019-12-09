
export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('telecom.pack.move.contract', {
      url: '/contract?id',
      views: {
        modal: {
          component: 'packMoveContract',
        },
      },
      layout: 'modal',
      translations: {
        value: ['.'],
        format: 'json',
      },
      resolve: {
      },
    });
};
