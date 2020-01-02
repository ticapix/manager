import isString from 'lodash/isString';
import set from 'lodash/set';

angular.module('App').controller(
  'SessionCtrl',
  class {
    /* @ngInject */
    constructor($document, $scope, $state, $transitions, $translate) {
      this.$document = $document;
      this.$scope = $scope;
      this.$state = $state;
      this.$transitions = $transitions;
      this.$translate = $translate;
    }

    $onInit() {
      set(this.$document, 'title', this.$translate.instant('global_app_title'));

      this.hooksToUnsubscribe = [
        this.$transitions.onStart({}, () => {
          this.closeSidebar();
        }),
        this.$transitions.onSuccess({}, () => {
          this.displayAccountSidebar = ['support', 'app.account'].some((name) =>
            this.$state.includes(name),
          );
        }),
      ];

      // Scroll to anchor id
      this.$scope.scrollTo = (id) => {
        // Set focus to target
        if (isString(id)) {
          this.$document.find(`#${id}`)[0].focus();
        }
      };
    }

    openSidebar() {
      this.sidebarIsOpen = true;
    }

    closeSidebar() {
      this.sidebarIsOpen = false;
    }

    $onDestroy() {
      this.hooksToUnsubscribe.forEach((hook) => hook());
    }
  },
);
