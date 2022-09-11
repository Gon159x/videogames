import React, {useState} from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './SearchBar.css';
import { getVideoGame } from "../actions";

function SearchBar({videoGames,getVideoGame}) {

  const [videoJuego, setvideoJuego] = useState('')

  const cambia = (e) => {
    setvideoJuego(e.target.value)
  }

  return (
    <form className="form-inline"  onSubmit={(e) => {
      e.preventDefault();
      getVideoGame(videoJuego)
      
      //onSearch(videoJuego);
    }}>
      <input type="search" placeholder="Buscar Videojuego" onChange={cambia}/>
      {/* <button type="submit">Buscar</button> */}
    </form>
    
  );
}


function mapStateToProps(state) {
  return {
    videoGames: state.videoGamesDetail
  };
}//Creo que esto no hace falta

function mapDispatchToProps(dispatch) {
  return {
    getVideoGame: title => dispatch(getVideoGame(title))
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);