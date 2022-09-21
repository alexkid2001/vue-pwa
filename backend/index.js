const express = require('express');
const admin = require('firebase-admin');
const busboy = require('busboy');
const serviceAccount = require('./serviceAccountKey.json');
const { fi } = require('vuetify/locale');

const app = express();
const port = 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vue-pwa-6a996-default-rtdb.europe-west1.firebasedatabase.app',
});

const db = admin.firestore();

app.get('/posts', async (req, res) => {
  const posts = [];

  res.set('Access-Control-Allow-Origin', '*');

  const postsRef = db.collection('posts');
  const snapshot = await postsRef.orderBy('date', 'desc').limit(5).get();
  snapshot.forEach((doc) => {
    posts.push(doc.data());
  });
  res.send(posts);
});

app.get('/creatPost', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const fields = {};
  const bb = busboy({ headers: req.headers });

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType,
    );
    file.on('data', (data) => {
      console.log(`File [${name}] got ${data.length} bytes`);
    }).on('close', () => {
      console.log(`File [${name}] done`);
    });
  });

  bb.on('field', (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
    fields[name] = val;
  });

  bb.on('close', () => {
    console.log('fields', fields);
    db.collection('posts').doc().set({
      id: fields.id,
      caption: fields.caption,
      location: fields.location,
      date: parseInt(fields.date, 10),
      imageURL: '',
    });
    console.log('Done parsing form!');
    // res.writeHead(303, { Connection: 'close', Location: '/' });
    res.send('Done send file');
  });

  req.pipe(bb);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
