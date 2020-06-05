const express = require('express');
const admin = require('firebase-admin');
const fs = require('fs');

const bookServiceRouter = require('./router/bookRouter');

/** Initialize firebase admin */
const securedPath = './fudbook-5e7edf-firebase-adminsdk-20jr7-73e9a6e404.json';
const serviceAccount = JSON.parse(fs.readFileSync(securedPath, 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fudbook-5e7edf.firebaseio.com"
});

/** Initialize app */
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
 
/** Initialize database */
const dbRef = admin.database().ref();

var bookPointer = {
  book: undefined
};

/** Load recipe database */
dbRef.child('book').on('value', snapshot => {
    bookPointer.book = snapshot.val();

    /** Load Router */
});

app.use('/', bookServiceRouter(dbRef, bookPointer));

app.listen(process.env.PORT2, () => { 
  console.log(`Book microservice started on port: ${process.env.PORT2}`);
});