const initialState = {
    videoGames: [],
    generos: [],
    videoGamesDetail: {},
    isLoading: false,
    ordenando: false,
    filtrados: [],//Implementar esto para no tener q buscar siempre en videoGames,
    generosLoading:false,
}


function rootReducer(state = initialState, action) {
    if(action.type === "FILTRAR_BD"){
        const elementos = []
        if(action.payload === "BD"){
            state.videoGames.forEach(e => {if(e.baseDatos)elementos.push(e)})
        }else if(action.payload === "RAWG"){
            state.videoGames.forEach(e => {if(!e.baseDatos)elementos.push(e)})
        }else{
            state.videoGames.forEach(e => elementos.push(e))
        }
        return{
            ...state,
            filtrados:elementos
        }

    }
    if(action.type === "FILTRAR_GENERO"){
        const videoGamesNuevo = []
        for (let index = 0; index < state.videoGames.length; index++) {
            const element = state.videoGames[index];
            element.genres.forEach(elemento => {
                if(action.payload.toLowerCase() === elemento.name.toLowerCase()){
                    videoGamesNuevo.push(element)
                }
                    
            });
        }
        return{
            ...state,
            filtrados: videoGamesNuevo
        }
    }
    if(action.type === "AGREGAR_GENEROS"){
        console.log("payload: ------------------->",action.payload)
        return {
            ...state,
            generos:action.payload,
            generosLoading:false
        }
    }
    if(action.type === "BUSCAR"){
        return{
            ...state,
            isLoading:false,
            videoGamesDetail:action.payload
        }
    }
    if(action.type === "ORDENAR_STORE"){
        let ordenados = state.videoGames
        if(action.payload.type === "name")
            ordenados.sort(function(a,b){return a[action.payload.type]>b[action.payload.type] ? 1 : -1})
        if(action.payload.type === "rating")
            ordenados.sort((a,b) => b[action.payload.type]-a[action.payload.type])
        if(action.payload.orden === "des")
            ordenados.reverse()
        return {
            ...state,
            filtrados:ordenados,
            ordenando: !state.ordenando
        }}

    if(action.type === "LOADING"){
        return {
            ...state,
            isLoading: true
        }
    }
    if(action.type === "LOADING_G"){
        return {
            ...state,
            generosLoading: true
        }
    }
    if (action.type === "GET_VIDEOGAME_DETAIL") {
        return {
          ...state,
          videoGamesDetail: action.payload,
          isLoading:false
        }
    }
    if (action.type === "GET_VIDEOGAMES_BYNAME") {

        return {
            ...state,
            videoGames: action.payload,
            isLoading:false,
            filtrados:action.payload
        };
    }
    if(action.type === "GET_VIDEOGAMES"){
        return {
            ...state,
            videoGames: action.payload,
            isLoading:false,
            filtrados: action.payload
          }
    }
    return state;
  }
  
  export default rootReducer;