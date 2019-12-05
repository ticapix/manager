import template from './description.html';
import controller from './description.controller';

export default {
  template,
  controller,
  bindings: {
    contracts: '<',
    descriptionModel: '<',
    getCurrentStep: '<',
    navigateToUrl: '<',
    newProjectInfo: '<',
    onDescriptionStepFormSubmit: '<',
    url: '<',
  },
};
