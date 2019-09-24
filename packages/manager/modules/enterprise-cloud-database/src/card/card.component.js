import controller from './card.controller';
import template from './card.html';

export default {
  bindings: {
    disabled: '<?',
    id: '@?',
    image: '@?',
    label: '@',
    model: '=?',
    name: '@?',
    onChange: '&',
    selected: '<?',
  },
  controller,
  template,
  transclude: {
    footerSlot: '?enterpriseCloudDatabaseCardFooter',
    bodySlot: '?enterpriseCloudDatabaseCardBody',
  },
};
