import angular from 'angular';

import '@ovh-ux/manager-core';
import '@ovh-ux/ng-ovh-api-wrappers'; // should be a peer dependency of ovh-api-services
import 'angular-translate';
import 'ovh-api-services';
import 'ovh-ui-angular';

import analyticsDataPlatform from './analytics-data-platform';
import baremetal from './baremetal';
import billing from './billing';
import contacts from './contacts';
import creating from './creating';
import edit from './edit';
import failoverIps from './failover-ips';
import instances from './instances';
import kubernetes from './kubernetes';
import sshKeys from './ssh-keys';
import privateNetworks from './private-networks';
import quota from './quota';
import privateRegistry from './private-registry';
import sidebar from './sidebar';
import storages from './storages';
import users from './users';
import vouchers from './vouchers';
import regions from './regions';
import routing from './project.routing';
import streams from './streams';
import workflow from './workflow';

import './project.less';

const moduleName = 'ovhManagerPciProject';

angular
  .module(moduleName, [
    analyticsDataPlatform,
    baremetal,
    billing,
    contacts,
    creating,
    edit,
    failoverIps,
    instances,
    kubernetes,
    privateNetworks,
    quota,
    regions,
    privateRegistry,
    'oui',
    'ovhManagerCore',
    'ovh-api-services',
    'pascalprecht.translate',
    sshKeys,
    sidebar,
    storages,
    users,
    vouchers,
    streams,
    workflow,
  ])
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
