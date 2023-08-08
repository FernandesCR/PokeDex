const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');
const form = document.querySelector('.form');
const input = document.querySelector('.search');

const colors = {
  fire: '#e9000',
  grass: '#0fe61d',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};

const pokemonFetch = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const dados = await APIResponse.json();
  return dados;
};

const renderPokemon = async (pokemon) => {
  const cor = document.getElementById('cor2');
  const dados = await pokemonFetch(pokemon);

  if (dados) {
    const pokemonTipos = dados.types.map(type => type.type.name);
    for (const type of pokemonTipos) {
      if (colors[type]) {
        cor.style.backgroundColor = colors[type];
        break;
      }
    }

    pokemonImage.src = dados.sprites.other['official-artwork'].front_default;
    pokemonName.innerHTML = dados.name;
    pokemonNumber.innerHTML = dados.id;
  } else {
    pokemonName.innerHTML = 'Pokemon não encontrado :c ';
    pokemonNumber.innerHTML = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});
