export const environment = {
  baseUrl: process.env.REACT_APP_BACKEND || '',

  webSocketUrl: process.env.REACT_APP_BACKEND_WEB_SOCKET || '',
};

export enum AppEnum {
  Token = 'video_auth_token',

  CurrentUser = 'currentUser',
}
