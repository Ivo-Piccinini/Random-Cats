const API_RANDOM = 'https://api.thecatapi.com/v1/images/search';
const API_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_8iHi4RiIYufiGDZUcnDWfBuMYZOEXx827XVLDBik7aaasyqsDBw4Sn8HxKgzQDPM';
const spanError = document.getElementById('error');

async function loadRandomCats() {
    const res = await fetch(API_RANDOM);
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        const img = document.getElementById('rc')
        img.src = data[0].url;
    }
}

async function loadFavouritesCats() {
    const res = await fetch(API_FAVOURITES);
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }
}

loadRandomCats();
loadFavouritesCats();