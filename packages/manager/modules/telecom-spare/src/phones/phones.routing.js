import map from 'lodash/map';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('spare.phones', {
    url: '/phones',
    views: {
      spareInnerView: 'phonesComponent',
    },
    resolve: {
      phones: /* @ngInject */ OvhApiTelephony => OvhApiTelephony.Spare()
        .v6()
        .query()
        .$promise.then(phones => map(phones, spare => ({ spare }))),
      deleteSpare: /* @ngInject */ $state => spare => $state.go('spare.phones.delete', {
        spare: spare.spare,
      }),
      replaceSpare: /* @ngInject */ $state => spare => $state.go('spare.phones.replace', {
        spare: spare.spare,
      }),
      orderNewPhone: /* @ngInject */ $state => () => $state.go('spare.phones.order'),
      goToPhones: /* @ngInject */ ($state, TucToast) => (message = false, type = 'success') => {
        const reload = message && type === 'success';
        const promise = $state.go('spare.phones', {}, {
          reload,
        });

        if (message) {
          promise.then(() => {
            TucToast[type](message);
          });
        }

        return promise;
      },
    },
  });
};
