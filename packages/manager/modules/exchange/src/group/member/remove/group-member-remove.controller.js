export default class ExchangeRemoveMemberCtrl {
  /* @ngInject */
  constructor($scope, Exchange, navigation, messaging, $translate) {
    this.services = {
      $scope,
      Exchange,
      navigation,
      messaging,
      $translate,
    };

    this.$routerParams = Exchange.getParams();

    this.group = navigation.currentActionData.group;
    this.member = navigation.currentActionData.member;

    $scope.submit = () => this.submit();
  }

  submit() {
    this.services.messaging.writeSuccess(
      this.services.$translate.instant('exchange_dashboard_action_doing'),
    );

    this.services.Exchange.removeMember(
      this.$routerParams.organization,
      this.$routerParams.productId,
      this.group.mailingListName,
      this.member.id,
      this.member.type,
    )
      .then((success) => {
        this.services.messaging.writeSuccess(
          this.services.$translate.instant(
            'exchange_GROUPS_remove_member_success_message',
            {
              t0: this.member.primaryEmailAddress,
              t1: this.group.mailingListDisplayName,
            },
          ),
          success,
        );
      })
      .catch((failure) => {
        this.services.messaging.writeError(
          this.services.$translate.instant(
            'exchange_GROUPS_remove_member_error_message',
            {
              t0: this.member.primaryEmailAddress,
              t1: this.group.mailingListDisplayName,
            },
          ),
          failure,
        );
      })
      .finally(() => {
        this.services.$scope.$broadcast(
          'paginationServerSide.loadPage',
          1,
          'membersTable',
        );
      })
      .finally(() => {
        this.services.navigation.resetAction();
      });
  }
}
