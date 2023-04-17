const express = require('express');
const sharp = require('sharp');
const path = require('path');
const multer = require('multer');

const app = express();
const upload = multer();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/convert', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded');
  }

  const image = req.file;
  const quality = req.body.quality || 100;

  sharp(image.buffer)
    .webp({ quality: parseInt(quality) })
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


