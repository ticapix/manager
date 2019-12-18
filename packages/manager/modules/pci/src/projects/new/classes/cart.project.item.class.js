import PciCartProjectItemConfiguration from './cart.project.item.configuration.class';

export default class PciCartProjectItem {
  constructor(options) {
    this.cartId = options.cartId;
    this.itemId = options.itemId;

    this.descriptionConfiguration = null;
    this.infrastructureConfiguration = null;
  }

  setDescriptionConfiguration(descriptionConfigurationOptions) {
    this.descriptionConfiguration = new PciCartProjectItemConfiguration(
      descriptionConfigurationOptions,
    );
    return this.descriptionConfiguration;
  }
}
