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
        icons: 'flag-icon flag-icon-gra',
      },
      {
        id: 'SYD1',
        name: 'SYD1',
        icons: 'flag-icon flag-icon-syd',
      },
      {
        id: 'SGP1',
        name: 'SGP1',
        icons: 'flag-icon flag-icon-sgp',
      },
    ];
    this.selectedRegion = head(this.regions);
  }

  onRegionSelect(region) {
    this.selectedRegion = region;
  }
}
