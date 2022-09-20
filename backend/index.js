const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();
const port = 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vue-pwa-6a996-default-rtdb.europe-west1.firebasedatabase.app'
});

const db = admin.firestore();

app.get('/posts', async (req, res) => {
  const posts = [];

  res.set('Access-Control-Allow-Origin', '*');

  const citiesRef = db.collection('posts');
  const snapshot = await citiesRef.get();
  snapshot.forEach((doc) => {
    posts.push(doc.data());
  });
  res.send(posts);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
