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
