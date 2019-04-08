export default class {
  /* @ngInject */
  constructor($state, $stateParams, adpService, ADP_STATUS, ADP_STATUS_MAP,
    CucControllerHelper, CucServiceHelper) {
    this.$state = $state;
    this.adpService = adpService;
    this.ADP_STATUS = ADP_STATUS;
    this.ADP_STATUS_MAP = ADP_STATUS_MAP;
    this.cucControllerHelper = CucControllerHelper;
    this.cucServiceHelper = CucServiceHelper;
    this.$stateParams = $stateParams;
    this.serviceName = this.$stateParams.serviceName;
  }

  $onInit() {
    this.getClusters();
  }

  /**
   * fetch all cluster nodes along with their details
   *
   * @returns array of cluster nodes along with their details
   */
  getClusters() {
    this.getAllClusters = this.cucControllerHelper.request.getArrayLoader({
      loaderFunction: () => this.adpService.getAdpWithDetails()
        .catch(error => this.cucServiceHelper.errorHandler('adp_get_cluster_error')(error)),
    });
    return this.getAllClusters.load();
  }

  refresh() {
    return this.getClusters();
  }

  createAdp() {
    this.$state.go('adp.deploy');
  }

  manageCluster(serviceName) {
    this.$state.go('adp.service.details', { serviceName });
  }
}
