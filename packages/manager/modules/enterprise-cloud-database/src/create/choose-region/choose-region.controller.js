import head from 'lodash/head';

export default class {
  constructor() {
    this.dummy = null;
  }

  $onInit() {
    this.initializeMockData();
  }

  initializeMockData() {
    this.regions = [
      {
        id: 'GRA5',
        name: 'GRA5',
        icons: 'fa fa-plus',
      },
      {
        id: 'SYD1',
        name: 'SYD1',
        icons: 'fa fa-refresh',
      },
      {
        id: 'SGP1',
        name: 'SGP1',
        icons: 'fa fa-refresh',
      },
    ];
    this.selectedRegion = head(this.regions);
  }

  onRegionSelect(region) {
    this.selectedRegion = region;
  }
}
