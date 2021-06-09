//building of the IIFE of the pokemonRepository
let pokemonRepository = (function () {
  //the list of all the pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';

  //a call for all pokemon in the list
  function getAll() {
    return  pokemonList;
  }

  //a function to add pokemon. Need to add varification that the pokemon meets requirements of name, height, and type.
  function add(pokemon) {
    if ((typeof pokemon === "object") && Object.keys(pokemon).includes('name', 'detailsUrl')) {
      pokemonList.push(pokemon);
    }
    else {
      alert("This does not have the right information. Please try again.");
    }
  }

  function addListItem(pokemon) {
    //calling the '.pokemon-list' class for the <ul> element.
    let pokemonList = document.querySelector('.pokemon-list');
    //creating a list item
    let listItem = document.createElement('li');
    //create a 'button' item.
    let button = document.createElement('button');
    //as the function cycles, the name will be displayed
    button.innerText = pokemon.name;
    //each button will have the class: .button-class, using the css formatting.
    button.classList.add('button-class');
    //adding each button to the <li>
    listItem.appendChild(button);
    //adding each <li> to the <ul>
    pokemonList.appendChild(listItem);
    //Upon clicking the 'button', the console log should show the details of the pokemon. Calls the 'showDetail' function below.
    button.addEventListener('click', function() {
      // preventDefault(event);
      showDetails(pokemon);
    });
  }

  //showing the details of the pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
    console.log("Name: " + pokemon.name + ", height: " + pokemon.height + ", types: " + pokemon.types);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  };

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  };

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
}())

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  //A loop to list all known pokemon in the IIFE list
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
    // document.write('<p class="poke-list">' + pokemon.name + ' (height: ' + pokemon.height + ')');
    // if (pokemon.height > 0.6) {
    //   document.write(" - Wow, that's big!");
    // }
    // document.write("</p>");
  });
})
