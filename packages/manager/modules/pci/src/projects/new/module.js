import angular from 'angular';
import '@uirouter/angularjs';
import 'ovh-api-services';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';

import components from './components';
import config from './config';
import payment from './payment';

import routing from './routing';
import component from './component';
import service from './service';

import orderCart from './order-cart.service'; // TODO remove it

import './index.scss';

const moduleName = 'ovhManagerPciProjectsNew';

angular
  .module(moduleName, [
    'ui.router',
    'ovh-api-services',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    components,
    config,
    payment,
  ])
  .config((ovhFeatureFlippingProvider) => {
    ovhFeatureFlippingProvider.addFeatures([
      {
        key: 'pci.onboarding.new',
        name: 'New PCI onboarding',
        description: 'Show the new PCI project creation',
        active: {
          region: ['EU', 'CA'],
        },
      },
      {
        key: 'pci.onboarding.new.banner',
        name: 'New PCI onboarding banner',
        description: 'Show the promo code banner in new PCI project creation',
        active: false,
      },
    ]);
  })
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */)
  .component(component.name, component)
  .service('pciProjectNew', service)
  .service('orderCart', orderCart);

export default moduleName;
