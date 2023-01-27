const express = require('express');
const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');
const busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const UUID = require('uuid-v4');

const serviceAccount = require('./serviceAccountKey.json');

const app = express();
const port = 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'vue-pwa-6a996.appspot.com',
});

const db = admin.firestore();
const bucket = getStorage().bucket();

app.get('/posts', async (req, res) => {
  const posts = [];

  res.set('Access-Control-Allow-Origin', '*');

  const postsRef = db.collection('posts');
  const snapshot = await postsRef.orderBy('date', 'desc').limit(5).get();
  snapshot.forEach((doc) => {
    console.log(doc.id);
    posts.push({ ...doc.data(), id: doc.id });
  });
  // posts.push(doc.data());
  res.send(posts);
});

app.post('/creatPost', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const uuid = UUID();
  const fields = {};
  const bb = busboy({ headers: req.headers });
  let fileData = {};

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType,
    );
    const filepath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filepath));
    fileData = { filepath, mimeType };
  });

  bb.on('field', (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
    fields[name] = val;
  });

  bb.on('close', () => {
    console.log('close', fileData.filepath);

    function createDocument(uploadedFile) {
      db.collection('posts').doc().set({
        // id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date, 10),
        imageURL: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
      }).then(() => res.send('Post added:'));
    }

    bucket.upload(
      fileData.filepath,
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid,
          },
        },
      },
      (err, uploadedFile) => {
        if (!err) {
          createDocument(uploadedFile);
        } else {
          console.log('uploadFile Error', err);
        }
      },
    );
  });

  req.pipe(bb);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
