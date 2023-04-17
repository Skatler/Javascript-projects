const express = require('express'); // импортируем Express, фреймворк для создания сервера
const sharp = require('sharp'); // импортируем библиотеку Sharp для обработки изображений
const path = require('path'); // импортируем модуль path для работы с путями файловой системы
const multer = require('multer'); // импортируем библиотеку multer для обработки файлов, отправленных в форме
const app = express(); // создаем новый сервер
const upload = multer(); // создаем экземпляр multer

app.use(express.static(path.join(__dirname, 'public'))); // указываем Express использовать папку public как статическую

// создаем маршрут для обработки POST-запросов на /convert, используя multer для обработки изображений, отправленных в форме
app.post('/convert', upload.single('image'), (req, res) => {
  if (!req.file) { // если файл не был загружен, отправляем клиенту ошибку 400
    return res.status(400).send('No image uploaded');
  }

  const image = req.file; // получаем объект файла из запроса

  // используем Sharp для преобразования изображения в формат WebP и отправки его обратно клиенту
  sharp(image.buffer)
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

// создаем маршрут для обработки GET-запросов на корневой URL и отправки HTML-страницы клиенту
app.get('/', (_req, res) => {
  const indexPath = path.resolve(__dirname, 'public', 'index.html');
  res.sendFile(indexPath);
});

// запускаем сервер на порту 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
