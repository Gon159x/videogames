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
      console.log("Entre al else")
      const nuevoId = id.slice(2,id.length)
      return fetch('http://localhost:3001/videogames/'+nuevoId)
      .then(data => data.json())
      .then(json => {
        console.log("json--------------------",json[0])
        json = {description_raw:json[0].descripcion,name:json[0].nombre,background_image
          :"https://i.pinimg.com/originals/48/37/c8/4837c8aeb859b31d514b561bd4f4cb65.jpg",rating:json[0].rating,released:json[0].lanzamiento}
        console.log("nnuevo json",json)
        dispatch({type:"BUSCAR",payload:json})})
    }
  }
}
  export function getGeneros(){
    return function(dispatch){
      return fetch("http://localhost:3001/genres")
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
        const promesa2 = await fetch("http://localhost:3001/videogames?name="+titulo)
        resultados.push(promesa2)
        return Promise.all(resultados)
        .then(async respuestas => {
            let paginas = []
            for (let index = 0; index < respuestas.length; index++) {
              const element = respuestas[index];
              const datos = await element.json()
              if(!datos.results)
                datos.results = datos.map(e => {return{id:e.id,name:e.nombre,baseDatos:true,background_image
                  :"https://i.pinimg.com/originals/48/37/c8/4837c8aeb859b31d514b561bd4f4cb65.jpg"}})
              datos.results.forEach(element => {
                paginas.push(element)
              });
            }
            return paginas
        })
        .then(json => {
            dispatch({type:"GET_VIDEOGAMES_BYNAME",payload:json})
        })
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
         const promesa2 = await fetch("http://localhost:3001/videogames")
         resultados.push(promesa2)
        return Promise.all(resultados)
        .then(async respuestas => {
            let paginas = []
            for (let index = 0; index < respuestas.length; index++) {
              const element = respuestas[index];
              const datos = await element.json()
              if(!datos.results){
                datos.results = datos.map(e => {return{id:e.id,name:e.nombre,baseDatos:true,background_image
                  :"https://i.pinimg.com/originals/48/37/c8/4837c8aeb859b31d514b561bd4f4cb65.jpg"}})
                
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