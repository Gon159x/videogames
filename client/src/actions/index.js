export function getVideoGameDetail(payload) {
    return { type: "GET_VIDEOGAME_DETAIL", payload };
  }
  
  // export function getVideoGame(titulo) {
  //   return function(dispatch) {
        
  //       dispatch({ type: 'LOADING' });
  //       return fetch("https://api.rawg.io/api/games?key=f79ce3822058497090acd470ecd98a01&search=" + titulo)
  //           .then(response => response.json())
  //           .then(json => {
  //           dispatch({ type: "GET_VIDEOGAMES_BYNAME", payload: json });
  //           });
  //       };
  // }
// export function buscarVideoJuego(payload){
//   return{type: "BUSCAR", payload}
// }

export function buscarVideoJuego(id){
  return function(dispatch){
    dispatch({ type: 'LOADING' });
    return fetch(`https://api.rawg.io/api/games/${id}?key=f79ce3822058497090acd470ecd98a01`)
    .then(data => data.json())
    .then(json => dispatch({type:"BUSCAR",payload:json}))
  }
}

  export function getVideoGame(titulo){
    return async function(dispatch){
        dispatch({ type: 'LOADING' });
        const resultados = []
        for (let index = 0; index < 5; index++) {
            const promesa = await fetch("https://api.rawg.io/api/games?key=f79ce3822058497090acd470ecd98a01&page="+(index+1)+"&search="+titulo)
            resultados.push(promesa)
        }
        return Promise.all(resultados)
        .then(async respuestas => {
            let paginas = []
            for (let index = 0; index < respuestas.length; index++) {
              const element = respuestas[index];
              const datos = await element.json()
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
        return Promise.all(resultados)
        .then(async respuestas => {
            let paginas = []
            for (let index = 0; index < respuestas.length; index++) {
              const element = respuestas[index];
              const datos = await element.json()
              datos.results.forEach(element => {
                paginas.push(element)
              });
            }
            return paginas
        })
        .then(json => {
            dispatch({type:"GET_VIDEOGAMES",payload:json})
        })
        // return fetch("https://api.rawg.io/api/games?key=f79ce3822058497090acd470ecd98a01")
        // .then(respuesta => respuesta.json())
        // .then(json => {
        //     dispatch({ type: "GET_VIDEOGAMES", payload: json });
        //     })
    }
  }