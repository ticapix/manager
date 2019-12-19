# [6.2.0](https://github.com/ovh/manager/compare/@ovh-ux/manager-freefax@6.1.0...@ovh-ux/manager-freefax@6.2.0) (2019-12-19)


### Features

* add order availability for telecom services ([90c27d8](https://github.com/ovh/manager/commit/90c27d8c986ff20d0519fbde87bb11d3e433aa46))



# [6.1.0](https://github.com/ovh/manager/compare/@ovh-ux/manager-freefax@6.0.2...@ovh-ux/manager-freefax@6.1.0) (2019-11-28)


### Features

* **freefax:** add freefax listing view ([ca27a24](https://github.com/ovh/manager/commit/ca27a244ec72cb7a6cbb5be73f453e53dd3eca2c))



## [6.0.2](https://github.com/ovh/manager/compare/@ovh-ux/manager-freefax@6.0.1...@ovh-ux/manager-freefax@6.0.2) (2019-11-22)


### Bug Fixes

* **deps:** upgrade ovh-api-services to v9.27.1 ([fb116c4](https://github.com/ovh/manager/commit/fb116c4a0e9085c71e8fe1266b818f3464e5bc94))



## [6.0.1](https://github.com/ovh/manager/compare/@ovh-ux/manager-freefax@6.0.0...@ovh-ux/manager-freefax@6.0.1) (2019-11-15)


### Bug Fixes

* **deps:** upgrade ovh-api-services to v9.26.0 ([#1789](https://github.com/ovh/manager/issues/1789)) ([90361dc](https://github.com/ovh/manager/commit/90361dc945014853db1cf4535e2d5b89b67efbea))



# [6.0.0](https://github.com/ovh/manager/compare/@ovh-ux/manager-freefax@5.2.3...@ovh-ux/manager-freefax@6.0.0) (2019-11-13)


### Code Refactoring

* rename `ng-uirouter-title` to `ng-ui-router-title` ([a7631fa](https://github.com/ovh/manager/commit/a7631fac619f9052cac9ab7770bc31b8631b8285))


### BREAKING CHANGES

* module is now named as `ngUiRouterTitle

Signed-off-by: Antoine Leblanc <antoine.leblanc@corp.ovh.com>



## [5.2.3](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@5.2.2...@ovh-ux/manager-freefax@5.2.3) (2019-10-17)


### Bug Fixes

* **deps:** upgrade @ovh-ux/component-rollup-config to v7.0.0 ([#1469](https://github.com/ovh-ux/manager/issues/1469)) ([bbc8794](https://github.com/ovh-ux/manager/commit/bbc8794))



## [5.2.2](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@5.2.1...@ovh-ux/manager-freefax@5.2.2) (2019-09-03)


### Bug Fixes

* fix version for tuc ([836fed6](https://github.com/ovh-ux/manager/commit/836fed6))



## [5.2.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@5.2.0...@ovh-ux/manager-freefax@5.2.1) (2019-07-15)


### Bug Fixes

* bump lodash to version >= 4.17.14 ([#1072](https://github.com/ovh-ux/manager/issues/1072)) ([1a32ddc](https://github.com/ovh-ux/manager/commit/1a32ddc))



# [5.2.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@5.1.2...@ovh-ux/manager-freefax@5.2.0) (2019-07-05)


### Features

* add new packages ([09b5158](https://github.com/ovh-ux/manager/commit/09b5158))



## [5.1.2](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@5.1.1...@ovh-ux/manager-freefax@5.1.2) (2019-05-14)


### Bug Fixes

* **i18n:** add missing translations ([471503c](https://github.com/ovh-ux/manager/commit/471503c))



## [5.1.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@5.1.0...@ovh-ux/manager-freefax@5.1.1) (2019-05-13)


### Bug Fixes

* **deps:** upgrade ng-ovh-telecom-universe-components to v3.0.3 ([574ff83](https://github.com/ovh-ux/manager/commit/574ff83))



# [5.1.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@5.0.0...@ovh-ux/manager-freefax@5.1.0) (2019-05-07)


### Features

* **storages.volume-snapshots:** add volume-snapshots list ([#359](https://github.com/ovh-ux/manager/issues/359)) ([c8a63fd](https://github.com/ovh-ux/manager/commit/c8a63fd))



# [5.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@4.0.0...@ovh-ux/manager-freefax@5.0.0) (2019-03-19)


### Code Refactoring

* bump all packages to [@ovh-ux](https://github.com/ovh-ux)/manager-core@^5.0.0 ([7cbc70a](https://github.com/ovh-ux/manager/commit/7cbc70a))


### BREAKING CHANGES

* Until theses packages has a dependency to @ovh-ux/manager-core@^5.0.0, the host project needs to import @ovh-ux/manager-config

Before:

yarn add @ovh-ux/manager-core

Now:

yarn add @ovh-ux/manager-config
yarn add @ovh-ux/manager-core



# [4.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@3.0.1...@ovh-ux/manager-freefax@4.0.0) (2019-03-13)


### Build System

* **deps:** upgrade dependencies ([#252](https://github.com/ovh-ux/manager/issues/252)) ([f87f7b7](https://github.com/ovh-ux/manager/commit/f87f7b7))


### BREAKING CHANGES

* **deps:** replace both `@ovh-ux/ng-ovh-apiv7` and `ovh-angular-swimming-poll` by `@ovh-ux/ng-ovh-api-wrappers` and `@ovh-ux/ng-ovh-swimming-poll`



## [3.0.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@3.0.0...@ovh-ux/manager-freefax@3.0.1) (2019-02-28)


### Bug Fixes

* **i18n:** add missing translations ([1c99f17](https://github.com/ovh-ux/manager/commit/1c99f17))
* **i18n:** add missing translations ([701d753](https://github.com/ovh-ux/manager/commit/701d753))



# [3.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@2.0.0...@ovh-ux/manager-freefax@3.0.0) (2019-02-26)


### Build System

* **deps:** upgrade ng-ovh-apiv7 to v2.0.0 ([ac6ac62](https://github.com/ovh-ux/manager/commit/ac6ac62))


### BREAKING CHANGES

* **deps:** replace `ovh-angular-apiv7` by `@ovh-ux/ng-ovh-apiv7`



# [2.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@1.0.6...@ovh-ux/manager-freefax@2.0.0) (2019-01-29)


### Build System

* **deps:** upgrade ng-ovh-telecom-universe-components to v2.0.1 ([3ffc516](https://github.com/ovh-ux/manager/commit/3ffc516))


### BREAKING CHANGES

* **deps:** replace `@ovh-ux/telecom-universe-components` by `@ovh-ux/ng-ovh-telecom-universe-components`



## [1.0.6](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@1.0.5...@ovh-ux/manager-freefax@1.0.6) (2019-01-21)


### Bug Fixes

* **telecom-styles:** fix elements using rem ([00c5425](https://github.com/ovh-ux/manager/commit/00c5425))



## [1.0.5](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@1.0.4...@ovh-ux/manager-freefax@1.0.5) (2019-01-17)


### Bug Fixes

* **deps:** bump [@ovh-ux](https://github.com/ovh-ux)/ng-ovh-contracts dependency ([5cdfb1a](https://github.com/ovh-ux/manager/commit/5cdfb1a))



## [1.0.4](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@1.0.3...@ovh-ux/manager-freefax@1.0.4) (2019-01-17)


### Bug Fixes

* use new component to display contracts ([f0e0a1b](https://github.com/ovh-ux/manager/commit/f0e0a1b))



## [1.0.3](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@1.0.2...@ovh-ux/manager-freefax@1.0.3) (2019-01-15)


### Bug Fixes

* **freefax:** add bootstrap4 styles ([33c9f75](https://github.com/ovh-ux/manager/commit/33c9f75))



## [1.0.2](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@1.0.1...@ovh-ux/manager-freefax@1.0.2) (2019-01-10)


### Bug Fixes

* **freefax:** add bootstrap4 styles ([27f6ea7](https://github.com/ovh-ux/manager/commit/27f6ea7))



## [1.0.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@1.0.0...@ovh-ux/manager-freefax@1.0.1) (2019-01-03)


### Bug Fixes

* rework imports to improve standalone modules ([9cdabab](https://github.com/ovh-ux/manager/commit/9cdabab))
* use [@ovh-ux](https://github.com/ovh-ux)/manager-telecom-styles ([d9d6f3f](https://github.com/ovh-ux/manager/commit/d9d6f3f))



# [1.0.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@1.0.0-alpha.2...@ovh-ux/manager-freefax@1.0.0) (2018-12-12)


### Bug Fixes

* add missing dependencies ([adb3e60](https://github.com/ovh-ux/manager/commit/adb3e60))
* **deps:** bump ovh-angular-contracts ([008f084](https://github.com/ovh-ux/manager/commit/008f084))
* update ng-uirouter-title usage ([440fbc5](https://github.com/ovh-ux/manager/commit/440fbc5))
* **i18n:** add missing translations ([dbc8faa](https://github.com/ovh-ux/manager/commit/dbc8faa))


### Features

* add lazyload on multiple components and styles ([abb6047](https://github.com/ovh-ux/manager/commit/abb6047))


### Performance Improvements

* **lodash:** avoid importing global lodash ([294b3f7](https://github.com/ovh-ux/manager/commit/294b3f7))



# [1.0.0-alpha.2](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@1.0.0-alpha.1...@ovh-ux/manager-freefax@1.0.0-alpha.2) (2018-12-05)



# [1.0.0-alpha.1](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@1.0.0-alpha.0...@ovh-ux/manager-freefax@1.0.0-alpha.1) (2018-11-28)


### Bug Fixes

* **deps:** update ovh-angular-contracts ([5a0a58c](https://github.com/ovh-ux/manager/commit/5a0a58c))



# [1.0.0-alpha.0](https://github.com/ovh-ux/manager/compare/@ovh-ux/manager-freefax@0.0.0...@ovh-ux/manager-freefax@1.0.0-alpha.0) (2018-11-26)



