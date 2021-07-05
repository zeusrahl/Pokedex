let pokemonRepository = (function() {
  let e = [],
    t = "https://pokeapi.co/api/v2/pokemon/?limit=1118";
  function n(t) {
    "object" == typeof t && Object.keys(t).includes("name", "detailsUrl")
      ? e.push(t)
      : alert("This does not have the right information. Please try again.");
  }
  function i(e) {
    l(e).then(function(e) {
      !(function(e) {
        let t = document.querySelector(".modal-body"),
          n = document.querySelector(".modal-title"),
          l = document.querySelector(".modal-footer");
        (t.innerHTML = ""), (n.innerHTML = ""), (l.innerHTML = "");
        let o = document.createElement("p");
        o.innerText = "Types: " + e.types;
        let r = document.createElement("p");
        r.innerText = "Abilities: " + e.abilities;
        let a = document.createElement("p");
        a.innerText = "Height: " + e.height;
        let s = document.createElement("p");
        s.innerText = "Weight: " + e.weight;
        let c = document.createElement("img");
        c.classList.add("modal-img"),
          c.setAttribute("alt", "Front of " + e.name + "."),
          c.setAttribute("style", "width:50%"),
          c.setAttribute("src", e.imageUrlFront);
        let d = document.createElement("img");
        d.classList.add("modal-img"),
          d.setAttribute("alt", "Front of " + e.name + "."),
          d.setAttribute("style", "width:50%"),
          d.setAttribute("src", e.imageUrlBack);
        let u = document.createElement("button");
        (u.innerText = "Next"),
          u.addEventListener("click", function() {
            !(function(e) {
              const t = e.detailsUrl.slice(0, 34),
                n =
                  parseInt(e.detailsUrl.split("pokemon/")[1].split("/")[0]) + 1;
              899 == n
                ? (e.detailsUrl = t + "10001")
                : n > 10220
                ? ((e.detailsUrl = t + "10220"),
                  alert("You have reached the end of the list"))
                : (e.detailsUrl = t + n);
              i(e);
            })(e);
          });
        let p = document.createElement("button");
        (p.innerText = "Previous"),
          p.addEventListener("click", function() {
            !(function(e) {
              const t = e.detailsUrl.slice(0, 34),
                n =
                  parseInt(e.detailsUrl.split("pokemon/")[1].split("/")[0]) - 1;
              1e4 == n
                ? (e.detailsUrl = t + "898")
                : n < 1
                ? ((e.detailsUrl = t + "1"),
                  alert("You have reached the beginning of the list"),
                  console.log(e.detailsUrl))
                : (e.detailsUrl = t + n);
              i(e);
            })(e);
          }),
          (n.innerText = e.name),
          t.appendChild(o),
          t.appendChild(r),
          t.appendChild(a),
          t.appendChild(s),
          t.appendChild(c),
          t.appendChild(d),
          l.appendChild(p),
          l.appendChild(u);
      })(e);
    });
  }
  function l(e) {
    let t = e.detailsUrl;
    return (
      o(),
      fetch(t)
        .then(function(e) {
          return e.json();
        })
        .then(function(t) {
          const n = { ...e };
          r(),
            (n.name = t.name),
            (n.imageUrlFront = t.sprites.front_default),
            (n.imageUrlBack = t.sprites.back_default),
            (n.height = t.height),
            (n.weight = t.weight),
            (n.types = []);
          for (let e = 0; e < t.types.length; e++)
            n.types.push(" " + t.types[e].type.name);
          n.abilities = [];
          for (let e = 0; e < t.abilities.length; e++)
            n.abilities.push(" " + t.abilities[e].ability.name);
          return n;
        })
        .catch(function(e) {
          r(), console.error(e);
        })
    );
  }
  function o() {
    document.querySelector(".loading-message").innerHTML = "Loading Pokémon";
  }
  function r() {
    document.querySelector(".loading-message").innerHTML = "";
  }
  return {
    add: n,
    getAll: function() {
      return e;
    },
    addListItem: function(e) {
      let t = document.querySelector(".list-group"),
        n = document.createElement("li");
      n.classList.add("list-group-item", "list-group-item-acition");
      let l = document.createElement("button");
      l.classList.add("btn", "btn-outline-warning", "btn-lg", "btn-block"),
        l.setAttribute("data-target", "#pokemonModal"),
        l.setAttribute("data-toggle", "modal"),
        l.setAttribute("color", "#003A70"),
        (l.innerText = e.name),
        n.appendChild(l),
        t.appendChild(n),
        l.addEventListener("click", function() {
          i(e);
        });
    },
    loadList: function() {
      return (
        o(),
        fetch(t)
          .then(function(e) {
            return e.json();
          })
          .then(function(e) {
            r(),
              e.results.forEach(function(e) {
                n({ name: e.name, detailsUrl: e.url });
              });
          })
          .catch(function(e) {
            r(), console.error(e);
          })
      );
    },
    loadDetails: l,
    showDetails: i
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
let searchInput = document.querySelector("#searchIn");
searchInput.addEventListener("input", function() {
  let e = document.querySelectorAll(".list-group-item"),
    t = searchInput.value.toUpperCase();
  e.forEach(function(e) {
    e.innerText.toUpperCase().indexOf(t) > -1
      ? (e.style.display = "")
      : (e.style.display = "none");
  });
});
