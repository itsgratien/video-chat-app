export const environment = {
  baseUrl: process.env.REACT_APP_BACKEND || '',
};

export enum AppEnum {
  Token = 'video_auth_token',

  CurrentUser = 'currentUser'
}
