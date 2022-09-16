const API = 'https://api.thecatapi.com/v1/images/search';

fetch(API)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img')
        img.src = data[0].url;
    });
