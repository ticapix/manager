import component from './delegate.component';

export default {
  url: '/configuration/email-delegate/:productId',
  params: {
    productId: 'string',
  },
  name: 'app.email.delegate',
  component: component.name,
  reloadOnSearch: false,
  redirectTo: 'app.email.delegate.accounts',
  resolve: {
    currentSection: () => 'email_delegate',
    domainName: /* @ngInject */ $transition$ => $transition$.params().productId,
    navigationInformations: /* @ngInject */ ($rootScope, Navigator) => {
      $rootScope.currentSectionInformation = 'email_delegate'; // eslint-disable-line no-param-reassign

      return Navigator.setNavigationInformation({
        leftMenuVisible: true,
        configurationSelected: true,
      });
    },
  },
};
