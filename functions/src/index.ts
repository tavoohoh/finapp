/* eslint  @typescript-eslint/no-explicit-any: "off" */
import { credential, initializeApp } from 'firebase-admin';
import firebase from 'firebase';

import * as serviceAccount from '../service-account-key.json';
import * as firebaseConfig from '../firebase-config.json';

initializeApp({
  credential: credential.cert(serviceAccount as any),
  databaseURL: firebaseConfig.databaseURL
});

firebase.initializeApp(firebaseConfig);

export { periods } from './routes/periods.route';
export { transactions } from './routes/transactions.route';
export { budgets } from './routes/budgets.route';
export { api } from './routes/api/api.route';
