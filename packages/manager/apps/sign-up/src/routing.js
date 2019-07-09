import find from 'lodash/find';
import get from 'lodash/get';

import { SANITIZATION, TRACKING } from './constants';

import signupFormComponent from './form/component';

export const state = {
  name: 'sign-up',
  url: '/?lang',
  component: signupFormComponent.name,
  resolve: {
    getRedirectLocation: /* @ngInject */ $location => (nic) => {
      const { callback } = $location.search();
      if (callback && !SANITIZATION.regex.test(callback)) {
        return null;
      }

      const accountParam = encodeURIComponent(nic);

      // use callback for redirection if provided
      if (callback) {
        return `${callback}${/\?/.test(callback) ? '&' : '?'}account=${accountParam}`;
      }

      // redirect to login page on success
      if ($location.search().onsuccess) {
        const onsuccess = encodeURIComponent($location.search().onsuccess);
        return `/auth/?account=${accountParam}&onsuccess=${onsuccess}`;
      }

      return '/auth/?action=gotomanager';
    },
    getStepByName: /* @ngInject */ steps => name => find(steps, {
      name,
    }),
    isActiveStep: /* @ngInject */ ($state, getStepByName) => (name) => {
      const step = getStepByName(name);
      return $state.is(step.state);
    },
    me: /* @ngInject */ ssoAuthentication => ssoAuthentication
      .getSsoAuthPendingPromise()
      .then(() => ssoAuthentication.user),
    onStepFocus: /* @ngInject */ ($state, getStepByName) => (stepName) => {
      const focusedStep = getStepByName(stepName);
      if ($state.current.name !== focusedStep.state) {
        $state.transitionTo(focusedStep.state, $state.params, {
          location: false,
        });
      }
    },
    finishSignUp: /* @ngInject */ (
      $window,
      atInternet,
      getRedirectLocation,
      isActiveStep,
      me,
      signUp,
    ) => () => signUp
      .saveNic(me.model)
      .then(() => {
        // manage tracking
        if (isActiveStep('details')) {
          atInternet.trackEvent({
            page: `${TRACKING.pagePrefix}validationok-step2`,
            category: get(TRACKING, `categories.${me.model.legalform}`),
            event: 'ACCOUNT_CREATION_VALIDATION',
          });
        } else if (isActiveStep('activity')) {
          atInternet.trackEvent({
            page: `${TRACKING.pagePrefix}validationok-step3`,
            category: get(TRACKING, `categories.${me.model.legalform}`),
            event: 'ACCOUNT_CREATION_VALIDATION',
          });
        }

        // manage redirection
        const redirectUrl = getRedirectLocation(me.nichandle);
        if (redirectUrl) {
          $window.location.assign(redirectUrl);
        }
      }),
    steps: () => [{
      name: 'identity',
      state: 'sign-up.identity',
    }, {
      name: 'details',
      state: 'sign-up.details',
    }, {
      name: 'activity',
      state: 'sign-up.activity',
    }],
  },
};

export const registerState = /* @ngInject */ ($stateProvider) => {
  $stateProvider.state(state.name, state);
};

export default {
  registerState,
  state,
};
