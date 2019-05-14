import component from './component';

export const state = {
  component: component.name,
  name: 'hello',
  resolve: {
    me: /* @ngInject */ OvhApiMe => OvhApiMe.v6().get().$promise,
  },
  translations: {
    format: 'json',
    value: ['.', '..'],
  },
  url: '/hello',
};

export const registerState = /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(state.name, state);
};

export default {
  registerState,
  state,
};
