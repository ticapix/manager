import reduce from 'lodash/reduce';
import illustration from './assets/baremetal.png';
import { GUIDES } from './onboarding.constants';

export default class PciBaremetalOnboardingController {
  /* @ngInject */
  constructor($translate) {
    this.$translate = $translate;
  }

  $onInit() {
    this.illustration = illustration;
    this.guides = reduce(
      GUIDES,
      (list, guide) => [
        ...list,
        {
          ...guide,
          title: this.$translate.instant(
            `pci_projects_project_baremetal_onboarding_guides_${guide.id}_title`,
          ),
          description: this.$translate.instant(
            `pci_projects_project_baremetal_onboarding_guides_${guide.id}_description`,
          ),
        },
      ],
      [],
    );
  }
}
