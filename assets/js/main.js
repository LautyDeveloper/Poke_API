//Traemos los Elementos del DOM
const resultContainer = document.querySelector(".resultado_container")
const form = document.querySelector("#form")
const input = document.querySelector("#form_input")


//Creamos la Llamada a la API
const fetchPokemon = async(number) =>{
    try {
        //Pasandole la URL junto con el Numero de pokemon que debe traer
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        //Y pasamos res a formato JSON
        const data = await res.json()
        return data;
    } catch {
        return null;
    }
}

//Funcion que nos devuelve un span con cada tipo que tiene ese pokemon
const allTypes = (types) =>{
    return types.map((tipo) => {
        return `<span class="${tipo.type.name}">${tipo.type.name.toUpperCase()}</span>`
      }).join(" ")
}

//Renderizamos la card del Pokemon
const renderPokemon = (pokemon) =>{
    const {name, sprites, height, weight, types} = pokemon;
    return `
    <div class="card">
        <div class="contenido">
          <img src=${sprites.other.home.front_default} alt="" />
          <h2>${name.toUpperCase()}</h2>
          <div class="tipos">
          ${allTypes(types)}
          </div>
          <div class="datos">
            <p>Height: ${height / 10}</p>
            <p>Weight: ${weight / 10}</p>
          </div>
        </div>
      </div> 
    `
}

//Mostramos el Error de Vacio
const showEmptyError = () =>{
    resultContainer.innerHTML = `
    <div class="Error">
        <img src="assets/media/advertencia.png" alt="" />
        <h2>
          Por favor, ingrese un numero para que podamos buscar al Pokemon en la
          Pokedex
        </h2>
      </div> 
    `
}

//Mostramos el Error de No encontrado
const showNotFoundedError = () =>{
    resultContainer.innerHTML = `
        <div class="Error">
        <img src="assets/media/advertencia.png" alt="" />
        <h2>No existe un Pokemon con ese Numero en la Pokedex</h2>
      </div> 
        `
}

//Nos fijamos si el input esta vacio
const isEmpty = (valor) =>{
    return !valor
}

//Renderizamos el Resultado, ya sea no encontrado o la card
const renderResult = async(pokemon) =>{
    //newPokemon sera el Pokemon que devuelva la Api
    const newPokemon = await pokemon;

        //Preguntamos si no hay newPokemon quiere decir que no fue encontrado
    if (!newPokemon){
        showNotFoundedError()
    }else{
        //Sino renderizamos la Card
        resultContainer.innerHTML = renderPokemon(newPokemon)
    }
}

const submitSearch = (e) =>{
    e.preventDefault();

    const searchedValue = input.value
    
    //En Caso de que Este vacio:
    if(isEmpty(searchedValue)){
        showEmptyError()
        return;
    }

    //Si no esta Vacio:
    const searchedPokemon = fetchPokemon(Number(searchedValue))
    renderResult(searchedPokemon)
    form.reset();
}


const init = () =>{
    form.addEventListener("submit", submitSearch)
}

init();