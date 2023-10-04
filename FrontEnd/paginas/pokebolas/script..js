const pokeFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const renderPokebolas = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/item?offset=0&limit=2030');
    const data = await response.json();
    const pokebolas = data.results;

    const pokebolaContainer = document.querySelector('.pokebolaContainer');

    for (const pokeDados of pokebolas) {
        const response = await pokeFetch(pokeDados.url);
        const pokebola = response;

        if (pokebola.category.name === 'standard-balls' || pokebola.category.name === 'special-balls' || pokebola.category.name === 'apricorn-balls') {
            const bollCard = document.createElement('div');
            bollCard.className = 'card';

            const pokebolaImage = document.createElement('img');
            pokebolaImage.src = pokebola.sprites.default;
            pokebolaImage.style.width = '100px';
            pokebolaImage.style.height = '100px';

            const idPokebolla = document.createElement('div');
            idPokebolla.className = 'id';
            idPokebolla.textContent = '#' + pokebola.id;

            const nameBoll = document.createElement('div');
            nameBoll.className = 'name';
            nameBoll.textContent = pokebola.name.charAt(0).toUpperCase() + pokebola.name.slice(1).toLowerCase();

            bollCard.appendChild(pokebolaImage);
            bollCard.appendChild(idPokebolla);
            bollCard.appendChild(nameBoll);

            pokebolaContainer.appendChild(bollCard);
        }
    }
};

renderPokebolas();
