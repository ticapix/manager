import angular from 'angular';

import defaultMethod from './default';
import dlp from './dlp';
import register from './register';

const moduleName = 'pciProjectNewPaymentComponents';

angular
  .module(moduleName, [
    defaultMethod,
    dlp,
    register,
  ]);

export default moduleName;
