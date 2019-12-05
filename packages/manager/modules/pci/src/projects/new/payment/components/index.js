import angular from 'angular';

import defaultMethod from './default';
import dlp from './dlp';

const moduleName = 'pciProjectNewPaymentComponents';

angular
  .module(moduleName, [
    defaultMethod,
    dlp,
  ]);

export default moduleName;