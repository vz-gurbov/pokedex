const heroes = document.getElementById("heroes");
const pokeCache = {};
const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((result, index) => 
    ({
        ...result,
        apiURL: result.url,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));

    console.log(data.results);
    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
    .map( 
        (pokeman) =>

        `<li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card__image" src="${pokeman.image}"/>
        <h2 class="card__title">${pokeman.id}. ${pokeman.name}</h2>
    </li>`

        ).join("");
    heroes.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if(!pokeCache[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokeman = await res.json();
        pokeCache[id] = pokeman;
        console.log(pokeCache);
        displayPopup(pokeman);
    }
    displayPopup(pokeCache[id]);
};

const displayPopup = (pokeman) => {
    const type = pokeman.types.map(type =>
        type.type.name).join(', ');
        const image = pokeman.sprites['front_default'];
        const htmlString = `
        <div class="popup">
        <button id="closeBtn" onclick="closePopup()
        ">Close</button>
        <div class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card__image" src="${image}"/>
        <h2 class="card__title">${pokeman.id}. ${pokeman.name}</h2>
        <p><small>Height: </small>${pokeman.height} | <small>Weight: </small>${pokeman.weight} | <small>Type: </small>${type} | </p>
        </div>
        </div>
        `;
        heroes.innerHTML = htmlString + heroes.innerHTML;
        console.log(htmlString);
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();

