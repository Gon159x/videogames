import React from 'react';

import SearchBar from './SearchBar.jsx'; //podria usar un searchbar desde otro componente
import './Nav.css';
import {Link} from 'react-router-dom';  
import { connect } from 'react-redux';
import { ordenar } from '../actions/index.js';

function Nav({ordenar,reiniciar}) {
    return (
    //   <nav>
    //     <Link to ='/home'>
    //       <span>
    //         {/* <img id="logoHenry" src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" /> */}
    //         Henry - VideoGames
    //       </span>
    //     </Link>
    //     <Link  to = '/landing'>
    //       <span>
    //         Landing Page
    //       </span>
    //     </Link>
        
    //       {/* <SearchBar
    //           onSearch={onSearch}
    //         /> */}
        
          
    //   </nav>
    // <nav>
    //     <Link to = "/home">
    //         <h2>Henry - VideoGames</h2>
    //     </Link>
        
    //     <ul>
    //         <li><a href="#"><SearchBar/></a></li>
    //         <li>
    //             <Link to ='/home'>Home</Link>
    //         </li>
    //         <li>
    //             <Link to ='/landing'>LandingPage</Link>
    //         </li>
        
    //         <li><a href="#">Item 2</a></li>
            
    //     </ul>
    // </nav>

<div id="container">
    <nav>
        <ul>
            <li onClick={() => reiniciar()}><a href="/home">Henry -VideoGames</a></li>
            {/* cambiar a href por LINK */}
            <li><a href="#"><SearchBar/></a></li>
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
                    <li><a href="#">Deberia guardar en store todos los generos...</a></li>
                </ul>
           </li>
           <li><a href="#">Base de datos<i className="down"></i></a>
                <ul>
                    <li><a href="#">RAWG</a></li>
                    <li><a href="#">Creados</a></li>
                    <li><a href="#">Todos</a></li>
                </ul>
           </li>
           <li>
           <a href="#">Agregar videojuego</a>
           </li>
        </ul>
    </nav>
 

</div>


    );
  };
  
  function mapStateToProps(state) {
    return {
      videoGames: state.videoGames
    };
  }//Creo que esto no hace falta
  
  function mapDispatchToProps(dispatch) {
    return {
      ordenar: tipo => dispatch(ordenar(tipo))
    };
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nav);
  