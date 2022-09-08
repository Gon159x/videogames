import './App.css';
import { Route, Switch,Link,useLocation  } from 'react-router-dom';
import VideoJuegos from './components/VideoJuegos';
import Nav from './components/Nav';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {getVideoGames} from "./actions";

function App({videoGames,getVideoGames,isLoading}) {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const [videoJuegos, setvideoJuegos] = useState([]);//Sumandole redux, solo necesitaria esto para mostrar los videojuegos
  const [pagina,setPagina] = useState(1)//Quizas con redux solo necesite este campo.
  //usar use efect con la creacion de app para inicializar las cosas
  //const [visualizando,setVisualizando] = useState([])
  //En la creacion de la app primero setear en la base de datos todos los generos y ademas guardar en el estado
  //de app los 100 videojuegos de la api, ademas tener un estado que son los videojuegos que 
  //se muestran actualmente(15 por pagina)
  useEffect(() =>{
    getVideoGames()
  },[])

  useEffect(() => {
    const videoJuegosNuevos = []
    videoGames.map(elemento => {
      
      const generos = []
      for (let index = 0; index < elemento.genres.length; index++) {
        generos.push(elemento.genres[index].name)
      }
      const elementoNuevo = {titulo:elemento.name,generos:generos,img:elemento.background_image}

      videoJuegosNuevos.push(elementoNuevo)
    })
    setvideoJuegos(videoJuegosNuevos)
    console.log(videoJuegos)
  },[videoGames,isLoading])





  //const videoJuegos = [{titulo:"Kingdom Come deliverance",generos:["Drama","Accion"],img : "https://cdn1.epicgames.com/ca4058f18b0a4a9e9e2ccc28f7f33000/offer/EGS_WarhorseStudios_KingdomComeDeliverance_S3-1360x766-1e8502930c6282cb34acf7add01c6832a5bc217e.jpg"}]
  
  //videoJuegos.push(guiltyGear)
  //videoJuegos.push(guiltyGear)
  //videoJuegos.push(guiltyGear)
  //videoJuegos.push(guiltyGear)
  //videoJuegos.push(guiltyGear)
  //Deberia controlar que solo le envie 15, le envio los primeros 15, cuando se hace click en siguiente, le envio otros 15 y asi
  return (
    <div className={"App " + location}>
      {/* <VideoJuego></VideoJuego> */}
      <Switch>
        <Route
          exact path = "/landing"
          > 
            <Link style={{textDecoration: 'none'}} to = "/home">
              <button className="boton-landing">Entrar a la pagina</button>
            </Link>
            
          </Route>
          <Route
            path = "/home"
          >
            <Nav/>
            {/* <button onClick={getVideoGames()}>boton...</button> */}
            {isLoading ? <div>esperando...</div>: <VideoJuegos videoJuegos={videoJuegos}/>}
            
          </Route>
      </Switch>
      
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videoGames: state.videoGames,
    isLoading: state.isLoading
  };
}//Creo que esto no hace falta

function mapDispatchToProps(dispatch) {
  return {
    getVideoGames: () => dispatch(getVideoGames())
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
