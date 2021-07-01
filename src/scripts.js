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
    if (typeof pokemon === "object" && Object.keys(pokemon).includes('name', 'detailsUrl')) {
      pokemonList.push(pokemon);
    }
    else {
      alert("This does not have the right information. Please try again.");
    }
  }

  function addListItem(pokemon) {
    //calling the '.pokemon-list' class for the <ul> element.
    let pokemonList = document.querySelector('.list-group');
    //creating a list item
    let listItem = document.createElement('li');
    listItem.classList.add("list-group-item", "list-group-item-acition");
    //create a 'button' item.
    let button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-warning', 'btn-lg', 'btn-block');
    button.setAttribute('data-target','#pokemonModal');
    button.setAttribute('data-toggle','modal');
    button.setAttribute('color','#003A70');
    button.innerText = pokemon.name;
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
    loadDetails(pokemon).then(function (p) {
      showModal(p);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  };

  function loadDetails(item) {
    let url = item.detailsUrl;
    showLoadingMessage();
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      const p = { ... item };
      // Now we add the details to the item
      hideLoadingMessage();
      p.name = details.name;
      p.imageUrlFront = details.sprites.front_default;
      p.imageUrlBack = details.sprites.back_default;
      p.height = details.height;
      p.weight = details.weight;
      p.types = [];
      for (var i=0; i < details.types.length; i++) {
        p.types.push(' ' + details.types[i].type.name);
      }
      p.abilities = [];
      for (var i=0; i < details.abilities.length; i++) {
        p.abilities.push(' ' + details.abilities[i].ability.name);
      }

      return p;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  };

  function showNextPokemon(pokemon) {
    const url = pokemon.detailsUrl.slice(0, 34);
    const pokemonID =
      parseInt(pokemon.detailsUrl.split("pokemon/")[1].split("/")[0]) + 1;
    if (pokemonID == 899) {
      pokemon.detailsUrl = url + '10001';
      } else if (pokemonID > 10220) {
        pokemon.detailsUrl = url + '10220';
        alert('You have reached the end of the list');

      } else {
        pokemon.detailsUrl = url + pokemonID;
      }
    showDetails(pokemon);
  }

  function showPrevPokemon(pokemon) {
    const url = pokemon.detailsUrl.slice(0, 34);
    const pokemonID =
      parseInt(pokemon.detailsUrl.split("pokemon/")[1].split("/")[0]) - 1;
    if (pokemonID == 10000) {
      pokemon.detailsUrl = url + '898';
      } else if (pokemonID < 1) {
        pokemon.detailsUrl = url + '1';
        alert('You have reached the beginning of the list');
        console.log(pokemon.detailsUrl);
      } else {
        pokemon.detailsUrl = url + pokemonID;
      }
    showDetails(pokemon);
  }

  function showLoadingMessage() {
    document.querySelector(".loading-message").innerHTML = "Loading Pokémon";
  }

  function hideLoadingMessage() {
    document.querySelector(".loading-message").innerHTML = "";
  }

  // let modalContainer = document.querySelector('#pokemonModal');

  function showModal(pokemon) {
    let modalBody = document.querySelector(".modal-body");
    let modalTitle = document.querySelector(".modal-title");
    let modalHeader = document.querySelector(".modal-header");
    let modalFooter = document.querySelector(".modal-footer")

    //clear all modal content
    modalBody.innerHTML = '';
    modalTitle.innerHTML = '';
    modalFooter.innerHTML = '';


    //pokemon types
    let pokTypes = document.createElement('p');
    pokTypes.innerText = "Types: " + pokemon.types;

    // pokemon abilities
    let pokAbilities = document.createElement('p');
    pokAbilities.innerText = "Abilities: " + pokemon.abilities;

    //pokemon height
    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    //pokemon weight
    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + pokemon.weight;

    //pokemon image front
    let pokImageFront = document.createElement('img');
    pokImageFront.classList.add("modal-img");
    pokImageFront.setAttribute("alt", "\'Front of \' + pokemon.name = \'.\'");
    pokImageFront.setAttribute("style", "width:50%");
    pokImageFront.setAttribute('src', pokemon.imageUrlFront);

    //pokemon image back
    let pokImageBack = document.createElement('img');
    pokImageBack.classList.add("modal-img");
    pokImageBack.setAttribute("alt", "\'Front of \' + pokemon.name = \'.\'");
    pokImageBack.setAttribute("style", "width:50%");
    pokImageBack.setAttribute('src', pokemon.imageUrlBack);

    let nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    nextBtn.addEventListener("click", function() {
      // preventDefault(event);
      showNextPokemon(pokemon);
    });

    let prevBtn = document.createElement('button');
    prevBtn.innerText = 'Previous';
    prevBtn.addEventListener("click", function() {
    // preventDefault(event);
      showPrevPokemon(pokemon);
    })
    //append all elements created to the modal
    modalTitle.innerText = pokemon.name;
    modalBody.appendChild(pokTypes);
    modalBody.appendChild(pokAbilities);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(pokImageFront);
    modalBody.appendChild(pokImageBack);
    modalFooter.appendChild(prevBtn);
    modalFooter.appendChild(nextBtn);

    // $('#pokemonModal').modal('toggle');
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
}())

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  //A loop to list all known pokemon in the IIFE list
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
})

let searchInput = document.querySelector("#searchIn");
//add event listener to search bar to find pokemon in the ist
searchInput.addEventListener('input', function(){
  let listPokemon = document.querySelectorAll('.list-group-item');
  let value = searchInput.value.toUpperCase();
  listPokemon.forEach(function(pokemon){
    if(pokemon.innerText.toUpperCase().indexOf(value) > -1){
      pokemon.style.display = '';
    }else{
      pokemon.style.display = 'none';
    }
  })
});
