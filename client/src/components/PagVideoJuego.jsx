import React, { useEffect, useState } from 'react';
import './PagVideoJuego.css';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import { buscarVideoJuego } from '../actions';
import { connect } from 'react-redux';


function VideoJuego({videoGame,buscarVideoJuego,reiniciar}) {
    //let generos = ["drama","accion"]
    //Agregar un if mas si se manda descripcion, fecha de lanzamiento y rating, o bien deberia agregar una pregunta de si 
    //es una consulta completa o parcial
    
    const [id, setId] = useState(useParams().id);

    useEffect(() =>{
        buscarVideoJuego(id)
    },[])

    const eliminarComa = function(arreglo){
        let ultimo = arreglo[arreglo.length-1]
        ultimo = ultimo.slice(0,-2)
        arreglo = arreglo.slice(0,-1)
        arreglo.push(ultimo)
        //todo este lio para sacar una coma jaj, poniendo una condicion en el map tambien era complicado je
        return arreglo
    }


    if(JSON.stringify(videoGame) !== JSON.stringify({})){
        let plataformas = ""
        let generos = ""
        if(videoGame.parent_platforms){
            plataformas = videoGame.parent_platforms.map(elemento => elemento.platform.name)
            plataformas = plataformas.map(elemento => elemento + ", ")
            plataformas = eliminarComa(plataformas)
        }
        if(videoGame.genres){
            generos = videoGame.genres.map(elemento => elemento.name)
            generos = generos.map(elemento => elemento + ", ")
            generos = eliminarComa(generos)
        }
        
        return (
            <body className='body-especial'>
            <div className='pagina'>
                <div className='contenedor'>
                    <h1>{videoGame.name}</h1>
                    <div className='separador'>
                        <img className='imagen-pagina' src={videoGame.background_image}></img>
                        <ul className='datos'>
                            <li><p>{videoGame.description_raw}</p></li>
                            <li><h3>Fecha de lanzamiento: {videoGame.released}</h3></li>
                            <li><h3>Rating: {videoGame.rating}</h3></li>
                            <li><h3>Plataformas: {plataformas}</h3></li>
                            <li><h3>Generos: {generos}</h3></li>
                        </ul>
                    </div>
                </div>
                
            </div>
            </body>


        
        )}
    else {
        return(
            <div className='probando'>
                estoy por acasjdlajdiwajdlsia
            </div>
        )}
  };



  function mapStateToProps(state) {
    return {
      videoGame: state.videoGamesDetail
    };
  }//Creo que esto no hace falta
  
  function mapDispatchToProps(dispatch) {
    return {
        buscarVideoJuego: id => dispatch(buscarVideoJuego(id))
    };
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(VideoJuego);