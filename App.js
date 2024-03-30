// fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then((result) => {
//     const pokeapi = result

//     console.log(pokeapi);
// }).catch((err) => {
//     console.log(err);
// });

//Para pedir un pokemon espesifico debes poner "/Nombre del pokemon despues" de este ID
const PokeAPIID1 = "https://pokeapi.co/api/v2/pokemon/"

//Para toma una categoria pokemon tiene que poner el numero de la categoria despues del Type
const PokeAPIID2 = "https://pokeapi.co/api/v2/type/"

//Para tomar todos los pokemones
const PokeAPIID3 = "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0"

//DameLosDatos(PokeAPIID1+"pikachu")
//DameLosDatos(PokeAPIID2+"2")
//DameLosDatos(PokeAPIID3)
let CantidadDePokemonesPorCarga = 24

let CantidadDePokemonesCargados = 0

let SePuedeCargarMas = true

const InputBarraDeBusqueda = document.getElementById("BuscarInput")

async function BuscarPokemon(params) {
    InputBarraDeBusqueda.value.toLowerCase()

    const Response = await fetch(PokeAPIID1+InputBarraDeBusqueda.value)
    const Data = await Response.json()

    SelecionarPokemon(Data)
    console.log(Data);
}

InputBarraDeBusqueda.addEventListener("input",()=>{
    BuscarPokemon()
})

const ListaDePokemones = document.getElementById("ListaDePokemones")


function SelecionarPokemon(InformacionDetalladaPokemon) {
    console.log(InformacionDetalladaPokemon);

    const Nombre = document.getElementById("Nombre")
    const Altura = document.getElementById("Altura")
    const Peso = document.getElementById("Peso")
    const BaseExperience = document.getElementById("ExperienciaBase")
    const Tipo = document.getElementById("Tipo")
    let ImagenDePokemonSeleccionado = document.getElementById("ImagenDePokemonSeleccionado")
   
    const Vida = document.getElementById("Vida")
    const Ataque = document.getElementById("Ataque")
    const Defensa = document.getElementById("Defensa")
    const AtaqueEspecial = document.getElementById("Ataque especial")
    const DefensaEspecial = document.getElementById("Defensa especial")
    const Speed = document.getElementById("Speed")

    Vida.textContent = "Vida: " + InformacionDetalladaPokemon.stats[0].base_stat
    Ataque.textContent = "Ataque: " + InformacionDetalladaPokemon.stats[1].base_stat
    Defensa.textContent = "Defensa: " + InformacionDetalladaPokemon.stats[2].base_stat
    AtaqueEspecial.textContent = "AtaqueEspecial: " + InformacionDetalladaPokemon.stats[3].base_stat
    DefensaEspecial.textContent = "DefensaEspecial: " + InformacionDetalladaPokemon.stats[4].base_stat
    Speed.textContent = "Speed: " + InformacionDetalladaPokemon.stats[5].base_stat

    const TiposDelPokemon = InformacionDetalladaPokemon.types
    let NombreDelTipoPokemon = "Type:"

    for (let i = 0; i < TiposDelPokemon.length; i++) {
        const NombreDelTipo = TiposDelPokemon[i].type.name;
        if (i == 0) {
            NombreDelTipoPokemon = NombreDelTipoPokemon + " " + NombreDelTipo
        } else {
            NombreDelTipoPokemon = NombreDelTipoPokemon + ", " + NombreDelTipo
        }
    }

    Nombre.textContent = "Nombre: " + InformacionDetalladaPokemon.name
    Altura.textContent = "Altura: " + InformacionDetalladaPokemon.height
    Peso.textContent = "Peso: " + InformacionDetalladaPokemon.weight
    BaseExperience.textContent = "Experiencia base: " + InformacionDetalladaPokemon.base_experience
    Tipo.textContent = NombreDelTipoPokemon

    ImagenDePokemonSeleccionado.src = InformacionDetalladaPokemon.sprites.front_default;
    ImagenDePokemonSeleccionado.alt = InformacionDetalladaPokemon.name;

    // ImagenDePokemonSeleccionado.innerHTML = '<img id="ImagenDePokemonSeleccionado" src="'+InformacionDetalladaPokemon.sprites.front_default+'" alt="" width="100">'
}

