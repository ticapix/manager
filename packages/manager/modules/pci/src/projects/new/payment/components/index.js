import angular from 'angular';

import challenge from './challenge';
import defaultMethod from './default';
import dlp from './dlp';
import register from './register';

const moduleName = 'pciProjectNewPaymentComponents';

angular
  .module(moduleName, [
    challenge,
    defaultMethod,
    dlp,
    register,
  ]);

export default moduleName;
