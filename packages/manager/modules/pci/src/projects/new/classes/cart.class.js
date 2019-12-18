import PciCartProjectItem from './cart.project.item.class';

export default class PciCartProject {
  constructor(options) {
    this.cartId = options.cartId;
    this.projectItem = null;
  }

  setProjectItem(projectItemOptions) {
    this.projectItem = new PciCartProjectItem(projectItemOptions);
    return this.projectItem;
  }
}
