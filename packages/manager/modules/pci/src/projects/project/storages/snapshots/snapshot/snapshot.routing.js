export default /* @ngInject */($stateProvider) => {
  $stateProvider
    .state('pci.projects.project.storages.snapshots.snapshot', {
      url: '/{snapshotId}',
      abstract: true,
      resolve: {
        snapshotId: /* @ngInject */$transition$ => $transition$.params().snapshotId,
      },
    });
};
