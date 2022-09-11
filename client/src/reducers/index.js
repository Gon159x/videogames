const initialState = {
    videoGames: [],
    genres: [],
    videoGamesDetail: {},
    isLoading: false,
    ordenando: false
}


function rootReducer(state = initialState, action) {
    // if(action.type === "BUSCAR"){
    //     const id = Number(action.payload)
    //     for (let index = 0; index < state.videoGames.length; index++) {
    //         const element = state.videoGames[index];
    //         if(element.id === id){
    //             console.log(element)
    //         return{
    //             ...state,
    //             videoGamesDetail: element
    //         }}
    //     }
    // }
    if(action.type === "BUSCAR"){
        console.log(action.payload)
        return{
            ...state,
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
            videoGames:ordenados,
            ordenando: !state.ordenando
        }}

    if(action.type === "LOADING"){
        return {
            ...state,
            isLoading: true
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
          videoGames: action.payload,
          isLoading:false
        };
    }
    if(action.type === "GET_VIDEOGAMES"){
        return {
            videoGames: action.payload,
            isLoading:false
          }
    }
    return state;
  }
  
  export default rootReducer;