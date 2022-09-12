import React from 'react';
import SearchBar from './SearchBar.jsx'; 
import './Nav.css';
import {Link} from 'react-router-dom';  
import { connect } from 'react-redux';
import { ordenar,filtrarGenero,filtrarBD } from '../actions/index.js';
import {useEffect} from 'react';
import logo from "./favicon.ico"

function Nav({filtrarBD,ordenar,reiniciar,generos,filtrarGenero}) {
    useEffect(() =>{
    },[generos])

    return (

<div id="container">
    <nav>
        <ul>
            <li><a></a></li>
            <li onClick={() => reiniciar()}><Link to="/home"><img style={{flex:1,flexWrap:'wrap'}} src={logo} className="logo-henry"/>Henry -VideoGames</Link></li>
            

      
            {/* cambiar a href por LINK */}
            <li><SearchBar/></li>
            <li><a href="#">Ordenar<i className="down"></i></a>
                <ul>
                    <li onClick={() => ordenar({type:"name",orden:"asc"})}><a href="#">ABC ↑</a></li>
                    <li onClick={() => ordenar({type:"name",orden:"des"})}><a href="#">ABC ↓</a></li>
                    <li onClick={() => ordenar({type:"rating",orden:"asc"})}><a href="#">Rating ↑</a></li>
                    <li onClick={() => ordenar({type:"rating",orden:"des"})}><a href="#">Rating ↓</a></li>
                </ul>
            </li>
           <li><a href="#">Generos<i className="down"></i></a>
                <ul>
                {generos ? generos.map(elemento => <li onClick={() => filtrarGenero(elemento.nombre)}><a href="#">{elemento.nombre}</a></li>) : <li><a href="#">No cargo los generos e</a></li>}
                </ul>
           </li>
           <li><a href="#">Base de datos<i className="down"></i></a>
                <ul>
                    <li onClick={() => filtrarBD("RAWG")} ><a href="#">RAWG</a></li>
                    <li onClick={() => filtrarBD("BD")}><a href="#">Creados</a></li>
                    <li onClick={() => filtrarBD("ALL")}><a href="#">Todos</a></li>
                </ul>
           </li>
           <li>
            <Link to ="/crearvideojuego">Agregar videojuego</Link>
           </li>
        </ul>
    </nav>
 

</div>


    );
  };
  
  function mapStateToProps(state) {
    return {
      generos: state.generos
    };
  }//Creo que esto no hace falta
  
  function mapDispatchToProps(dispatch) {
    return {
      ordenar: tipo => dispatch(ordenar(tipo)),
      filtrarGenero: genero => dispatch(filtrarGenero(genero)),
      filtrarBD: tipo => dispatch(filtrarBD(tipo))
    };
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav);
  