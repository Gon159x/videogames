import React from 'react';
import './VideoJuego.css';
import { Link } from 'react-router-dom';
import { NavigateFunction, useLocation, useNavigate, useParams } from "react-router";


export default function VideoJuego({titulo,generos,img,descripcion,lanzamiento,rating,plataformas}) {
    //let generos = ["drama","accion"]
    //Agregar un if mas si se manda descripcion, fecha de lanzamiento y rating, o bien deberia agregar una pregunta de si 
    //es una consulta completa o parcial
    console.log(useParams())
    if(titulo)
    return (
            <div className='videoJuego'>
                <img className='imagen' src={img} alt = 'la imagen no se pudo cargar'/>
                <h3>{titulo}</h3>
                <div className='generos'>
                    <p className='texto-generos'>Generos:</p> {
                    generos ? generos.map(c => <p>{c}&nbsp;&nbsp;</p>) : null}
                    <p></p>
                </div>
            </div>

        
        )
    else {
        return(
            <div className='probando'>
                estoy por acasjdlajdiwajdlsia
            </div>
        )}
  };