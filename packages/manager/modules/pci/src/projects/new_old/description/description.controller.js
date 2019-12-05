import map from 'lodash/map';
import size from 'lodash/size';
import template from 'lodash/template';

export default class PciProjectNewDescriptionCtrl {
  /* @ngInject */
  constructor($q, PciProjectNewService) {
    // dependencies injections
    this.$q = $q;
    this.PciProjectNewService = PciProjectNewService;

    // other attributes used in view
    this.step = null;
  }

  /* ==============================
  =            Helpers            =
  =============================== */

  getCompiledLinks(linkTemplate) {
    return map(this.contracts, (contract) => {
      const compile = template(linkTemplate);
      return compile(contract);
    }).join(', ');
  }

  /* -----  End of Helpers  ------ */

  /* ====================================
  =            Initialzation            =
  ===================================== */

  $onInit() {
    this.step = this.getCurrentStep();

    if (!size(this.contracts)) {
      // if no agreements - consider them as accepted
      this.step.model.agreements = true;
    }

    return true;
  }

  /* -----  End of Initialzation  ------ */
}
