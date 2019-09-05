import split from 'lodash/split';

export default class {
  constructor($timeout) {
    'ngInject';

    this.$timeout = $timeout;
  }

  $onInit() {
    this.selectedRegion = this.enterpriceDb.datacenter;
  }

  onRegionSelect(region) {
    this.selectedRegion = region;
    this.enterpriceDb.datacenter = region;
    if (this.onChange) {
      this.$timeout(() => this.onChange({ region: this.selectedRegion }));
    }
  }

  static getIcons(region) {
    const splitArray = split(region, '-');
    return `flag-icon flag-icon-${splitArray[2]}`;
  }
}
