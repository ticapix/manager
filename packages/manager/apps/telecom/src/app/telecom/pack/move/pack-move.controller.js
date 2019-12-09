import chunk from 'lodash/chunk';
import assignIn from 'lodash/assignIn';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import head from 'lodash/head';
import map from 'lodash/map';
import set from 'lodash/set';

export default class {
  /* @ngInject */
  constructor($filter, $q, $scope, $timeout, $translate, REDIRECT_URLS,
    OvhApiPackXdslMove, TucToast, TucToastError,
    OvhApiPackXdslTask, OvhApiPackXdsl, OvhApiXdsl, uiCalendarConfig, tucValidator) {
    this.$timeout = $timeout;
    this.$translate = $translate;
    this.$filter = $filter;
    this.$scope = $scope;
    this.$q = $q;
    this.REDIRECT_URLS = REDIRECT_URLS;
    this.OvhApiPackXdslMove = OvhApiPackXdslMove;
    this.TucToast = TucToast;
    this.TucToastError = TucToastError;
    this.OvhApiPackXdslTask = OvhApiPackXdslTask;
    this.OvhApiPackXdsl = OvhApiPackXdsl;
    this.OvhApiXdsl = OvhApiXdsl;
    this.uiCalendarConfig = uiCalendarConfig;
    this.tucValidator = tucValidator;
  }

  $onInit() {
    this.taskMovePendingName = 'pendingAddressMove';
    this.moveValidationPending = false;

    this.operationAlreadyPending = false;

    this.packAdress = {
      loading: false,
      current: null,
    };

    this.testLine = {
      loading: false,
      lineNumber: null,
      canMove: false,
      performed: false,
    };

    this.method = 'number';

    this.form = {
      futureLandline: {
        lineNumber: null,
        keepLineNumber: false,
        rio: null,
      },
      currentLandline: {
        lineNumber: null,
        portLineNumber: true,
      },
      offerCode: null,
    };

    this.offer = {
      available: [],
      current: {
        isLegacy: null,
      },
      selected: null,
    };

    /**
     * Calendar configuration
     */
    this.calendarConfig = {
      selectable: true,
      timeFormat: 'HH:mm',
      displayEventEnd: true,
      header: {
        left: 'title',
        center: '',
        right: 'prev,next',
      },
      eventClick(slot) {
        set(slot, 'display', {
          day: this.$filter('date')(slot.data.startDate, 'dd/MM/yyyy'),
          start: this.$filter('date')(slot.data.startDate, 'HH:mm'),
          end: this.$filter('date')(slot.data.endDate, 'HH:mm'),
        });
        this.offer.meetingSlots.slot = slot;
        this.uiCalendarConfig.calendars.mainCalendar.fullCalendar('rerenderEvents');
      },
      eventRender(slot, element) {
        const classNames = ['ovh-pack-move-event'];
        if (this.offer.meetingSlots.slot && (this.offer.meetingSlots.slot._id === slot._id)) {
          classNames.push('selected');
        }
        element.attr({
          class: classNames.join(' '),
        });
      },
      eventAfterAllRender() {
        if (this.uiCalendarConfig.calendars && this.uiCalendarConfig.calendars.mainCalendar
            && !this.offer.meetingSlots.slot) {
          this.uiCalendarConfig.calendars.mainCalendar.fullCalendar(
            'gotoDate',
            this.offer.selected.meetingSlots.firstSlot.startDate,
          );
        }
      },
    };

    this.packAdress = {
      loading: true,
    };
    this.loading = true;
    this.$q.all([
      this.isSlammingLine(),
      this.updateOperationAlreadyPending(),
      this.updateIsLegacyOffer(),
      this.getCurrentPackAddress(),
    ]).finally(() => {
      this.loading = false;
    });
    this.$scope.$watch('PackMove.offer.selected.portability.eligible', (value) => {
      if (!value) {
        this.form.futureLandline.keepLineNumber = false;
      }
    });
    this.$scope.$watch('PackMove.packAdress.portability', (value) => {
      if (!value) {
        this.form.currentLandline.portLineNumber = false;
      }
    });
  }

