import assignIn from 'lodash/assignIn';
import head from 'lodash/head';
import isArray from 'lodash/isArray';
import set from 'lodash/set';
import sortBy from 'lodash/sortBy';

export default class {
  /* @ngInject */
  constructor($scope, $stateParams, $filter, $translate, TucToast, TucToastError,
    OvhApiPackXdslMove, OvhApiConnectivityEligibilitySearch, OvhApiConnectivityEligibility) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$filter = $filter;
    this.$translate = $translate;
    this.TucToast = TucToast;
    this.TucToastError = TucToastError;
    this.OvhApiPackXdslMove = OvhApiPackXdslMove;
    this.OvhApiConnectivityEligibilitySearch = OvhApiConnectivityEligibilitySearch;
    this.OvhApiConnectivityEligibility = OvhApiConnectivityEligibility;
  }

  $onInit() {
    this.phoneNumberRegex = '^0[1-5]([\\s\\-]?([0-9]){2}){4}$';
  }

  updateLineAccessibility() {
    this.loading = true;
    this.lineNumber = this.testLine.lineNumber.replace(/[^0-9]/g, '');
    this.submited();

    /*
    this.OvhApiConnectivityEligibilitySearch.v6().searchBuildingByLines(this.$scope, {
      lineNumber: this.lineNumber,
      status: 'active',
    }).then((data) => {
      // console.log('search building', data);
      if (data.status.includes('error')) {
        this.offersChange({ OFFERS: [] });
        return new this.TucToastError(data, data.error);
      }
      const buildings = data.result;
      const offers = [];

      this.OvhApiConnectivityEligibility.v6().testLine(this.$scope, {
        lineNumber: this.lineNumber,
        status: 'active',
      }).then((res) => {
        if (res.status.includes('error')) {
          return new this.TucToastError(res, res.error);
        }
        const lineReference = res.result.eligibilityReference;
        // console.log('reference', lineReference);
        // Retrieve offers for line
        return this.OvhApiPackXdslMove.v6().pollOffers(this.$scope, {
          packName: this.$stateParams.packName,
          eligibilityReference: lineReference,
        }).then((dataOffers) => {
          // console.log('offers for line', dataOffers);
          if (dataOffers.result.offers.length > 0) {
            offers.push(dataOffers.result.offers);
          }

          // Retrieve offers for FTTH
          buildings.forEach(building =>
            this.OvhApiConnectivityEligibility.v6().testBuilding(this.$scope, {
            building: building.reference,
          }).then((resFTTH) => {
            // console.log('test building', resFTTH);
            if (resFTTH.status.includes('error')) {
              return new this.TucToastError(resFTTH, resFTTH.error);
            }
            const ftthReference = resFTTH.result.eligibilityReference;
            return this.OvhApiPackXdslMove.v6().pollOffers(this.$scope, {
              packName: this.$stateParams.packName,
              eligibilityReference: ftthReference,
            }).then((dataFTTH) => {
              // console.log('offers for FTTH', dataFTTH);
              if (dataFTTH.result.offers.length > 0) {
                offers.push(dataFTTH.result.offers);
              }
            });
          }));
        });
      });
    });
    */

    return this.OvhApiPackXdslMove.v6().pollElligibility(this.$scope, {
      packName: this.$stateParams.packName,
      lineNumber: this.lineNumber,
    }).then(
      (data) => {
        if (data.error) {
          this.offersChange({ OFFERS: [] });
          return new this.TucToastError(data, data.error);
        }
        // console.log('line offers', data.result.offers);
        if (angular.isDefined(data.result.offers)) {
          assignIn(this.testLine, data);
          this.offers = isArray(data.result.offers) ? data.result.offers : [];

          if (this.offers.length === 0) {
            this.TucToast.error(this.$translate.instant('pack_move_eligibility_no_offers', { number: this.lineNumber }));
          }
        }
        this.offers.forEach((offer) => {
          // console.log('offer', offer);
          set(offer, 'lineNumber', this.lineNumber);
          if (offer.meetingSlots) {
            set(offer, 'meetingSlots.calendarData', [offer.meetingSlots.meetingSlots.map(slot => ({
              tooltip: [this.$filter('date')(slot.startDate, 'HH:mm'), this.$filter('date')(slot.endDate, 'HH:mm')].join(' - '),
              title: '',
              start: slot.startDate,
              end: slot.endDate,
              data: slot,
            }))]);
            set(offer, 'meetingSlots.firstSlot', head(sortBy(offer.meetingSlots.meetingSlots, ['startDate'])));
          }
        });
        this.offersChange({ OFFERS: this.offers });
        return data;
      },
      () => new this.TucToastError(this.$translate.instant('pack_move_eligibility_error')),
    ).finally(() => {
      this.loading = false;
    });
  }
}
