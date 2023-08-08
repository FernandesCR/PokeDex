const pokemonName = document.querySelector('pokemonName');
const pokemonNumber = document.querySelector('pokemonNumber');

const pokemonFetch = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await APIResponse.json();
  return data;
}

const renderPokemon = async (pokemon) => {

  const data = await pokemonFetch(pokemon);

  pokemonName.innerHTML = data.name;

}
