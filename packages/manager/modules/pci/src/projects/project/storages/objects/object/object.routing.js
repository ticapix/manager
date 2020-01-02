export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('pci.projects.project.storages.objects.object', {
    url: '/{containerId}',
    component: 'pciProjectStorageContainersContainer',
    resolve: {
      containerId: /* @ngInject */ ($transition$) =>
        $transition$.params().containerId,
      container: /* @ngInject */ (
        PciProjectStorageContainersService,
        projectId,
        containerId,
      ) =>
        PciProjectStorageContainersService.getContainer(projectId, containerId),

      addObject: /* @ngInject */ ($state, projectId, containerId) => () =>
        $state.go('pci.projects.project.storages.objects.object.add', {
          projectId,
          containerId,
        }),
      deleteObject: /* @ngInject */ ($state, projectId, containerId) => (
        object,
      ) =>
        $state.go('pci.projects.project.storages.objects.object.delete', {
          projectId,
          containerId,
          objectId: object.name,
        }),
      goBack: /* @ngInject */ (goToStorageContainers) => goToStorageContainers,

      goToStorageContainer: /* @ngInject */ (
        $rootScope,
        CucCloudMessage,
        $state,
        projectId,
        containerId,
      ) => (message = false, type = 'success') => {
        const reload = message && type === 'success';

        const promise = $state.go(
          'pci.projects.project.storages.objects.object',
          {
            projectId,
            containerId,
          },
          {
            reload,
          },
        );

        if (message) {
          promise.then(() =>
            CucCloudMessage[type](
              message,
              'pci.projects.project.storages.containers.container',
            ),
          );
        }

        return promise;
      },

      refresh: /* @ngInject */ (goToStorageContainer) => goToStorageContainer,

      breadcrumb: /* @ngInject */ (container) => container.name,
    },
  });
};
