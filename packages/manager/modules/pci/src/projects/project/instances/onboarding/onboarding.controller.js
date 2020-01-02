import reduce from 'lodash/reduce';
import illustration from './assets/instance.png';
import { GUIDES } from './onboarding.constants';

export default class PciInstancesOnboardingController {
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
            `pci_projects_project_instances_onboarding_guides_${guide.id}_title`,
          ),
          description: this.$translate.instant(
            `pci_projects_project_instances_onboarding_guides_${guide.id}_description`,
          ),
        },
      ],
      [],
    );
  }
}
