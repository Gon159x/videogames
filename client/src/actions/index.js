import { baseURL } from "..";

export function getVideoGameDetail(payload) {
    return { type: "GET_VIDEOGAME_DETAIL", payload };
  }
  
export function notLoading(){
  return {type: "LOADING"}
}


export function filtrarBD(payload){
  return {type: "FILTRAR_BD",payload}
}

export function buscarVideoJuego(id){
  return function(dispatch){
    if(!id.includes("bd"))
    //dispatch({ type: 'LOADING' });
      return fetch(`https://api.rawg.io/api/games/${id}?key=f79ce3822058497090acd470ecd98a01`)
      .then(data => data.json())
      .then(json => {
        console.log(json)
        dispatch({type:"BUSCAR",payload:json})})
    else {
      const nuevoId = id.slice(2,id.length)
      return fetch(baseURL+'/videogames/'+nuevoId)
      .then(data => data.json())
      .then(json => {
        if(json[0].Generos)
          json[0].Generos = json[0].Generos.map(e => {return {id:e.id,name:e.nombre}})
        else
          json[0].Generos = [{id:99999,name:"Sin generos archivados"}]
        if(json[0].plataformas){
          const plataformas =  json[0].plataformas.split(",")
          json[0].plataformas = plataformas.map(e => {return {platform:{name:e}}})
        }
        console.log(json[0])
        json = {parent_platforms:json[0].plataformas,description_raw:json[0].descripcion,name:json[0].nombre,background_image
          :"https://areajugones.sport.es/wp-content/uploads/2022/08/guilty-gear-strive.jpg",rating:json[0].rating,released:json[0].lanzamiento,genres:json[0].Generos}
        dispatch({type:"BUSCAR",payload:json})})
    }
  }
}
  export function getGeneros(){
    return function(dispatch){
      return fetch(baseURL+"/genres")
      .then(data =>  data.json())
      .then(data => dispatch({type:"AGREGAR_GENEROS",payload:data}))
    }
  }


  export function filtrarGenero(payload){
    return {type:"FILTRAR_GENERO",payload:payload}
  }

  export function getVideoGame(titulo){
    return async function(dispatch){
        dispatch({ type: 'LOADING' });
        const resultados = []
        for (let index = 0; index < 5; index++) {
            const promesa = await fetch("https://api.rawg.io/api/games?key=f79ce3822058497090acd470ecd98a01&page="+(index+1)+"&search="+titulo)
            resultados.push(promesa)
        }
        const promesa2 = await fetch(baseURL+"/videogames?name="+titulo)
        resultados.push(promesa2)
        return Promise.all(resultados)
        .then(async respuestas => {
            let paginas = []
            for (let index = 0; index < respuestas.length; index++) {
              const element = respuestas[index];
              const datos = await element.json()
              if(datos.length > 0 && !datos.results){
                datos.forEach(e=> {
                  if(e.Generos)
                    e.Generos = e.Generos.map(a => {return{id:a.id,name:a.nombre}})
                })
                datos.results = datos.map(e => {return{genres:e.Generos,id:e.id,name:e.nombre,baseDatos:true,background_image
                  :"https://areajugones.sport.es/wp-content/uploads/2022/08/guilty-gear-strive.jpg"}})
                }
              if(datos.results)
              datos.results.forEach(element => {
                paginas.push(element)
              });
            }
            return paginas
        })
        .then(json => {
            dispatch({type:"GET_VIDEOGAMES_BYNAME",payload:json})
        })
        .catch(error => console.log(error.message))
    }
  }

  export function ordenar(payload){
    return ({type:"ORDENAR_STORE",payload:payload})
  }

  export function getVideoGames(){
    return async function(dispatch){
        dispatch({ type: 'LOADING' });
        const resultados = []
        for (let index = 0; index < 5; index++) {
            const promesa = await fetch("https://api.rawg.io/api/games?key=f79ce3822058497090acd470ecd98a01&page="+(index+1))
            resultados.push(promesa)
        }
         const promesa2 = await fetch(baseURL+"/videogames")
         resultados.push(promesa2)
        return Promise.all(resultados)
        .then(async respuestas => {
            let paginas = []
            for (let index = 0; index < respuestas.length; index++) {
              const element = respuestas[index];
              let datos = await element.json()
              if(!datos.results){
                datos.forEach(e=> {
                  if(e.Generos)
                    e.Generos = e.Generos.map(a => {return{id:a.id,name:a.nombre}})
                })
                datos.results = datos.map(e => {return{genres:e.Generos,id:e.id,name:e.nombre,baseDatos:true,background_image
                  :"https://areajugones.sport.es/wp-content/uploads/2022/08/guilty-gear-strive.jpg"}})
                }
              datos.results.forEach(element => {
                paginas.push(element)
              });
            }
            return paginas
        })
        .then(json => {
            dispatch({type:"GET_VIDEOGAMES",payload:json})
        })
    }
  }