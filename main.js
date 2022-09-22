const API_RANDOM = 'https://api.thecatapi.com/v1/images/search';
const API_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_4Ty4qaAc0dMSZes835g54DX2wIrQ5lJ1FYRp8lFJI7mtnsfa6kniMhyHZRacacAT';
const spanError = document.getElementById('error');

async function loadRandomCats() {
    const res = await fetch(API_RANDOM);
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        const img = document.getElementById('rc');
        const btnFav = document.getElementById('btnFav');

        img.src = data[0].url;

        btnFav.onclick = () => saveFavouriteCat(data[0].id);
    }
}

async function loadFavouritesCats() {
    const res = await fetch(API_FAVOURITES);
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else {
        data.forEach(cat => {
            const section = document.getElementById('favoritesCats');
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('REMOVE');

            img.width = 200;
            img.height = 150;
            img.src = cat.image.url;
            btn.appendChild(btnText);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);

            article.classList.add('img-fav-container');
            img.classList.add('img-fav');
            btn.classList.add('btn-remove');
        })
    }
}

async function saveFavouriteCat(id) {
    const res = await fetch(API_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    })
    const data = await res.json();

    console.log(res);

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }
}

loadRandomCats();
saveFavouriteCat();
loadFavouritesCats();
