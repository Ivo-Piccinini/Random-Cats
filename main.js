const API_RANDOM = 'https://api.thecatapi.com/v1/images/search';
const API_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_4Ty4qaAc0dMSZes835g54DX2wIrQ5lJ1FYRp8lFJI7mtnsfa6kniMhyHZRacacAT';
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

async function saveFavouriteCats() {
    const res = await fetch(API_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: '6g2'
        }),
    })
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }
}

loadRandomCats();
loadFavouritesCats();
saveFavouriteCats();