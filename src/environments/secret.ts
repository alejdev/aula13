
// Copy this file twice and rename: 'environment.ts' and 'environment.prod.ts'
// Replace this by you firebase configs
export const environment = {
  production: false,
  firebase: {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
    appId: "<APP_ID>"
  }
};