const pokemonContainer = document.getElementById('pokemon-container');
const searchBar = document.getElementById('search-bar');
const pokemonDetails = document.getElementById('pokemon-details');
const detailsContent = document.getElementById('details-content');

async function getPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        return null;
    }
}

function displayPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.addEventListener('click', () => openDetails(pokemon.name)); 

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;
    sprite.alt = `${pokemon.name} sprite`;
    sprite.classList.add('pokemon-img'); 

    const name = document.createElement('h2');
    name.textContent = pokemon.name;

    card.appendChild(sprite);
    card.appendChild(name);
    pokemonContainer.appendChild(card);
}

async function openDetails(pokemonName) {
    const pokemon = await getPokemonData(pokemonName);

    if (pokemon) {
        detailsContent.innerHTML = `
            <h2>${pokemon.name}</h2> 
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-img">
            <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Height:</strong> ${pokemon.height / 10} m</p> 
            <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p> 
            <p><strong>Abilities:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
            </div>
        `; 

        pokemonDetails.style.display = 'block';
    }
}

function closeDetails() {
    pokemonDetails.style.display = 'none';
}

// Initial Pokémon display
getPokemonData('pikachu').then(data => displayPokemon(data));

// Search Functionality 
searchBar.addEventListener('input', async () => {
    const searchTerm = searchBar.value.toLowerCase();
    pokemonContainer.innerHTML = ''; // Clear previous results

    // For simplicity, we'll fetch a new Pokemon based on the search
    // Ideally, you would filter existing results or implement pagination
    const pokemon = await getPokemonData(searchTerm); 
    if (pokemon) {
        displayPokemon(pokemon);
    } else {
        pokemonContainer.innerHTML = "<p>Pokémon not found.</p>";
    }
});
