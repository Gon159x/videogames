export function getVideoGameDetail(payload) {
    return { type: "GET_VIDEOGAME_DETAIL", payload };
  }
  
  export function getVideoGame(titulo) {
    return function(dispatch) {
        
        dispatch({ type: 'LOADING' });
        return fetch("https://api.rawg.io/api/games?key=f79ce3822058497090acd470ecd98a01&search=" + titulo)
            .then(response => response.json())
            .then(json => {
            dispatch({ type: "GET_VIDEOGAMES_BYNAME", payload: json });
            });
        };
  }

  export function getVideoGames(){
    return async function(dispatch){
        dispatch({ type: 'LOADING' });
        // const resultados = []
        // for (let index = 0; index < 5; index++) {
        //     //const promesa = await fetch("https://api.rawg.io/api/games?key=f79ce3822058497090acd470ecd98a01&page="+(index+1))
        //     const promesa = await fetch("https://api.rawg.io/api/games?key=f79ce3822058497090acd470ecd98a01&page="+(index+1))
        //     resultados.push(promesa)
        // }
        // return Promise.all(resultados)
        // .then(respuestas => {
        //     respuestas = respuestas.map(elemento => elemento.json())
        //     console.log(respuestas[0])
            
        // })
        // .then(json => {
        //     dispatch({type:"GET_VIDEOGAMES",payload:json})
        // })
        return fetch("https://api.rawg.io/api/games?key=f79ce3822058497090acd470ecd98a01")
        .then(respuesta => respuesta.json())
        .then(json => {
            dispatch({ type: "GET_VIDEOGAMES", payload: json });
            })
    }
  }