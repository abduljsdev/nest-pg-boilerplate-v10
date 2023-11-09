export const ERROR_MESSAGES = {
  COMMON: {
    '001': 'something has gone wrong on the website server',
    '002': `Upload correct file type`,
    '003': 'Please upload image file',
    '004': 'Request body should not empty',
  },
  USER: {
    '001': 'Admin can not change other admin password',
    '002': 'User not found',
    '003': 'User already exist',
    '004': 'Password does not match',
    '005': 'User can not register your self',
    '006': 'Admin can not use user api for registration',
    '007': 'Please inter valid role',
    '008': 'Empty body not allowed',
    '009': 'Password send successfully',
    '010': 'Verification code is expire',
    '011': 'OTP code is invalid or expire',
    '012': 'User can not register as admin',
    '013': 'Invalid user id',
    '014': 'Your account has been disabled',
  },
};

export const SUCCESS_MESSAGES = {
  COMMON: {},
  USER: {
    '001': 'Logged in successfully',
    '002': 'OTP send successfully',
    '003': 'OTP verified',
    '004': 'Password changed successfully',
    '005': 'Profile updated successfully',
    '006': 'Account created successfully',
    '007': 'Account status changed successfully',
    '008': 'Account deleted successfully',
  },
};
