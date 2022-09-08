const initialState = {
    videoGames: [],
    videoGamesDetail: {},
    isLoading: false
}


function rootReducer(state = initialState, action) {
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
          videoGames: action.payload.results,
          isLoading:false
        };
    }
    if(action.type === "GET_VIDEOGAMES"){

        return {
            videoGames: action.payload.results,
            isLoading:false
          }
    }
    return state;
  }
  
  export default rootReducer;