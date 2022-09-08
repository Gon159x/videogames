import React from 'react';
import './VideoJuego.css';

export default function VideoJuego({titulo,generos,img}) {
    //let generos = ["drama","accion"]

    if(titulo && img && generos)
    return (
        <div className='videoJuego'>
            <img className='imagen' src={img} alt = 'la imagen no se pudo cargar'/>
            <h3>{titulo}</h3>
            <div className='generos'>
            <p className='texto-generos'>Generos:</p> {generos.map(c => <p>{c}&nbsp;&nbsp;</p>)}
            </div>
        
        </div>)
    else 
        return(
            <div className='videoJuego'>
                <p>No se han enviado todas las props necesarias</p>
            </div>
        )
  };