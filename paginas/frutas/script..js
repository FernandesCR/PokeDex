const pokeFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const renderBerrys = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/item?offset=0&limit=2030');
    const data = await response.json();
    const berrys = data.results;

    const berryConteiner = document.querySelector('.berryConteiner');

    for (const berryDados of berrys) {
        const response = await pokeFetch(berryDados.url);
        const berry = response;

        if (berry.category.name === 'medicine' || berry.category.name === 'baking-only' || berry.category.name === 'effort-drop'|| berry.category.name === 'other' || berry.category.name === 'effort-drop'|| berry.category.name === 'picky-healing'|| berry.category.name === 'type-protection') {
            const berryCard = document.createElement('div');
            berryCard.className = 'card';

            const berryimage = document.createElement('img');
            berryimage.src = berry.sprites.default;
            berryimage.style.width = '100px';
            berryimage.style.height = '100px';

            const idBerry = document.createElement('div');
            idBerry.className = 'id';
            idBerry.textContent = '#' + berry.id;

            const nameBarry = document.createElement('div');
            nameBarry.className = 'name';
            nameBarry.textContent = berry.name.charAt(0).toUpperCase() + berry.name.slice(1).toLowerCase();

            berryCard.appendChild(berryimage);
            berryCard.appendChild(idBerry);
            berryCard.appendChild(nameBarry);

            berryConteiner.appendChild(berryCard);
        }
    }
};

renderBerrys();
