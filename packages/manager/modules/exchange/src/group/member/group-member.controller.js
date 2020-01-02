export default class ExchangeTabMembersByGroupsCtrl {
  /* @ngInject */
  constructor(
    $scope,
    Exchange,
    $timeout,
    navigation,
    messaging,
    $translate,
    group,
  ) {
    this.services = {
      $scope,
      Exchange,
      $timeout,
      navigation,
      messaging,
      $translate,
      group,
    };

    this.$routerParams = Exchange.getParams();
    this.groupParams = {};

    $scope.$on(Exchange.events.accountsChanged, () => this.refreshList());
    $scope.getMembersList = () => this.membersList;
    $scope.getMembersByGroup = (pageSize, offset) =>
      this.getMembersByGroup(pageSize, offset);
  }

  getMembersByGroup({ pageSize, offset }) {
    this.groupParams.pageSize = pageSize;
    this.groupParams.offset = offset;
    this.services.messaging.resetMessages();

    return this.services.group
      .retrievingMembersByGroup(
        this.$routerParams.organization,
        this.$routerParams.productId,
        this.services.navigation.selectedGroup.mailingListName,
        pageSize,
        offset - 1,
      )
      .then((accounts) => {
        this.membersList = accounts.list.results;
        return {
          data: accounts.list.results,
          meta: {
            totalCount: accounts.count,
          },
        };
      })
      .catch((failure) =>
        this.services.messaging.writeError(
          this.services.$translate.instant(
            'exchange_tab_ACCOUNTS_error_message',
          ),
          failure,
        ),
      );
  }

  refreshList() {
    this.services.group
      .retrievingMembersByGroup(
        this.$routerParams.organization,
        this.$routerParams.productId,
        this.services.navigation.selectedGroup.mailingListName,
        this.groupParams.pageSize,
        this.groupParams.offset - 1,
      )
      .then((data) => {
        for (let i = 0; i < data.list.results.length; i += 1) {
          this.membersList.splice(i, 1, data.list.results[i]);
        }
        for (
          let i = data.list.results.length;
          i < this.membersList.length;
          i += 1
        ) {
          this.membersList.splice(i, 1);
        }
      })
      .catch((failure) =>
        this.services.messaging.writeError(
          this.services.$translate.instant(
            'exchange_tab_ACCOUNTS_error_message',
          ),
          failure,
        ),
      );
  }

  hide() {
    this.services.$scope.$emit('showGroups');
  }

  removeMember(member) {
    this.services.navigation.setAction(
      'exchange/group/member/remove/group-member-remove',
      {
        group: this.services.navigation.selectedGroup,
        member,
      },
    );
  }
}
