import template from './backups.html';
import controller from './backups.controller';

export default {
  bindings: {
    backupList: '<',
    defaultPaymentMethod: '<',
  },
  controller,
  template,
};
