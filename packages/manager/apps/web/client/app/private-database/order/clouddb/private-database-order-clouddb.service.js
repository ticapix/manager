import flatten from 'lodash/flatten';
import get from 'lodash/get';

import {
  DATACENTER_CONFIGURATION_KEY,
  ENGINE_CONFIGURATION_KEY,
  PLAN_CODE_TEMPLATE,
  PRODUCT_NAME,
} from './private-database-order-clouddb.constants';

export default class PrivateDatabaseOrderCloudDb {
  /* @ngInject */
  constructor(OrderService) {
    this.OrderService = OrderService;
  }

  getCloudDBCatalog(ovhSubsidiary) {
    return this.OrderService.getProductPublicCatalog(
      ovhSubsidiary,
      PRODUCT_NAME,
    );
  }

  getDurationsFromRamOption(cartId, ramSize) {
    const ramRegExp = new RegExp(ramSize);
    return this.OrderService.getProductOffers(cartId, PRODUCT_NAME).then(
      (offers) =>
        offers
          .find(({ planCode }) => ramRegExp.test(planCode))
          .prices.map(({ duration, interval, pricingMode }) => ({
            duration,
            interval,
            pricingMode,
          })),
    );
  }

  prepareCheckout(cartId, cartOption) {
    return this.OrderService.deleteAllItems(cartId)
      .then(() => this.addCloudDBToCart(cartId, cartOption))
      .then(({ itemId }) =>
        this.addConfiguration(
          cartId,
          itemId,
          cartOption.datacenter,
          cartOption.engine,
        ),
      )
      .then(() => this.OrderService.getCheckoutInformations(cartId));
  }

  addCloudDBToCart(cartId, cloudDBOptions) {
    const planCode = PLAN_CODE_TEMPLATE.replace('xxxx', cloudDBOptions.ramSize);

    return this.OrderService.addProductToCart(cartId, PRODUCT_NAME, {
      duration: cloudDBOptions.duration,
      planCode,
      pricingMode: cloudDBOptions.pricingMode,
      quantity: 1,
    });
  }

  addConfiguration(cartId, itemId, datacenter, version) {
    const datacenterLabel = DATACENTER_CONFIGURATION_KEY;
    const versionLabel = ENGINE_CONFIGURATION_KEY;
    return this.OrderService.addConfigurationItem(
      cartId,
      itemId,
      datacenterLabel,
      datacenter,
    ).then(() =>
      this.OrderService.addConfigurationItem(
        cartId,
        itemId,
        versionLabel,
        version,
      ),
    );
  }

  validateCheckout(cartId, checkout) {
    return this.OrderService.checkoutCart(cartId, checkout);
  }

  static filterOrderableItems(plans, filterKey) {
    return Array.from(
      new Set(
        flatten(
          flatten(plans.map(({ configurations }) => configurations))
            .filter(({ name }) => name === filterKey)
            .map(({ values }) => values),
        ),
      ),
    );
  }

  static getPricings(plans) {
    return plans.map(({ planCode, pricings }) => ({
      planCode,
      pricings,
    }));
  }

  static getOrderableDatacenters(plans) {
    return PrivateDatabaseOrderCloudDb.filterOrderableItems(
      plans,
      DATACENTER_CONFIGURATION_KEY,
    );
  }

  static getOrderableEngines(plans) {
    return PrivateDatabaseOrderCloudDb.filterOrderableItems(
      plans,
      ENGINE_CONFIGURATION_KEY,
    );
  }

  static getOrderableRamSizes(schema) {
    return get(schema.models, 'hosting.PrivateDatabase.AvailableRamSizeEnum')
      .enum;
  }
}
