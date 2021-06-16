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
    // loadDetails(pokemon).then(showModal(pokemon, 'Name: ' + pokemon.name + ', height: ' + pokemon.height + ', types: ' + pokemon.types)
    loadDetails(pokemon).then(function () {
      // text = "height: " + pokemon.height;
      // img = pokemon.imageUrl;
      showModal(pokemon);
    });

    // console.log(
    //   "Name: " +
    //     pokemon.name +
    //       ", height: " +
    //         pokemon.height +
    //           ", types: " +
    //             pokemon.types
    // );
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
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
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
      } else {
        pokemon.detailsUrl = url + pokemonID;
      }
    showDetails(pokemon);
  }

  function hideLoadingMessage() {
    document.querySelector(".loading-message").innerHTML = "";
  }

  let modalContainer = document.querySelector('#modal-container');
  function showModal(pokemon) {
    // Clear all existing modal content
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    // Add closing modal with the "close" button
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = "height: " + pokemon.height;

    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;

    let footerElement = document.createElement('footer');

    let nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    nextBtn.addEventListener("click", function() {
      // preventDefault(event);
      showNextPokemon(pokemon);
    });

    let prevBtn = document.createElement('button');
    prevBtn.innerText = 'Previous';

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement);
    modal.appendChild(footerElement);
    footerElement.appendChild(prevBtn);
    footerElement.appendChild(nextBtn);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  let dialogPromiseReject; // This can be set later, by showDialog

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  function showDialog(title, text) {
    showModal(title, text);

    // we want to add a confirm and cancel buttom to the modal
    let modal = modalContainer.querySelector('.modal');

    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    //we want to focus the confirmButton so that the use can simply press Enter
    confirmButton.focus();
    return new Promise((resolve,reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; // Reset this
        hideModal();
        resolve();
      });
       // This can be used to reject from other functions
      dialogPromiseReject = reject;
    });
  }

  // document.querySelector('#show-dialog').addEventListener('click', () => {
  //   showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
  //     alert('confirmed!');
  //   }, () => {
  //     alert('not confirmed');
  //   });
  // });

    // Close the modal with the ESC button
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    })
    // Close by clicking outside window
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

  // document.querySelector('#show-modal').addEventListener('click', () => {
  //   showModal('Modal title', 'This is the modal content!');
  // });

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
