import React from 'react';
import './VideoJuego.css';
import { Link } from 'react-router-dom';

export default function VideoJuego({id,titulo,generos,img,bd}) {
    //let generos = ["drama","accion"]
    //Agregar un if mas si se manda descripcion, fecha de lanzamiento y rating, o bien deberia agregar una pregunta de si 
    //es una consulta completa o parcial
    if(titulo)
        if(!bd)
            return (
                <Link to={'/home/videogame/'+id} className="link">
                    <div className='videoJuego-base'>
                        <div className='videoJuego'>
                                <img className='imagen' src={img} alt = 'la imagen no se pudo cargar'/>
                                <h3>{titulo}</h3>
                                <div className='generos'>
                                    {generos.map((c,indice) => <p key={indice}>{c}&nbsp;&nbsp;</p>)}
                                </div>
                        </div>
                    </div>
                    

                </Link>
                )
        else 
            return(<Link to={'/home/videogame/bd'+id} className="link">
                <div className='videoJuego-base'>
                    <div className='videoJuego'>
                        <img className='imagen' src={img} alt = 'la imagen no se pudo cargar'/>
                        <h3>{titulo}</h3>
                        <div className='generos'>
                            {generos.map((c,indice) => <p key={indice}>{c}&nbsp;&nbsp;</p>)}
                        </div>
                    </div>
                </div>
                

            </Link>)
    else 
        return(
            <div className='videoJuego'>
                <p>No se han enviado todas las props necesarias</p>
            </div>
        )
  };