function AgregarListaAlContenedor(contenedor, elementos, ImagenID, InformacionDetalladaPokemon) {
    // Obtener el contenedor mediante su ID

    // Crear la lista y agregarla al contenedor
    const lista = document.createElement('ul');
    lista.classList.add("CartaPokemon")
    lista.id = "CartasDePrecentacionPokemon"

    const BotonDeSeleccionPokemon = document.createElement('button');
    BotonDeSeleccionPokemon.addEventListener("click", function () {
        SelecionarPokemon(InformacionDetalladaPokemon)
    })

    const ImagenDeLaPrecentacion = document.createElement('img');
    ImagenDeLaPrecentacion.src = ImagenID
    ImagenDeLaPrecentacion.id = "ImagenDePokemon"

    BotonDeSeleccionPokemon.appendChild(ImagenDeLaPrecentacion);
    lista.appendChild(BotonDeSeleccionPokemon);

    // Iterar sobre los elementos y crear elementos de lista (li)
    elementos.forEach(texto => {
        const elementoLista = document.createElement('li');
        elementoLista.textContent = texto;
        lista.appendChild(elementoLista);
    });

    // Agregar la lista al contenedor
    contenedor.appendChild(lista);
}

async function DameMasPokemones(CantidadDePokemonesACargar) {
    if (SePuedeCargarMas == false) {
        return
    }

    let ID;

    if (CantidadDePokemonesCargados == 0) {
        ID = "https://pokeapi.co/api/v2/pokemon?limit=" + CantidadDePokemonesACargar + "&offset=0"
    } else {
        ID = "https://pokeapi.co/api/v2/pokemon?limit=" + (CantidadDePokemonesACargar + CantidadDePokemonesCargados) + "&offset=" + CantidadDePokemonesCargados
    }

    CantidadDePokemonesCargados += CantidadDePokemonesACargar

    // console.log("CantidadDePokemonesACargar = "+ CantidadDePokemonesACargar);
    // console.log(CantidadDePokemonesCargados);

    const Response = await fetch(ID)
    const Data = await Response.json()

    let PokemonesObtenidos = Data.results;

    for (let i = 0; i < PokemonesObtenidos.length; i++) {
        async function CrearCartaPokemon() {
            const InformacionPokemon = PokemonesObtenidos[i];

            const Response2 = await fetch(InformacionPokemon.url)
            const Data2 = await Response2.json()

            let InformacionDetalladaPokemon = Data2;

            const TiposDelPokemon = InformacionDetalladaPokemon.types
            let NombreDelTipoPokemon = "Type:"

            for (let i = 0; i < TiposDelPokemon.length; i++) {
                const Tipo = TiposDelPokemon[i].type.name;
                if (i == 0) {
                    NombreDelTipoPokemon = NombreDelTipoPokemon + " " + Tipo
                } else {
                    NombreDelTipoPokemon = NombreDelTipoPokemon + ", " + Tipo
                }
            }

            AgregarListaAlContenedor(ListaDePokemones, ["Nombre: " + InformacionPokemon.name, NombreDelTipoPokemon], InformacionDetalladaPokemon.sprites.front_default, InformacionDetalladaPokemon)

        }

        CrearCartaPokemon()
    }
}



async function DamePokemonesDeTipoEspecifico(TipoEspeficicoDelPokemon) {
    SePuedeCargarMas = false
    // setTimeout(function(){

    // }, 1000);
    let ListaDePokemones = document.getElementById("ListaDePokemones")
    ListaDePokemones.innerHTML = '';
    console.log("Borrar");


    CantidadDePokemonesCargados = 0

    let ID = PokeAPIID2 + TipoEspeficicoDelPokemon;

    const Response = await fetch(ID)
    const Data = await Response.json()

    let PokemonesObtenidos = Data.pokemon;

    console.log(PokemonesObtenidos);

    for (let i = 0; i < PokemonesObtenidos.length; i++) {
        async function CrearCartaPokemon() {
            const InformacionPokemon = PokemonesObtenidos[i];

            const Response2 = await fetch(InformacionPokemon.pokemon.url)
            const Data2 = await Response2.json()

            let InformacionDetalladaPokemon = Data2;

            const TiposDelPokemon = InformacionDetalladaPokemon.types
            let NombreDelTipoPokemon = "Type:"

            for (let i = 0; i < TiposDelPokemon.length; i++) {
                const Tipo = TiposDelPokemon[i].type.name;
                if (i == 0) {
                    NombreDelTipoPokemon = NombreDelTipoPokemon + " " + Tipo
                } else {
                    NombreDelTipoPokemon = NombreDelTipoPokemon + ", " + Tipo
                }
            }

            AgregarListaAlContenedor(ListaDePokemones, ["Nombre: " + InformacionPokemon.name, NombreDelTipoPokemon], InformacionDetalladaPokemon.sprites.front_default, InformacionDetalladaPokemon)

        }

        CrearCartaPokemon()
    }
}

DameMasPokemones(24)

function ResetPagina(params) {
    SePuedeCargarMas = true
    CantidadDePokemonesCargados = 0
    let ListaDePokemones = document.getElementById("ListaDePokemones")
    ListaDePokemones.innerHTML = '';
    console.log("Borrar");
    DameMasPokemones(CantidadDePokemonesPorCarga)
}

