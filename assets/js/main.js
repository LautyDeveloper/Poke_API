const resultContainer = document.querySelector(".resultado_container")
const form = document.querySelector("#form")
const input = document.querySelector("#form_input")

const fetchPokemon = async(number) =>{
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        const data = await res.json()
        return data;
    } catch {
        return null;
    }
}

const allTypes = (types) =>{
    return types.map((tipo) => {
        return `<span class="${tipo.type.name}">${tipo.type.name.toUpperCase()}</span>`
      }).join(" ")
}

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

const showNotFoundedError = () =>{
    resultContainer.innerHTML = `
        <div class="Error">
        <img src="assets/media/advertencia.png" alt="" />
        <h2>No existe un Pokemon con ese Numero en la Pokedex</h2>
      </div> 
        `
}

const isEmpty = (valor) =>{
    return !valor
}

const renderResult = async(pokemon) =>{
    const newPokemon = await pokemon;

    if (!newPokemon){
        showNotFoundedError()
    }else{
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