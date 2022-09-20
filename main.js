const API = 'https://api.thecatapi.com/v1/images/search';

async function reload() {
    const res = await fetch(API);
    const data = await res.json();

    const img = document.getElementById('rc')
    img.src = data[0].url;
}

reload();