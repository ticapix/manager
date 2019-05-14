/**
 * Difference between loading a module and importing a module
 *
 * Loading a module means:
 * - loading its content
 * - executing its content
 *
 * Modules are singletons, so only one instance of them exists
 *
 * Loading a module may have the following consequences:
 * - if the content exports a feature, then it will be available to be imported by other modules
 * - if the content changes the global object, then the changes will be done
 *
 * Importing is an optional step that follows loading
 *
 * It means, using in the importing module a feature exposed by the exporting module
 */

// here we import the feature exported by the "angular" module and we call it "angular"
import angular from 'angular';

/**
 * Here we load the "@ovh-ux/manager-core" module
 * The body of "@ovh-ux/manager-core" executes code on the "angular" object
 * As "angular" is a singleton, what "@ovh-ux/manager-core" executes on it
 * is reflected here
 */
import '@ovh-ux/manager-core';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';

import component from './component';
import {
  registerState,
  state,
} from './routing';

const moduleName = 'ovhManagerHello';

angular
  .module(moduleName, [
    'ngTranslateAsyncLoader',
    'ovhManagerCore',
    'pascalprecht.translate',
    'ui.router',
  ])
  .component(component.name, component)
  .config(registerState)
  .run(/* @ngTranslationsInject:json ./translations */)
  .run(/* @ngInject */ ($transitions, $translate) => {
    $transitions.onBefore({ to: `${state.name}.**` }, () => $translate.refresh());
  });

export default moduleName;
