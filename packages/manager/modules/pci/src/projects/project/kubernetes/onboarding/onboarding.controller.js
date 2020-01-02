import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import illustration from './assets/kubernetes.png';
import { GUIDES } from './onboarding.constants';

export default class {
  /* @ngInject */
  constructor($translate) {
    this.$translate = $translate;
  }

  $onInit() {
    this.canCreateCluster = !isEmpty(this.regions);
    this.illustration = illustration;
    this.guides = reduce(
      GUIDES,
      (list, guide) => [
        ...list,
        {
          ...guide,
          title: this.$translate.instant(
            `pci_projects_project_kubernetes_onboarding_guides_${guide.id}_title`,
          ),
          description: this.$translate.instant(
            `pci_projects_project_kubernetes_onboarding_guides_${guide.id}_description`,
          ),
        },
      ],
      [],
    );
  }
}
