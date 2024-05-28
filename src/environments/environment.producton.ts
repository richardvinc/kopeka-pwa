import { IEnvironment } from './IEnvironment';

export const environment: IEnvironment = {
  production: true,
  appName: 'Kopeka',
  baseUrl: 'https://api.kopeka.id',
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
  googleMapId: '',
};
