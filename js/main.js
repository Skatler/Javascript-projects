const form = document.querySelector('form');
const output = document.querySelector('#output');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  fetch('/convert', {
    method: 'POST',
    body: formData
  })
    .then(response => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const img = document.createElement('img');
      img.src = url;
      output.appendChild(img);
    })
    .catch((error) => {
      console.error(error);
    });
});
