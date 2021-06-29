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
    let pokemonList = $('.list-group');
    //creating a list item
    let listItem = $('<li class="list-group-item list-group-item-acition"></li>');
    //create a 'button' item.
    let button = $('<button class="btn btn-outline-warning btn-lg btn-block" data-target="#pokemonModal" data-toggle="modal" style="color:#003A70">' + pokemon.name + '</button>');
    //adding each button to the <li>
    listItem.append(button);
    //adding each <li> to the <ul>
    pokemonList.append(listItem);
    //Upon clicking the 'button', the console log should show the details of the pokemon. Calls the 'showDetail' function below.
    button.on('click', function() {
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
    // Stuck here. Would like some help transitioning to jQuery.
  //   $.ajax(apiUrl, {dataType: 'json' }).then(function(responseJSON) {
  //     hideLoadingMessage();
  //     responseJSON.each(function (i) {
            // let pokemon = {
            //   name: $(this).attr('name');
            //   datailsUrl: $(this).attr('url');
          // }
        // }) {
  //       let pokemon = {
  //         name: item.name,
  //         detailsUrl: item.url,
  //       };
  //       add(pokemon);
  //     });
  //   }).catch(function (e) {
  //     hideLoadingMessage();
  //     console.error(e);
  //   });
  // };
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
        p.types.push(details.types[i].type.name);
      }
      p.abilities = [];
      for (var i=0; i < details.abilities.length; i++) {
        p.abilities.push(details.abilities[i].ability.name);
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
        pokemon.detailsUrl = url - '1';
        alert('You have reached the beginning of the list');
      } else {
        pokemon.detailsUrl = url + pokemonID;
      }
    showDetails(pokemon);
  }

  function showLoadingMessage() {
    $(".loading-message").html = "Loading Pokémon";
  }

  function hideLoadingMessage() {
    $(".loading-message").html = "";
  }

  // let modalContainer = document.querySelector('#pokemonModal');

  function showModal(pokemon) {
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
