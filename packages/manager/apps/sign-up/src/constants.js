export const SANITIZATION = {
  regex: /^\s*(?:(?:(?:https?|ftp|file|blob):\/\/(?:(?:(?:[^./?#]+\.)*(?:ovh|(?:ovhcloud(?=\.com))|(?:ovhtelecom(?=\.fr))|(?:ovh-hosting(?=\.fi))|soyoustart|kimsufi|runabove)\.(?:com|net|org|ovh|co\.uk|com\.tn|cz|de|es|eu|fi|fr|ie|it|lt|ma|nl|pl|pt|sn|uk|us))|localhost|127\.0\.0\.1|[\w-]+\.uxci(-ca|-us)?\.ovh)(?::\d+)?)|data:image)(?:\/|$)/i,
};

export const TRACKING = {
  pagePrefix: 'accountcreation-',
  categories: {
    individual: '1',
    association: '2',
    corporation: '3',
    personalcorporation: '3',
    other: '4',
    administration: '5',
  },
};

export default {
  SANITIZATION,
  TRACKING,
};
