import {
  ANALYTICS_DATA_PLATFORM_CLUSTER_NAME_PATTERN,
} from '../../analytics-data-platform.constants';

export default class {
  /* @ngInject */
  constructor() {
    this.CLUSTER_NAME_PATTERN = ANALYTICS_DATA_PLATFORM_CLUSTER_NAME_PATTERN;
    this.data = {
      clusterName: '',
      selectedCapability: null,
    };
  }

  dataChange() {
    this.onDataChange({ data: this.data });
  }
}
