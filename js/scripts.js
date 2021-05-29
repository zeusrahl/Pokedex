let pokemonList = [
  {name: "Bulbasaur", height: 7, types: ['grass', 'poison']},
  {name: "Charmander", height: 6, types: 'fire'},
  {name: "Houndour", height: 6, types: ['dark', 'fire']},
  {name: "Squirtle", height: 5, types: 'water'},
  {name: "Caterpie", height: 3, types: 'bug'},
  {name: "Weedle", height: 3, types: ['bug', 'poison']},
  {name: "Pidgey", height: 3, types: ['flying', 'normal']}
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write('<p class="poke-list">' + pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
  if (pokemonList[i].height > 6) {
    document.write(" - Wow, that's big!");
  }
  document.write("</p>");
} //for loop to list name and height of pokemonList
