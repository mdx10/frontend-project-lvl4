// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  signupPath: () => [host, prefix, 'signup'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  dataPath: () => [host, prefix, 'data'].join('/'),
  homePagePath: () => [host, ''].join('/'),
  loginPagePath: () => [host, 'login'].join('/'),
  signupPagePath: () => [host, 'signup'].join('/'),
};
