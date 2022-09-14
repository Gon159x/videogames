import React, {useState} from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './SearchBar.css';
import { getVideoGame } from "../actions";

function SearchBar({getVideoGame,simplificado}) {

  const [videoJuego, setvideoJuego] = useState('')

  const cambia = (e) => {
    setvideoJuego(e.target.value)
  }
  let clasSimplificado ="chico"
  if(simplificado)
    clasSimplificado = "grande"

  return (
    <form className="form-inline"  onSubmit={(e) => {
      e.preventDefault();
      getVideoGame(videoJuego)
      
      //onSearch(videoJuego);
    }}>
      <div>
      <input className={clasSimplificado} type="search" placeholder="   Buscar Videojuego...." onChange={cambia}/>
      {/* <button type="submit">Buscar</button> */}
      </div>
      
    </form>
    
  );
}


function mapStateToProps(state) {
  return {
    videoGames: state.videoGames
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