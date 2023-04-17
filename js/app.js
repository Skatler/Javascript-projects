const express = require('express');
const sharp = require('sharp');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/convert', (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send('No image uploaded');
  }

  const image = req.files.image;

  sharp(image.data)
    .webp()
    .toBuffer()
    .then((outputBuffer) => {
      res.writeHead(200, {
        'Content-Type': 'image/webp',
        'Content-Length': outputBuffer.length
      });
      res.end(outputBuffer);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error converting image');
    });
});

app.get('/', (_req, res) => {
  const indexPath = path.resolve(__dirname, 'public', 'index.html');
  res.sendFile(indexPath);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


