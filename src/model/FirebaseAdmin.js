const fs = require('fs');
const admin = require('firebase-admin');

/** Database key */
const securedPath = "./fudbook-b3184-firebase-adminsdk-oj6pw-e9861767b6.json";
const serviceAccount = JSON.parse(fs.readFileSync(securedPath, 'utf8'));

/** Initialize Firebase app */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fudbook-b3184.firebaseio.com"
});

module.exports = admin;