  /**
    * Move the pack !
    * The post need the poll of the task (by repost),
    * this made by recursive call of this function
    *
    * @returns {void}
    */
  moveThePack(moveDataParam) {
    let moveData = moveDataParam;
    if (!moveData) {
      moveData = {
        keepCurrentNumber: this.form.currentLandline.portLineNumber,
        offerCode: this.offer.selected.offerCode,
        provider: this.offer.selected.provider,
      };
      if (this.offer.selected.lineNumber) {
        moveData.landline = {
          lineNumber: this.offer.selected.lineNumber,
          portLineNumber: this.form.futureLandline.keepLineNumber,
          rio: this.tucValidator.tucIsRio(
            this.form.futureLandline.rio,
            this.form.futureLandline.lineNumber,
          )
            ? this.form.futureLandline.rio.toUpperCase() : undefined,
          status: this.offer.selected.lineStatus,
          unbundling: this.offer.selected.unbundling,
        };
      } else {
        moveData.creation = {
          address: this.offer.selected.address,
          meeting: {
            fakeMeeting: this.offer.meetingSlots.fakeMeeting,
            name: this.offer.selected.contactName,
            meetingSlot: !this.offer.meetingSlots.fakeMeeting
              ? this.offer.meetingSlots.slot.data : undefined,
          },
        };
      }
      // The post data need to be sealed for to be exactly the same at each post
      moveData = angular.copy(moveData);

      this.moveValidationPending = true;
    }

    this.OvhApiPackXdslMove.v6().move({
      packName: this.packName,
    }, moveData).$promise.then((data) => {
      switch (data.status) {
        case 'pending':
          this.$timeout(() => {
            this.moveThePack(moveData);
          }, 1000);
          break;

        case 'error':
          this.$translate('pack_move_cannot_validate_move', { message: data.error })
            .then((translation) => {
              this.TucToast.error(translation, { hideAfter: false });
            });

          this.moveValidationError = true;
          this.moveValidationPending = false;
          this.moveValidationSuccess = false;
          break;

        default:
          this.$timeout(() => {
            this.$state.go('telecom.pack', {
              packName: this.packName,
            });
          }, 3000);

          this.moveValidationError = false;
          this.moveValidationPending = false;
          this.moveValidationSuccess = true;
          break;
      }
    }, (err) => {
      const message = [];

      if (err) {
        if (err.statusText) {
          message.push(err.statusText);
        }

        if (err.data && err.data.message) {
          message.push(err.data.message);
        }
      }

      this.$translate('pack_move_cannot_validate_move', { message: message.join(' ') })
        .then((translation) => {
          this.TucToast.error(translation, { hideAfter: false });
        });

      this.moveValidationPending = false;
    });
  }

  /**
   * Open the confirm model and then launch the move
   */
  /*
  openConfirmModal() {
    // if (this.moveValidationError) {
    //   this.moveValidationError = false;
    //   return;
    // }

    // const modal = $uibModal.open({
    //   animation: true,
    //   templateUrl: 'app/telecom/pack/move/contract/pack-move-contract.modal.html',
    //   controller: 'PackMoveContractCtrl',
    //   controllerAs: 'PackMoveContract',
    //   resolve: {
    //     data() {
    //       return {
    //         form: self.form,
    //         offer: self.offer.selected,
    //         meeting: {
    //           fakeMeeting: self.offer.meetingSlots.fakeMeeting,
    //           slot: self.offer.meetingSlots.slot ? self.offer.meetingSlots.slot.display : {},
    //         },
    //         packName: $stateParams.packName,
    //       };
    //     },
    //   },
    // });

    // modal.result.then((result) => {
    //   if (result === true) {
    //     this.moveThePack();
    //   }
    // });
  }
  */

  /**
   * Test if the form is valid
   * @returns {boolean}
   */
  isFormValid() {
    const keepLine = !this.form.futureLandline.keepLineNumber
      || this.tucValidator.tucIsRio(this.form.futureLandline.rio,
        this.form.futureLandline.lineNumber);
    const ftMeeting = (this.offer.selected && this.offer.meetingSlots)
      && (!this.offer.selected.meetingSlots
      || (this.offer.selected.meetingSlots && this.offer.meetingSlots.fakeMeeting)
      || (this.offer.selected.meetingSlots && !this.offer.meetingSlots.fakeMeeting
        && this.offer.meetingSlots.slot));

    return keepLine && ((ftMeeting && this.offer.selected.contactName) || this.method === 'number');
  }

