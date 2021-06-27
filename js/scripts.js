//building of the IIFE of the pokemonRepository
let pokemonRepository = (function () {
  //the list of all the pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';
  let searchInput = document.querySelector("#searchIn");

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
    listItem.classList.add('list-group-item', 'list-group-item-action');
    //create a 'button' item.
    let button = document.createElement('button');
    //as the function cycles, the name will be displayed
    button.innerText = pokemon.name;
    //each button will have the class: .button-class, using the css formatting.
    button.classList.add('btn', 'btn-outline-warning', 'btn-lg', 'btn-block');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('style', 'color: #003A70');
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
      showModal(pokemon);
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
      // Now we add the details to the item
      hideLoadingMessage();
      item.name = details.name;
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      for (var i=0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name);
      }
      item.abilities = [];
      for (var i=0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
      }
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
        pokemon.detailsUrl = url - '1';
        alert('You have reached the beginning of the list');
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
    loadDetails(pokemon).then(function() {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");
      let modalHeader = $(".modal-header");
      let modalFooter = $(".modal-footer")

      //clear all modal content
      modalBody.empty();
      modalTitle.empty();
      modalFooter.empty();

      //Pokemon name
      let nameElement = $('<h1>' + pokemon.name + '</h1>');


      //pokemon types
      let pokTypes = $('<p>' + 'Types: ' + pokemon.types + '</p>');

      // pokemon abilities
      let pokAbilities = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

      //pokemon height
      let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

      //pokemon weight
      let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

      //pokemon image front
      let pokImageFront = $('<img class="modal-img" alt="\'Front of \' + pokemon.name + \'.\'" style="width:50%">');
      pokImageFront.attr('src', pokemon.imageUrlFront);

      //pokemon image back
      let pokImageBack = $('<img class="modal-img" alt="\'Back of \' + pokemon.name + \'.\'" style="width:50%">');
      pokImageBack.attr('src', pokemon.imageUrlBack);

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
      modalTitle.append(nameElement);
      modalBody.append(pokTypes);
      modalBody.append(pokAbilities);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(pokImageFront);
      modalBody.append(pokImageBack);
      modalFooter.append(prevBtn);
      modalFooter.append(nextBtn);

      $('#pokemonModal').modal('toggle');
    })
  }

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
