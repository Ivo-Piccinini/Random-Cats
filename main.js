const API_RANDOM = 'https://api.thecatapi.com/v1/images/search';
const API_FAVOURITES = 'https://api.thecatapi.com/v1/favourites';
const API_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
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
    const res = await fetch(API_FAVOURITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_4Ty4qaAc0dMSZes835g54DX2wIrQ5lJ1FYRp8lFJI7mtnsfa6kniMhyHZRacacAT',
        },
    });
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else {
        const section = document.getElementById('favoritesCats');
        section.innerHTML = "";

        data.forEach(cat => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('REMOVE');

            img.width = 200;
            img.height = 150;
            img.src = cat.image.url;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteCat(cat.id);
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
            'X-API-KEY': 'live_4Ty4qaAc0dMSZes835g54DX2wIrQ5lJ1FYRp8lFJI7mtnsfa6kniMhyHZRacacAT',
        },
        body: JSON.stringify({
            image_id: id
        }),
    })
    const data = await res.json();

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log('The cat has been saved successfully');
        loadRandomCats();
    }
}

async function deleteFavouriteCat(id) {
    const res = await fetch(API_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_4Ty4qaAc0dMSZes835g54DX2wIrQ5lJ1FYRp8lFJI7mtnsfa6kniMhyHZRacacAT',
        }
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = 'An error has been detected: ' + res.status + data.message;
    } else {
        console.log('The cat has been deleted successfully');
        loadFavouritesCats();
    }
}

loadRandomCats();
loadFavouritesCats();
