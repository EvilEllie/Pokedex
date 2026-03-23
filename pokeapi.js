// function getPokemons(){
//     fetch('https://pokeapi.co/api/v2/pokemon')
//     .then(response => response.json())
//     .then(json => console.log(json));

// }


// async function getPokemonswait(){
//     respuesta= await fetch('https://pokeapi.co/api/v2/pokemon');
//     data = respuesta.json();
//     return data;
// }

// function requestPokemons(){
//     console.log(getPokemonswait())
// }


// async function buscarPokemon(){

//     nombre = document.getElementById("nombre").value;

//     respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
//     info = await respuesta.json();

//     console.log(info);   
// }

pokemons=[];

function buscarPokemon(){

    let nombre = document.getElementById("nombre").value.toLowerCase();

    if(nombre == ""){
        alert("Porfavor ingresa un nombre");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)

        .then(response => {
            if(!response.ok){
                throw new Error("No se encontró el pokemon");}
            return response.json();})

        .then(json => verDatos(json))
        .catch(error => {document.getElementById("datos").innerHTML = "<br> Nombre invalido";});
}

function verDatos(pokedata){

    
    datos = document.getElementById("datos");
    document.getElementById("titulohistorial");

    titulohistorial.innerHTML = "Historial de busqueda"
    datos.innerHTML = "<h2>Datos del Pokémon</h2> <br>"
    datos.innerHTML += "Nombre: " + pokedata['name'] + "<br>"
    datos.innerHTML += "Peso: " + (pokedata['weight']/10) + "kg" + "<br>"
    datos.innerHTML += "Altura: " + (pokedata['height']/10) + "m" + "<br>"
    

    datos.innerHTML += "<h3> Tipos: </h3>"
    pokedata['types'].forEach(tipo => { datos.innerHTML += tipo['type']['name'] + "<br>";});
    
    datos.innerHTML += "<h3> Habilidades: </h3>"
    pokedata['abilities'].forEach(habilidad => {datos.innerHTML += habilidad['ability']['name'] + "<br>";});

    datos.innerHTML += "<h3> Estadisticas: </h3>"
    pokedata['stats'].forEach(stat => {datos.innerHTML += stat['stat']['name'] + ": " + stat['base_stat'] + "<br>"});

    sprite = (pokedata['sprites']['front_default'])
    datos.innerHTML += `<img src="${sprite}">`;

    pokemons.push(pokedata);

    

    lista = document.getElementById("lista");
    lista.innerHTML = "";
    

    pokemons.forEach((pokemon, indice) => {

        lista.innerHTML += pokemon.name + "<br> <button onclick='verLista(" + indice + ")'>Ver info</button><br><br>";

    });
}

function verLista(indice){

    pokemon = pokemons[indice];
    verDatos(pokemon);

}

