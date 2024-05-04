import { IEnvironment } from './IEnvironment';

export const environment: IEnvironment = {
  production: true,
  appName: 'Kopeka',
  env: 'prod',
  firebase: {
    projectId: '',
    appId: '',
    storageBucket: '',
    apiKey: '',
    authDomain: '',
    messagingSenderId: '',
    measurementId: '',
  },
  googleMapKey: '',
};
