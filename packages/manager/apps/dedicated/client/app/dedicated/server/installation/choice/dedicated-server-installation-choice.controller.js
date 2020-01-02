angular.module('App').controller('ServerInstallationChoiceCtrl', [
  '$scope',

  function ServerInstallationChoiceCtrl($scope) {
    $scope.choice = {
      value: 1,
      ovh: 1,
      personal: 2,
    };

    $scope.goInstall = function goInstall() {
      if ($scope.choice.value === $scope.choice.ovh) {
        $scope.setAction(
          'installation/ovh/dedicated-server-installation-ovh',
          $scope.currentActionData,
        );
      } else if ($scope.choice.value === $scope.choice.personal) {
        $scope.setAction(
          'installation/gabarit/dedicated-server-installation-gabarit',
          $scope.currentActionData,
        );
      }
    };
  },
]);