  /**
   * Compute the offers
   * @param offers
   */
  computeOffer(offers) {
    // console.log('compute offers', offers);
    this.testLine = {
      canMove: offers.length,
    };
    if (this.testLine.canMove) {
      this.testLine.performed = true;
      assignIn(this.offer, {
        available: offers,
        selected: head(offers),
      });
      this.offerSelected(this.offer.selected);
      this.form.futureLandline.lineNumber = this.offer.selected.lineNumber;
    } else {
      this.testLine.performed = false;
      assignIn(this.offer, {
        available: [],
        selected: null,
      });
    }
  }

  /**
   * Launched before testing eligibility
   */
  ongoingTest() {
    this.testLine = {
      loading: true,
      canMove: false,
      performed: false,
    };
    assignIn(
      this.offer,
      {
        available: [],
        selected: null,
      },
    );
  }

  /**
   * Get URL of oldV6 pack move
   * @returns {string}
   */
  getOldV6TransfertUrl() {
    return this.REDIRECT_URLS.oldV6ServiceTransfert;
  }

  /**
   * Invoked when an offer is selected
   * @param offer
   */
  offerSelected() {
    this.offer.meetingSlots = {
      fakeMeeting: false,
    };

    /* if no meeting available, check the fakeMeeting.
      Do not offer a check box to the user if there is no choice to make */
    if (!(this.offer.selected && this.offer.selected.meetingSlots
      && this.offer.selected.meetingSlots.meetingSlots
      && this.offer.selected.meetingSlots.meetingSlots.length)) {
      this.offer.meetingSlots.fakeMeeting = true;
    }
  }

  /**
   * Check if can keep line number
   * @returns {boolean}
   */
  canKeepLineNumber() {
    const canKeep = this.offer.selected.portability.eligible && this.offer.selected.unbundling !== 'partial';
    if (!canKeep) {
      this.form.futureLandline.keepLineNumber = false;
    }
    return canKeep;
  }

  /**
   * Check is a pending move is on-going
   * @returns {Promise}
   */
  updateOperationAlreadyPending() {
    return this.OvhApiPackXdslTask.Aapi().details({
      packName: this.packName,
    }).$promise.then((data) => {
      data.forEach((task) => {
        if (task.function === this.taskMovePendingName) {
          this.operationAlreadyPending = true;
        }
      });
    }, err => new (this.TucToastError(err))());
  }

  /**
   * Check is current offer is legacy
   * @returns {Promise}
   */
  updateIsLegacyOffer() {
    return this.OvhApiPackXdsl.v6().get({
      packId: this.packName,
    }).$promise.then((data) => {
      this.offer.current.isLegacy = data.capabilities.isLegacyOffer;
    }, err => new (this.TucToastError(err))());
  }

  /**
   * Get the current pack address
   * @returns {Promise}
   */
  getCurrentPackAddress() {
    return this.$q.all([
      this.OvhApiPackXdsl.Aapi().get({ packId: this.packName }, null).$promise.then((pack) => {
        this.packAdress.current = head(pack.services);
        return this.packAdress.current ? this.packAdress.current.accessName : null;
      }, err => new (this.TucToastError(err))()),
      this.OvhApiPackXdsl.Aapi()
        .getLines({ packId: this.packName }, null).$promise.then((lines) => {
          const currentLine = head(lines);
          this.packAdress.lineNumber = currentLine.number;
          this.packAdress.portability = currentLine.portability;
        }, err => new (this.TucToastError(err))()),
    ]).finally(() => {
      this.packAdress.loading = false;
    });
  }

  /**
   * Check if the line is slamming (meaning that customer cannot keep his phone number)
   * @return {Promise}
   */
  isSlammingLine() {
    this.slammingCheck = true;
    return this.OvhApiPackXdsl.v7().access().execute({
      packName: this.packName,
    }).$promise.then(ids => this.$q.all(map(chunk(ids, 200), chunkIds => this.OvhApiXdsl.v7().query().batch('serviceName', [''].concat(chunkIds), ',').expand()
      .execute().$promise)).then(chunkResult => flatten(chunkResult))
      .then(result => flatten(result))).then((xdslLines) => {
      const slammingLines = filter(xdslLines, xdslLine => xdslLine.value.status === 'slamming');
      this.hasSlamming = !!slammingLines.length;
      return this.hasSlamming;
    }).catch((err) => {
      this.TucToast.error(this.$translate.instant('pack_move_slamming_error'));
      return this.$q.reject(err);
    }).finally(() => {
      this.slammingCheck = false;
    });
  }
}
