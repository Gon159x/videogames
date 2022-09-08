import React from 'react';
import './VideoJuegos.css';

import VideoJuego from './VideoJuego.jsx';

export default function VideoJuegos({videoJuegos}) {

    if(videoJuegos)
        return (
            <div className='videoJuegos'>
            {videoJuegos.map(v =>
            <div className='espacio'>
                <VideoJuego
                titulo={v.titulo}
                generos={v.generos}
                img={v.img}
                />
            </div> )}
            </div>
        );
    else
        return(
            <div>No hay videojuegos</div>
        )
}
