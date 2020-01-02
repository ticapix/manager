export default class ExchangeTabPublicFolderCtrl {
  /* @ngInject */
  constructor(
    $scope,
    Exchange,
    $timeout,
    ExchangePublicFolders,
    messaging,
    $translate,
    navigation,
    exchangeStates,
  ) {
    this.services = {
      $scope,
      Exchange,
      $timeout,
      ExchangePublicFolders,
      messaging,
      $translate,
      navigation,
      exchangeStates,
    };

    this.$routerParams = Exchange.getParams();

    this.loading = false;
    this.publicFoldersList = null;
    this.search = {
      value: null,
    };

    this.displayPublicFolders();

    $scope.$on(Exchange.events.publicFoldersChanged, () =>
      $scope.$broadcast('paginationServerSide.reload', 'publicFoldersTable'),
    );

    $scope.retrievingMailingLists = (count, offset) =>
      this.retrievingMailingLists(count, offset);
    $scope.getPublicFoldersList = () => this.publicFoldersList;
    $scope.getLoading = () => this.loading;
    $scope.displayPublicFolders = () => this.displayPublicFolders();
  }

  onSearch() {
    this.retrievingMailingLists();
  }

  retrievingMailingLists(count, offset) {
    this.services.messaging.resetMessages();
    this.loading = true;
    const searchString =
      this.search && this.search.value
        ? this.search.value.replace(/\\/g, '')
        : '';

    return this.services.ExchangePublicFolders.retrievingPublicFolders(
      this.$routerParams.organization,
      this.$routerParams.productId,
      count,
      offset,
      searchString,
    )
      .then((data) => {
        this.publicFoldersList = data;
      })
      .catch((failure) => {
        this.services.messaging.writeError(
          this.services.$translate.instant(
            'exchange_tab_SHARED_all_error_message',
          ),
          failure,
        );
      })
      .finally(() => {
        this.loading = false;
      });
  }

  newShared() {
    this.services.navigation.setAction('exchange/shared/add/shared-add');
  }

  displayPublicFolders() {
    this.resetSearch();

    this.showPublicFolders = true;
    this.showPermissions = false;
    this.services.$scope.selectedFolder = null;
  }

  displayPermissions(folder) {
    this.resetSearch();

    this.showPublicFolders = false;
    this.showPermissions = true;
    this.services.$scope.selectedFolder = folder;

    this.services.$scope.$broadcast(
      'paginationServerSide.loadPage',
      1,
      'publicFoldersTable',
    );
  }

  resetSearch() {
    this.search.value = null;
    this.services.$scope.$broadcast(
      'paginationServerSide.loadPage',
      1,
      'publicFoldersTable',
    );
  }
}
