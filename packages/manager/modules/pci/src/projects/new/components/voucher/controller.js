export default class PciProjectNewVoucherCtrl {
  constructor() {
    // other attributes
    this.formVisible = false;

    this.loading = {
      check: false,
    };
  }

  /* ==============================
  =            Helpers            =
  =============================== */

  setVoucherFormState() {
    this.voucherForm.voucher.$setValidity('voucher', this.model.voucher.valid);
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
      })
      .catch(() => {
        this.model.voucher.valid = false;
        this.setVoucherFormState();
      })
      .finally(() => {
        this.loading.check = false;
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
