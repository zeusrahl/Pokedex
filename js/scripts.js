//building of the IIFE of the pokemonRepository
let pokemonRepository = (function () {
  //the list of all the pokemon
  let pokemonList = [
    {name: "Bulbasaur", height: 0.7, types: ['grass', 'poison']},
    {name: "Charmander", height: 0.6, types: 'fire'},
    {name: "Houndour", height: 0.6, types: ['dark', 'fire']},
    {name: "Squirtle", height: 0.5, types: 'water'},
    {name: "Caterpie", height: 0.3, types: 'bug'},
    {name: "Weedle", height: 0.3, types: ['bug', 'poison']},
    {name: "Pidgey", height: 0.3, types: ['flying', 'normal']}
  ];

  //a call for all pokemon in the list
  function getAll() {
    return  pokemonList;
  }

  //a function to add pokemon. Need to add varification that the pokemon meets requirements of name, height, and type.
  function add(pokemon) {
    if ((typeof pokemon === "object") && Object.keys(pokemon).includes('name', 'height', 'types')) {
      pokemonList.push(pokemon);
    }
    else {
      alert("This does not have the right information. Please try again.");
    }
  }

  return {
    add: add,
    getAll: getAll,
  };
}())

//A loop to list all known pokemon in the IIFE list
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write('<p class="poke-list">' + pokemon.name + ' (height: ' + pokemon.height + ')');
  if (pokemon.height > 0.6) {
    document.write(" - Wow, that's big!");
  }
  document.write("</p>");
});
