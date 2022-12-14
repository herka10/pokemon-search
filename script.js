var form = document.querySelector('form')
var nameInput = document.getElementById('pokemon-name')
var resultsEl = document.getElementById('results')

function searchPokemon(event) {
    event.preventDefault()
 
    var pokemonName = nameInput.value.trim().toLowerCase()

    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
        .then(function(response){
            if (response.status === 200) {
                return response.json()
            } else if (response.status === 404) {
                alert(pokemonName + ' not found. Search again')
                nameInput.value = ""
            }
        })
        .then(function(pokemon) {

        var cardDiv = document.createElement('div')
        var cardBody = document.createElement('div')
        var h2 = document.createElement('h2')
        var img = document.createElement('img')
        var abilitiesList = document.createElement('ul')

        cardDiv.classList.add('card')
        cardDiv.classList.add('mb-3')
        cardDiv.classList.add('col-md-4')
        cardBody.classList.add('card-body')
        h2.textContent = pokemon.name
        img.src = pokemon.sprites.front_default
        img.alt = pokemon.name
        img.classList.add('card-img-top')
        
        // abliilties
        for (var i = 0; i< pokemon.abilities.length; i++) {
            var li = document.createElement('li')
            li.textContent = pokemon.abilities[i].ability.name
            abilitiesList.append(li)
        }   
        

        cardBody.append(h2)
        cardBody.append(img)
        cardBody.append(abilitiesList)
        cardDiv.append(cardBody)
        resultsEl.append(cardDiv)

        nameInput.value = ""
    })
}

form.addEventListener('submit', searchPokemon)

