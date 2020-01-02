import isString from 'lodash/isString';

export default class WebAppCtrl {
  /* @ngInject */
  constructor($document, $scope, $timeout, $translate) {
    this.$document = $document;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$translate = $translate;

    this.$onInit();
  }

  $onInit() {
    this.$scope.$watch(
      () => this.$translate.instant('global_app_title'),
      () => {
        document.title = this.$translate.instant('global_app_title');
      },
    );

    this.$scope.$on('navbar.loaded', () => {
      this.isNavbarLoaded = true;
    });

    // Scroll to anchor id
    this.$scope.scrollTo = (id) => {
      // Set focus to target
      if (isString(id)) {
        this.$document[0].getElementById(id).focus();
      }
    };
  }

  openSidebar() {
    this.sidebarIsOpen = true;
  }

  closeSidebar() {
    this.sidebarIsOpen = false;
  }
}

angular.module('App').controller('WebAppCtrl', WebAppCtrl);
