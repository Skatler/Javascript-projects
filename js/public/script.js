const form = document.querySelector('form');
const output = document.querySelector('#output');
const qualityInput = document.querySelector('#quality');
const qualityValue = document.querySelector('#quality-value');

qualityInput.addEventListener('input', () => {
  qualityValue.textContent = qualityInput.value + '%';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  formData.append('quality', qualityInput.value);
  fetch('/convert', {
    method: 'POST',
    body: formData
  })
    .then(response => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    })
    .catch((error) => {
      console.error(error);
    });
});