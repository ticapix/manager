import find from 'lodash/find';

import PciCartProjectItemConfiguration from './cart.project.item.configuration.class';

export default class PciCartProjectItem {
  constructor(options) {
    this.cartId = options.cartId;
    this.itemId = options.itemId;
    this.settings = options.settings;

    this.configurations = [];
  }

  get descriptionConfiguration() {
    return find(this.configurations, {
      label: 'description',
    });
  }

  get infrastructureConfiguration() {
    return find(this.configurations, {
      label: 'infrastructure',
    });
  }

  addConfiguration(configurationOptions) {
    const configuration = new PciCartProjectItemConfiguration(configurationOptions);
    this.configurations.push(configuration);
    return configuration;
  }
}
