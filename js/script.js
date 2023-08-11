const typeImagesNameContainer = document.querySelector('.typeImagesName')
const typeImagesContainer = document.querySelector('.typeImages');
const pokemonNumber = document.querySelectorAll('.pokemonNumber');
const pokemonName = document.querySelectorAll('.pokemonName');
const pokemonImage = document.querySelector('.pokemonImage');
const btnShiny = document.getElementById('btnShiny');
const input = document.querySelector('.search');
const form = document.querySelector('.form');

const colors = {
  grass: '#0fe61d',
  fire: '#ff0000',
  electric: '#ffd500',
  water: '#13b3fd',
  ground: '#ffc388',
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

let dadosAtualSave = null;

const pokemonFetch = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const dados = await APIResponse.json();
  return dados;
};

const renderPokemon = async (pokemon) => {
  const dados = await pokemonFetch(pokemon);
  const cor = document.getElementById('cor2');

  if (dados) {
    const pokemonTipos = dados.types.map(type => type.type.name);
    for (const type of pokemonTipos) {
      if (colors[type]) {
        cor.style.backgroundColor = colors[type];
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

  } else {
    pokemonName.innerHTML = 'Pokemon não encontrado :c ';
    pokemonNumber.innerHTML = ''; 
  }

  const renderShiny = () => {
    if (dadosAtualSave) {
      pokemonImage.src = dadosAtualSave.sprites.other['official-artwork'].front_shiny;
    }
  };
  
  btnShiny.addEventListener('click', () => {
    renderShiny();
  });

};

const renderTypeOrTypes = (pokemonTipos) => {
  const tipoName = document.getElementById('tipos');

  if (pokemonTipos.length === 1) {
    tipoName.innerHTML = 'Type';
  } else if (pokemonTipos.length > 1) {
    tipoName.innerHTML = 'Types';
  }
};

const renderTypeImages = (types) => {
  typeImagesContainer.innerHTML = '';

  types.forEach(type => {
    const typeImage = document.createElement('img');
    typeImage.src = `imagens/tipos/Pokemon_Type_Icon_${type}.png`;
    typeImage.style.width = '50px';
    typeImage.style.height = '50px';
    typeImage.style.marginRight = '10px';
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