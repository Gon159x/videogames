import React from 'react';
import SearchBar from './SearchBar.jsx'; 
import './Nav.css';
import {Link} from 'react-router-dom';  
import { connect } from 'react-redux';
import { ordenar,filtrarGenero,filtrarBD } from '../actions/index.js';
import {useEffect} from 'react';
import logo from "./favicon.ico"
import Loader from './Loader.jsx';

function Nav({filtrarBD,ordenar,reiniciar,generos,filtrarGenero,simplificado}) {
    useEffect(() =>{
    },[generos])
    let claseHome = ""
    let claseSearch = ""
    if(simplificado){
      claseHome = "simp"
      claseSearch = "searchsimp"
    }

    return (

<div>
    <nav>
        <ul>
            <li className= {claseHome} key={1} onClick={() => reiniciar()}><Link to="/home"><img style={{flex:1,flexWrap:'wrap'}} src={logo} className="logo-henry"/>Henry -VideoGames</Link></li>


      
            {/* cambiar a href por LINK */}
            
            {console.log(simplificado+"class")}
            {simplificado? <div></div>:<>
                <li key={2}><SearchBar /></li>
                <li key={3}><a href="#">Ordenar<i className="down"></i></a>
                  <ul>
                      <li key={4} onClick={() => ordenar({type:"name",orden:"asc"})}><a href="#">ABC ↑</a></li>
                      <li key={5} onClick={() => ordenar({type:"name",orden:"des"})}><a href="#">ABC ↓</a></li>
                      <li key={6} onClick={() => ordenar({type:"rating",orden:"asc"})}><a href="#">Rating ↑</a></li>
                      <li key={7} onClick={() => ordenar({type:"rating",orden:"des"})}><a href="#">Rating ↓</a></li>
                  </ul>
              </li>
            <li key={8}><a href="#">Generos<i className="down"></i></a>
                  <ul>
                  {generos ? generos.map((elemento,indice) => <li key={15+indice} onClick={() => filtrarGenero(elemento.nombre)}><a href="#">{elemento.nombre}</a></li>) : <li key={9}><Loader/></li>}
                  </ul>
            </li>
            <li key={10}><a href="#">Base de datos<i className="down"></i></a>
                  <ul>
                      <li key={11} onClick={() => filtrarBD("RAWG")} ><a href="#">RAWG</a></li>
                      <li key={12} onClick={() => filtrarBD("BD")}><a href="#">Creados</a></li>
                      <li key={13} onClick={() => filtrarBD("ALL")}><a href="#">Todos</a></li>
                  </ul>
            </li>
            <li key={14}>
              <Link to ="/crearvideojuego">Agregar videojuego</Link>
            </li>
            
            </>}
            
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
  