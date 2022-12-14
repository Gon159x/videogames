import React from 'react';
import './VideoJuegos.css';

import VideoJuego from './VideoJuego.jsx';

export default function VideoJuegos({videoJuegos}) {
    if(videoJuegos.length > 0)
        return (
            <div className='videoJuegos' data-testid="videojuegos">
            {videoJuegos.map(v =>
            <div className='espacio' data-testid={"test"+v.key} key = {v.key}>
                <VideoJuego
                id = {v.key}
                bd = {v.baseDatos}
                titulo={v.titulo}
                generos={v.generos}
                img={v.img}
                />
            </div> )}
            </div>
        );
    else{
        return(
            <div data-testid="videojuegos-0">No hay videojuegos para cargar</div>
        )}
}
