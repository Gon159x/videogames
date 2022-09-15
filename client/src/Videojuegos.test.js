import { render, screen, cleanup } from '@testing-library/react';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import VideoJuegos from './components/VideoJuegos.jsx';


test('Sin datos deberia solo renderizar el mensaje adecuado', () => {
  render(
    <VideoJuegos videoJuegos={[]}/>
  );
  const contenedor = screen.getByTestId("videojuegos-0");
  expect(contenedor).toBeInTheDocument();
  expect(contenedor).toHaveTextContent('No hay videojuegos para cargar')
});

test('Deberia renderizar los juegos pasados por parametros', () => {
  const kingdom = {key:1 ,titulo:"Kingdom Come deliverance",generos:["Drama","Accion"],img : "https://cdn1.epicgames.com/ca4058f18b0a4a9e9e2ccc28f7f33000/offer/EGS_WarhorseStudios_KingdomComeDeliverance_S3-1360x766-1e8502930c6282cb34acf7add01c6832a5bc217e.jpg"}
  const kingdom2 = {key:2 ,titulo:"Kingdom Come deliverance",generos:["Drama","Accion"],img : "https://cdn1.epicgames.com/ca4058f18b0a4a9e9e2ccc28f7f33000/offer/EGS_WarhorseStudios_KingdomComeDeliverance_S3-1360x766-1e8502930c6282cb34acf7add01c6832a5bc217e.jpg"}
  const juegos = []
  juegos.push(kingdom)
  juegos.push(kingdom2)
  render(
    <BrowserRouter>
      <VideoJuegos videoJuegos={juegos}/>
    </BrowserRouter>
    
  );
  const contenedor = screen.getByTestId("videojuegos");
  expect(contenedor).toBeInTheDocument();
  const juego = screen.getByTestId("test1");
  expect(juego).toBeInTheDocument();
  const juego2 = screen.getByTestId("test2");
  expect(juego2).toBeInTheDocument();
  expect(juego2).toHaveTextContent("Kingdom Come deliverance")
  expect(juego2).toHaveTextContent("Drama")
});


test('Deberia renderizar que faltan parametros sino se envia un titulo', () => {
  const kingdom = {key:1 ,generos:["Drama","Accion"],img : "https://cdn1.epicgames.com/ca4058f18b0a4a9e9e2ccc28f7f33000/offer/EGS_WarhorseStudios_KingdomComeDeliverance_S3-1360x766-1e8502930c6282cb34acf7add01c6832a5bc217e.jpg"}
  const juegos = []
  juegos.push(kingdom)
  render(
    <BrowserRouter>
      <VideoJuegos videoJuegos={juegos}/>
    </BrowserRouter>
    
  );
  const contenedor = screen.getByTestId("videojuegos");
  expect(contenedor).toBeInTheDocument();
  const juego = screen.getByTestId("test1");
  expect(juego).toBeInTheDocument();
  expect(juego).toHaveTextContent("No se han enviado todas las props necesarias")
  
});