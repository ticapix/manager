import clone from 'lodash/clone';
import isEmpty from 'lodash/isEmpty';
import round from 'lodash/round';
import set from 'lodash/set';

export default class EmailDomainDelegate {
  constructor(
    $scope,
    $q,
    $stateParams,
    $timeout,
    $translate,
    Alerter,
    OvhApiEmailDomain,
    WucEmails,
  ) {
    this.$scope = $scope;
    this.$q = $q;
    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this.$translate = $translate;
    this.Alerter = Alerter;
    this.OvhApiEmailDomain = OvhApiEmailDomain;
    this.WucEmails = WucEmails;
  }

  $onInit() {
    return this.getAccounts();
  }

  getAccounts() {
    return this
      .OvhApiEmailDomain
      .delegatedAccount()
      .Iceberg()
      .query()
      .expand('CachedObjectList-Pages')
      .execute().$promise
      .then(accounts => accounts);
  }

  /* Accounts */
  loadEmails() {
    this.loading.accounts = true;
    this.emails = null;

    return this.WucEmails
      .getDelegatedEmails(
        this.$stateParams.productId,
        `%${this.search.accounts || ''}%`,
      )
      .then((data) => {
        this.emails = data.sort();
      })
      .catch((err) => {
        this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_table_accounts_error'),
          err,
          this.$scope.alerts.main,
        );
      })
      .finally(() => {
        if (isEmpty(this.emails)) {
          this.loading.accounts = false;
          this.loading.search = false;
        }
      });
  }

  transformItem(item) {
    return this.$q
      .all({
        email: this.WucEmails.getDelegatedEmail(item),
        usage: this.WucEmails.getEmailDelegatedUsage(item),
      })
      .then(({ email, usage }) => {
        const emailData = clone(email);

        emailData.quota = usage.quota;
        emailData.emailCount = usage.emailCount;
        emailData.date = usage.date;

        EmailDomainDelegate.setAccountPercentUse(emailData);

        return emailData;
      });
  }

  onTransformItemDone() {
    this.loading.accounts = false;
    this.loading.search = false;
  }

  updateUsage(account) {
    this.loading.usage = true;

    return this.WucEmails
      .updateDelegatedUsage(account.email)
      .then(() => this.WucEmails.getEmailDelegatedUsage(account.email))
      .then(() => EmailDomainDelegate.setAccountPercentUse(account))
      .catch((err) => {
        this.Alerter.alertFromSWS(
          this.$translate.instant('email_tab_modal_update_usage_error'),
          err,
          this.$scope.alerts.main,
        );
      })
      .finally(() => {
        this.loading.usage = false;
      });
  }

  static setAccountPercentUse(account) {
    set(account, 'percentUse', account.size > 0 ? round((account.quota * 100) / account.size) : 0);
  }
}
