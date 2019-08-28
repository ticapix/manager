export const ENTERPRISE_CLOUD_DATABASE_STATUS_MAP = {
  created: 'success',
  creating: 'warning',
  deleting: 'warning',
  reopening: 'warning',
  restarting: 'warning',
  scaling: 'warning',
  suspended: 'error',
  suspending: 'warning',
  updating: 'warning',
};

export const ENTERPRISE_CLOUD_DATABASE_STATUS = {
  created: 'created',
  creating: 'creating',
  deleting: 'deleting',
  reopening: 'reopening',
  restarting: 'restarting',
  scaling: 'scaling',
  suspended: 'suspended',
  suspending: 'suspending',
  updating: 'updating',
};

export const PROCESSING_STATUS = [
  'creating',
  'deleting',
  'reopening',
  'restarting',
  'scaling',
  'suspending',
  'updating',
];

export const ERROR_STATUS = [
  'suspended',
];
export const SUCCESS_STATUS = [
  'created',
];

export const GUIDELINK = 'https://docs.ovh.com/';
export const DELETE_CONFIRMATION_INPUT = /^DELETE$/;

export default {
  DELETE_CONFIRMATION_INPUT,
  ENTERPRISE_CLOUD_DATABASE_STATUS_MAP,
  ENTERPRISE_CLOUD_DATABASE_STATUS,
  ERROR_STATUS,
  GUIDELINK,
  PROCESSING_STATUS,
};
