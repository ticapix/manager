import has from 'lodash/has';

angular.module('managerApp').controller('TelecomPackMigrationBuildingDetailsCtrl', class TelecomPackMigrationBuildingDetailsCtrl {
  constructor($translate, TucPackMigrationProcess, OvhApiConnectivityEligibility) {
    this.$translate = $translate;
    this.TucPackMigrationProcess = TucPackMigrationProcess;
    this.OvhApiConnectivityEligibility = OvhApiConnectivityEligibility;
  }

  /*= =====================================
  =            INITIALIZATION            =
  ====================================== */
  $onInit() {
    this.process = null;
    this.loading = {
      init: true,
    };
    this.model = {
      engageMonths: null,
      selectedBuilding: null,
      selectedStair: null,
      selectedFloor: null,
      pto: null,
      ptoReference: null,
      ptoReferenceNotKnown: false,
    };

    this.process = this.TucPackMigrationProcess.getMigrationProcess();

    this.process.selectedOffer.buildings.forEach((building, i) => {
      // check if the building name is empty to set a name to display in the select component
      if (building.name === '') {
        this.process.selectedOffer.buildings[i].name = this.$translate.instant('telecom_pack_migration_building_details_unknown');
      }

      const params = {
        building: building.reference,
      };

      this.OvhApiConnectivityEligibility.v6().buildingDetails({
      }, params).$promise.then((buildingDetails) => {
        if (has(buildingDetails, 'result.stairs')) {
          this.process.selectedOffer.buildings[i].stairs = buildingDetails.result.stairs.map(
            (stair) => this.convertStairs(stair),
          );
        }
      }).finally(() => {
        this.loading.init = false;
      });
    });
  }

  /* -----  End of INITIALIZATION  ------*/

  /*= ==============================
  =            ACTIONS            =
  =============================== */

  cancelMigration() {
    this.TucPackMigrationProcess.cancelMigration();
  }

  nextStep() {
    this.process.selectedOffer.buildingReference = this.model.selectedBuilding.reference;
    this.process.selectedOffer.stair = this.model.selectedStair.stair.value;
    this.process.selectedOffer.floor = this.model.selectedFloor.value;
    this.process.selectedOffer.pto = this.model.pto;
    if (this.model.pto && !this.model.ptoReferenceNotKnown) {
      this.process.selectedOffer.ptoReference = this.model.ptoReference;
    }

    if (this.process.selectedOffer.totalSubServiceToDelete > 0) {
      this.process.currentStep = 'serviceDelete';
    } else if (this.process.selectedOffer.needNewModem) {
      this.process.currentStep = 'shipping';
    } else {
      this.process.currentStep = 'confirm';
    }
  }

  isValidSelection() {
    if (this.model.selectedBuilding != null && this.model.selectedStair != null
      && this.model.selectedFloor != null && this.model.pto != null) {
      if (this.model.pto && ((this.model.ptoReference != null && this.model.ptoReference !== '') || this.model.ptoReferenceNotKnown)) {
        return true;
      } if (!this.model.pto) {
        return true;
      }
      return false;
    }
    return false;
  }

  convertStairs(stair) {
    const stairsModel = {};
    if (stair.stair === '_NA_') {
      stairsModel.stair = {
        label: this.$translate.instant('telecom_pack_migration_building_details_none'),
        value: stair.stair,
      };
    } else {
      stairsModel.stair = {
        label: stair.stair,
        value: stair.stair,
      };
    }

    if (stair.floors[0] === '_NA_') {
      stairsModel.floors = [{
        label: this.$translate.instant('telecom_pack_migration_building_details_none'),
        value: stair.floors[0],
      }];
    } else {
      stairsModel.floors = stair.floors.map((floor) => ({ label: floor, value: floor }));
    }
    return stairsModel;
  }

  /**
   * Set default stairs model for empty stairs
   */
  defaultStairsModel() {
    return {
      stair: {
        label: this.$translate.instant('telecom_pack_migration_building_details_none'),
        value: '_NA_',
      },
      floors: [{
        label: this.$translate.instant('telecom_pack_migration_building_details_none'),
        value: '_NA_',
      }],
    };
  }

  changeSelection(isFromStairs) {
    if (!isFromStairs) {
      if (this.model.selectedBuilding.stairs.length === 0) {
        const params = {
          building: this.model.selectedBuilding.reference,
        };
        this.OvhApiConnectivityEligibility.v6().buildingDetails({
        }, params).$promise.then((buildingDetails) => {
          if (has(buildingDetails, 'result.stairs')) {
            if (buildingDetails.result.stairs.length === 0) {
              const stairModel = this.defaultStairsModel();
              this.model.selectedBuilding.stairs.push(stairModel);
            } else {
              this.model.selectedBuilding.stairs = buildingDetails.result.stairs.map(
                (stair) => this.convertStairs(stair),
              );
            }
          }
        });
      }
      if (this.model.selectedStair != null) {
        this.model.selectedStair = null;
      }
      if (this.model.selectedFloor != null) {
        this.model.selectedFloor = null;
      }
    } else {
      this.model.selectedFloor = null;
    }
  }

  /* -----  End of ACTIONS  ------*/
});
