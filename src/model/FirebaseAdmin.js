const fs = require('fs');
const admin = require('firebase-admin');

/** Database key */
const securedPath = "./fudbook-5e7edf-firebase-adminsdk-20jr7-73e9a6e404.json";
const serviceAccount = JSON.parse(fs.readFileSync(securedPath, 'utf8'));

/** Initialize Firebase app */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fudbook-5e7edf.firebaseio.com"
});

module.exports = admin;