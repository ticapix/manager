import controller from './card.controller';
import template from './card.html';

export default {
  bindings: {
    id: '@?',
    name: '@?',
    label: '@',
    image: '@?',
    disabled: '<?',
    model: '=?',
    selected: '<?',
    onChange: '&',
  },
  controller,
  template,
  transclude: {
    footerSlot: '?enterpriseCloudDatabaseCardFooter',
    bodySlot: '?enterpriseCloudDatabaseCardBody',
  },
};
