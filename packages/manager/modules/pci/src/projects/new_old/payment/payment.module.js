import angular from 'angular';
import '@uirouter/angularjs';
import 'ovh-ui-angular';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import '@ovh-ux/ng-ovh-payment-method';

// deps
import paymentAdd from './add';
import paymentCreditInfo from './creditInfo';
import paymentCredits from './credits';
import paymentDefault from './default';
import paymentChallenge from './challenge';

import './payment.scss';

import routing from './payment.routing';
import component from './payment.component';

const moduleName = 'ovhManagerPciProjectsNewPayment';

angular
  .module(moduleName, [
    paymentAdd,
    paymentChallenge,
    paymentCreditInfo,
    paymentCredits,
    paymentDefault,
    'ui.router',
    'oui',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    'ngOvhPaymentMethod',
  ])
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */)
  .component('pciProjectNewPayment', component);

export default moduleName;
