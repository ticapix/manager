# entities

> OVH $http interceptor working with SSO. Can be used with $resource!

[![npm version](https://badgen.net/npm/v/@ovh-ux/entities)](https://www.npmjs.com/package/@ovh-ux/entities) [![Downloads](https://badgen.net/npm/dt/@ovh-ux/entities)](https://npmjs.com/package/@ovh-ux/entities) [![Dependencies](https://badgen.net/david/dep/ovh/manager/packages/components/entities)](https://npmjs.com/package/@ovh-ux/entities?activeTab=dependencies) [![Dev Dependencies](https://badgen.net/david/dev/ovh/manager/packages/components/entities)](https://npmjs.com/package/@ovh-ux/entities?activeTab=dependencies) [![Gitter](https://badgen.net/badge/gitter/ovh-ux/blue?icon=gitter)](https://gitter.im/ovh/ux)

## Install

```sh
$ yarn add @ovh-ux/entities
```

# Usage

```js
import angular from 'angular';
import ngOvhSsoAuth from '@ovh-ux/entities';

angular
  .module('myApp', [
    ngOvhSsoAuth,
  ])
  .config(/* @ngInject */($httpProvider, constants, ssoAuthenticationProvider) => {
    ssoAuthenticationProvider
      .setLoginUrl(constants.prodMode ? constants.loginUrl : 'auth.html');

    ssoAuthenticationProvider
      .setLogoutUrl(constants.prodMode ? '/engine/api/auth/logout' : 'api/proxypass/auth/logout');

    ssoAuthenticationProvider
      .setUserUrl(constants.prodMode ? '/engine/api/me' : 'api/user');

    const configuration = [
      {
        serviceType: 'api',
        urlPrefix: 'api',
      },
      {
        serviceType: 'aapi',
        urlPrefix: constants.prodMode ? '../2api-m' : '2api-m',
      },
      {
        serviceType: 'apiv6',
        urlPrefix: 'apiv6',
      },
    ];

    ssoAuthenticationProvider.setConfig(configuration);

    $httpProvider.interceptors.push('OvhSsoAuthInterceptor');
  })
  .run(/* @ngInject */(ssoAuthentication) => {
    ssoAuthentication
      .login()
      .then(() => {
        // Do what you want after login.
      });
  });
```

## Test

```sh
$ yarn test
```

## Related

- [@ovh-ux/entities-modal-plugin](https://github.com/ovh/manager/tree/master/packages/components/entities-modal-plugin) - OVH SSO module - Modal plugin

## Contributing

Always feel free to help out! Whether it's [filing bugs and feature requests](https://github.com/ovh/manager/issues/new) or working on some of the [open issues](https://github.com/ovh/manager/issues), our [contributing guide](https://github.com/ovh/manager/blob/master/CONTRIBUTING.md) will help get you started.

## License

[BSD-3-Clause](LICENSE) © OVH SAS
