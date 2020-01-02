export default class ExchangeRemoveAccountCtrl {
  /* @ngInject */
  constructor($scope, Exchange, navigation, messaging, $translate) {
    this.services = {
      $scope,
      Exchange,
      navigation,
      messaging,
      $translate,
    };

    $scope.submit = () => this.submit();
    $scope.getTitle = () => this.getTitle();

    this.$routerParams = Exchange.getParams();

    this.account = navigation.currentActionData;
    this.removeAccountInsteadOfReset = Exchange.removeAccountInsteadOfReset(
      Exchange.value,
    );
  }

  getTitle() {
    return this.removeAccountInsteadOfReset
      ? this.services.$translate.instant('exchange_tab_account_remove_account')
      : this.services.$translate.instant('exchange_tab_account_reset_account');
  }

  submit() {
    this.services.Exchange.removingAccount(
      this.$routerParams.organization,
      this.$routerParams.productId,
      this.account.primaryEmailAddress,
    )
      .then((success) => {
        this.services.messaging.writeSuccess(
          this.removeAccountInsteadOfReset
            ? this.services.$translate.instant(
                'exchange_tab_account_remove_success',
              )
            : this.services.$translate.instant(
                'exchange_tab_account_reset_success',
              ),
          success,
        );
      })
      .catch((failure) => {
        this.services.messaging.writeError(
          this.removeAccountInsteadOfReset
            ? this.services.$translate.instant(
                'exchange_tab_account_remove_failure',
              )
            : this.services.$translate.instant(
                'exchange_tab_account_reset_failure',
              ),
          failure,
        );
      })
      .finally(() => {
        this.services.navigation.resetAction();
      });
  }
}
