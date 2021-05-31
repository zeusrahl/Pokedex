let pokemonRepository = (function () {
  let pokemonList = [
    {name: "Bulbasaur", height: 0.7, types: ['grass', 'poison']},
    {name: "Charmander", height: 0.6, types: 'fire'},
    {name: "Houndour", height: 0.6, types: ['dark', 'fire']},
    {name: "Squirtle", height: 0.5, types: 'water'},
    {name: "Caterpie", height: 0.3, types: 'bug'},
    {name: "Weedle", height: 0.3, types: ['bug', 'poison']},
    {name: "Pidgey", height: 0.3, types: ['flying', 'normal']}
  ];

  function getAll() {
    return  pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
  };
}())

pokemonRepository.getAll().forEach(function(pokemon) {
  document.write('<p class="poke-list">' + pokemon.name + ' (height: ' + pokemon.height + ')');
  if (pokemon.height > 0.6) {
    document.write(" - Wow, that's big!");
  }
  document.write("</p>");
});
