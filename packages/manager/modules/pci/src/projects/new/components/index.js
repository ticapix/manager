import angular from 'angular';

import progress from './progress';
import voucher from './voucher';

const moduleName = 'pciProjectNewComponents';

angular
  .module(moduleName, [
    progress,
    voucher,
  ]);

export default moduleName;