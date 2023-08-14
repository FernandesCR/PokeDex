const typeImagesNameContainer = document.querySelector('.typeImagesName')
const typeImagesContainer = document.querySelector('.typeImages');
const pokemonNumber = document.querySelectorAll('.pokemonNumber');
const pokemonName = document.querySelectorAll('.pokemonName');
const pokemonImage = document.querySelector('.pokemonImage');
const btnShiny = document.getElementById('btnShiny');
const btnNormal = document.getElementById('btnNormal');
const input = document.querySelector('.search');
const form = document.querySelector('.form');

const colors = {
  grass: '#63BB5B',
  fire: '#FF9C54',
  electric: '#ffd500',
  water: '#4D90D5',
  ground: '#ffc388',
  rock: '#C7B78B',
  fairy: '#EC8FE6',
  poison: '#AB6AC8',
  bug: '#90C12C',
  dragon: '#7766EE',
  psychic: '#F97176',
  flying: '#92AADE',
  fighting: '#CE4069',
  normal: '#969ea5',
  ghost: '#5269AC',
  steel: '#5A8EA1',
  dark: '#5A5366',
  ice: '#74CEC0',
};

let dadosAtualSave = null;

const pokemonFetch = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const dados = await APIResponse.json();
  return dados;
};

const renderPokemon = async (pokemon) => {
  const dados = await pokemonFetch(pokemon);
  const cor2 = document.getElementById('cor2');
  const cor = document.getElementById('cor');
  const container = document.getElementById('container');

  if (dados) {
    const pokemonTipos = dados.types.map(type => type.type.name);
    for (const type of pokemonTipos) {
      if (colors[type]) {
        container.style.border = `2px solid ${colors[type]}`;
        cor.style.border = `2px solid ${colors[type]}`;
        cor2.style.backgroundColor = colors[type];
        break;
      }
    }

    dadosAtualSave = dados;

    pokemonImage.src = dados.sprites.other['official-artwork'].front_default;

    pokemonName.forEach(name => {
      name.textContent = dados.name.charAt(0).toUpperCase() + dados.name.slice(1).toLowerCase();
    });
    pokemonNumber.forEach(id => {
      id.textContent = '' + dados.id;
    });
    renderTypeImages(pokemonTipos);
    renderTypeImagesNames(pokemonTipos);
    renderTypeOrTypes(pokemonTipos);
  }

  const renderShiny = () => {
    if (dadosAtualSave) {
      pokemonImage.src = dadosAtualSave.sprites.other['official-artwork'].front_shiny;
    }
  };

  btnShiny.addEventListener('click', () => {
    renderShiny();
  });

  const renderNormal = () => {
    if (dadosAtualSave)
      pokemonImage.src = dados.sprites.other['official-artwork'].front_default;
  };
  btnNormal.addEventListener('click', () => {
    renderNormal();
  });
};


const renderTypeOrTypes = (pokemonTipos) => {
  const tipoName = document.getElementById('tipos');

  if (pokemonTipos.length === 1) {
    tipoName.innerHTML = 'Tipo';
  } else if (pokemonTipos.length > 1) {
    tipoName.innerHTML = 'Tipos';
  }
};

const pokemonListRender = async () => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
  const dados = await APIResponse.json();
  return dados.results;
};

const renderPokemonList = async () => {
  const pokemonList = await pokemonListRender();
  const list = document.getElementById('pokemonList');

  for (const pokemon of pokemonList) {
    const createListItem = document.createElement('li');
    const createListImage = document.createElement('img');
    const createListName = document.createElement('span');

    createListName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();
    createListName.classList.add('pokemon-name');
    createListImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.url.split('/')[6]}.gif`;
    createListImage.classList.add('pokemon-image');


    createListItem.addEventListener('click', () => {
      renderPokemon(pokemon.name);
    });

    createListItem.appendChild(createListImage);
    createListItem.appendChild(createListName);
    createListItem.classList.add('pokemon-list-item');
    list.appendChild(createListItem);
  }
};


renderPokemonList();


const renderTypeImages = (types) => {
  typeImagesContainer.innerHTML = '';

  types.forEach(type => {
    const typeImage = document.createElement('img');
    typeImage.src = `imagens/tipos/Pokemon_Type_Icon_${type}.png`;
    typeImage.style.width = '60px';
    typeImage.style.height = '60px';
    typeImage.style.marginRight = '30px';
    typeImagesContainer.appendChild(typeImage);
  });
};

const renderTypeImagesNames = (type) => {
  typeImagesNameContainer.innerHTML = '';

  type.forEach(type => {
    const typeImageName = document.createElement('img');
    typeImageName.src = `imagens/tipos-nomes/${type}_en.png`
    typeImageName.style.width = '40%';
    typeImageName.style.height = '40%';
    typeImageName.style.marginRight = '10px';
    typeImagesNameContainer.appendChild(typeImageName);
  });
}

renderPokemon('1')

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
  input.value = '';
});