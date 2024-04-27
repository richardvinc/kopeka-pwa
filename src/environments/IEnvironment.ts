export interface IEnvironment {
  production: boolean;
  appName: string;
  env: 'local' | 'dev' | 'qa' | 'prod';
  firebase: {
    projectId: string;
    appId: string;
    storageBucket: string;
    apiKey: string;
    authDomain: string;
    messagingSenderId: string;
    measurementId: string;
  };
}
