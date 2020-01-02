export default class TelecomAppCtrl {
  /* @ngInject */
  constructor($q, $state, $transitions, betaPreferenceService, ovhUserPref) {
    this.displayFallbackMenu = false;
    $transitions.onStart({}, () => this.closeSidebar());

    this.$q = $q;
    this.$state = $state;
    this.betaPreferenceService = betaPreferenceService;
    this.ovhUserPref = ovhUserPref;
  }

  $onInit() {
    return this.betaPreferenceService.isBetaActive().then((beta) => {
      this.globalSearchLink = beta
        ? this.$state.href('telecomSearch', {})
        : null;
    });
  }

  openSidebar() {
    this.displayFallbackMenu = true;
    $('#sidebar-menu').addClass('displayFallbackMenu');
  }

  closeSidebar() {
    this.displayFallbackMenu = false;
    $('#sidebar-menu').removeClass('displayFallbackMenu');
  }
}
