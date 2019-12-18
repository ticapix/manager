import find from 'lodash/find';
import head from 'lodash/head';
import map from 'lodash/map';

import PciCartProject from './classes/cart.class';

import {
  PCI_PROJECT_ORDER_CART,
} from './constants';

export default class PciProjectNewService {
  /* @ngInject */
  constructor(orderCart, OvhApiCloud, OvhApiOrder) {
    this.orderCart = orderCart;
    this.OvhApiCloud = OvhApiCloud;
    this.OvhApiOrder = OvhApiOrder;
  }

  checkEligibility(voucher = null) {
    return this.OvhApiCloud.v6()
      .getEligibility({ voucher }).$promise;
  }

  /**
   *  Get order cart from it's id or get a new one
   *  @param  {string} ovhSubsidiary The subsidiary of the possible new cart
   *  @param  {string} [cartId]      A previously created cart id
   *  @return {Promise}              That returns a cart.
   */
  getOrderCart(ovhSubsidiary, cartId = null) {
    let cartPromise;
    let orderCart;

    if (cartId) {
      cartPromise = this.OvhApiOrder.Cart().v6().get({ cartId }).$promise
        .then((cartOptions) => {
          orderCart = new PciCartProject(cartOptions);
          return orderCart;
        })
        .catch((error) => {
          if (error.status === 404) {
            return this.createOrderCart(ovhSubsidiary);
          }

          return Promise.reject(error);
        });
    } else {
      cartPromise = this.createOrderCart(ovhSubsidiary);
    }

    return cartPromise
      .then(projectCart => this.getOrderCartProjectItem(projectCart))
      .then(() => orderCart);
  }

  /**
   *  Create an order cart
   *  @param  {string} ovhSubsidiary The subsidiary of the cart.
   *  @return {Promise}              Which returns the new created cart.
   */
  createOrderCart(ovhSubsidiary) {
    let newCart;

    return this.orderCart.createNewCart(ovhSubsidiary)
      .then((cart) => {
        newCart = new PciCartProject(cart);
        return newCart;
      })
      .then(() => this.orderCart.assignCart(newCart.cartId))
      .then(() => newCart);
  }

  getOrderCartProjectItem(projectCart) {
    let cartProjectItem;
    const { cartId } = projectCart;

    return this.OvhApiOrder.Cart().Item().v6().query({
      cartId,
    }).$promise
      .then((itemIds) => {
        const itemPromises = map(itemIds, itemId => this.OvhApiOrder.Cart().Item().v6().get({
          cartId,
          itemId,
        }).$promise);

        return Promise.all(itemPromises);
      })
      .then((items) => {
        cartProjectItem = find(
          items,
          item => item.settings.planCode === PCI_PROJECT_ORDER_CART.planCode,
        );

        if (!cartProjectItem) {
          return this.createOrderCartProjectItem(projectCart);
        }

        // set project item to cart and get the possible configuration
        return this.getOrderCartProjectItemConfiguration(
          projectCart.setProjectItem(cartProjectItem),
        );
      });
  }

  createOrderCartProjectItem(projectCart) {
    const { cartId } = projectCart;

    return this.orderCart.getProductOffers(cartId, PCI_PROJECT_ORDER_CART.productName)
      .then((offers) => {
        const pciProjectOffer = find(offers, {
          planCode: PCI_PROJECT_ORDER_CART.planCode,
        });

        if (!pciProjectOffer) {
          return this.$q.reject({
            status: 404,
            data: {
              message: `planCode ${PCI_PROJECT_ORDER_CART.planCode} not found`,
            },
          });
        }

        const { duration, pricingMode } = head(pciProjectOffer.prices);

        return this.orderCart.addProductToCart(cartId, PCI_PROJECT_ORDER_CART.productName, {
          duration,
          planCode: PCI_PROJECT_ORDER_CART.planCode,
          pricingMode,
          quantity: 1,
        });
      });
  }

  getOrderCartProjectItemConfiguration(projectCartItem) {
    const { cartId, itemId } = projectCartItem;
    const configResource = this.OvhApiOrder.Cart().Item().Configuration();

    return configResource.v6().query({
      cartId,
      itemId,
    }).$promise
      .then((configurationIds) => {
        const configPromises = map(configurationIds, configurationId => configResource.v6().get({
          cartId,
          itemId,
          configurationId,
        }).$promise.then((configuration) => {
          switch (configuration.label) {
            case 'description':
              return projectCartItem.setDescriptionConfiguration(configuration);
            default:
              return configuration;
          }
        }));

        return Promise.all(configPromises)
          .then(() => projectCartItem);
      });
  }

  setCartProjectItemDescription(projectCart, description) {
    const { cartId, itemId } = projectCart;
    return this.orderCart.addConfigurationItem(cartId, itemId, 'description', description)
      .then(descriptionConfig => projectCart.setDescriptionConfiguration(descriptionConfig));
  }
}
