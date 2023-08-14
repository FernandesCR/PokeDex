const pokemonImage = document.querySelector('.pokemonImage');
const namePokemon = document.querySelector('.namePokemon')
const typePokemon = document.querySelector('.typePokemon')
const idPokemon = document.querySelector('.idPokemon')

const pokemonFetch = async (pokemonType) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);
    const dados = await APIResponse.json();
    return dados.pokemon.map(poke => poke.pokemon.name);
};

const renderPokemon = async (pokemonType) => {
    const pokemonNames = await pokemonFetch(pokemonType);

    const pokeCardContainer = document.getElementById('pokeCardContainer');

    for (const name of pokemonNames) {
        const pokemonInfoResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonInfo = await pokemonInfoResponse.json();

        const pokeCard = document.createElement('div');
        pokeCard.className = 'pokeCard';

        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemonInfo.sprites.other['official-artwork'].front_default;
        pokemonImage.style.width = '100px';
        pokemonImage.style.height = '100px';

        const idPokemon = document.createElement('div');
        idPokemon.className = 'idPokemon';
        idPokemon.textContent = pokemonInfo.id;

        const namePokemon = document.createElement('div');
        namePokemon.className = 'namePokemon';
        namePokemon.textContent = pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1).toLowerCase();
        
        pokeCard.appendChild(pokemonImage);
        pokeCard.appendChild(idPokemon);
        pokeCard.appendChild(namePokemon);
        
        pokeCardContainer.appendChild(pokeCard);
        
    }
};

renderPokemon('normal');

