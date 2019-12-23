export default class PciProjectNewVoucherCtrl {
  /* @ngInject */
  constructor(pciProjectNew) {
    this.pciProjectNew = pciProjectNew;

    // other attributes
    this.formVisible = false;

    this.loading = {
      check: false,
      reset: false,
    };

    this.errors = {
      check: false,
      reset: false,
    };
  }

  /* ==============================
  =            Helpers            =
  =============================== */

  setVoucherFormState() {
    if (this.voucherForm && this.voucherForm.voucher) {
      this.voucherForm.voucher.$setValidity('voucher', this.model.voucher.valid);
    }
  }

  /* -----  End of Helpers  ------ */


  /* =============================
  =            Events            =
  ============================== */

  onAddVoucherBtnClick() {
    this.formVisible = true;
  }

  onVoucherFormSubmit() {
    this.loading.check = true;

    return this.checkVoucherValidity(this.model.voucher.value)
      .then(({ voucher }) => {
        this.model.voucher.setInfos(voucher);
        this.setVoucherFormState();

        return this.pciProjectNew
          .setCartProjectItemVoucher(this.cart, this.model.voucher.value)
          .then(() => {
            this.errors.check = false;
          })
          .catch(() => {
            this.errors.check = true;
          });
      })
      .catch(() => {
        this.model.voucher.valid = false;
        this.setVoucherFormState();
      })
      .finally(() => {
        this.loading.check = false;
      });
  }

  onVoucherFormReset() {
    this.loading.reset = true;

    this.pciProjectNew.removeCartProjectItemVoucher(this.cart)
      .then(() => {
        this.model.voucher.reset();
        this.errors.reset = false;
      })
      .catch(() => {
        this.errors.reset = true;
      })
      .finally(() => {
        this.loading.reset = false;
      });
  }

  /* -----  End of Events  ------ */

  /* ============================
  =            Hooks            =
  ============================= */

  $onInit() {
    if (this.model.voucher.value) {
      this.formVisible = true;
      this.setVoucherFormState();
    }
  }

  /* -----  End of Hooks  ------ */
}
