import './App.css';
import { Route, Switch,Link,useLocation  } from 'react-router-dom';
import VideoJuegos from './components/VideoJuegos';
import Nav from './components/Nav';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {getVideoGames} from "./actions";
import loadingImage from "./55a4629ffc77f363e3ec1534b8a422-unscreen.gif";
import PagVideoJuego from './components/PagVideoJuego';
import FormVideoJuego from './components/FormVideoJuego';

function App({ordenando,videoGames,getVideoGames,isLoading}) {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const [videoJuegos, setvideoJuegos] = useState([]);
  const [pagina,setPagina] = useState(1)

  const reiniciar = function(){
    setPagina(1)
    getVideoGames()
  }

  useEffect(() =>{
    getVideoGames()
  },[])

  useEffect(() => {
    const videoJuegosNuevos = []
    let key = 0
    let limite_superior = pagina*15 > videoGames.length ? videoGames.length : pagina*15

    if(videoGames.length)
      for (let index = (pagina-1)*15; index < limite_superior; index++) {
        const elemento = videoGames[index];
        const generos = []
        if(elemento.genres)
          for (let index = 0; index < elemento.genres.length; index++) {
            generos.push(elemento.genres[index].name)
          }
        const elementoNuevo = {key: elemento.id,titulo:elemento.name,generos:generos,img:elemento.background_image}
        videoJuegosNuevos.push(elementoNuevo)
        
      }
    
    setvideoJuegos(videoJuegosNuevos)
  },[videoGames,isLoading,ordenando,pagina])





  const kingdom = [{titulo:"Kingdom Come deliverance",generos:["Drama","Accion"],img : "https://cdn1.epicgames.com/ca4058f18b0a4a9e9e2ccc28f7f33000/offer/EGS_WarhorseStudios_KingdomComeDeliverance_S3-1360x766-1e8502930c6282cb34acf7add01c6832a5bc217e.jpg"}]
  
  //videoJuegos.push(guiltyGear)
  //videoJuegos.push(guiltyGear)
  //videoJuegos.push(guiltyGear)
  //videoJuegos.push(guiltyGear)
  //videoJuegos.push(guiltyGear)
  //Deberia controlar que solo le envie 15, le envio los primeros 15, cuando se hace click en siguiente, le envio otros 15 y asi
  return (
    <div className="home">
      {/* <VideoJuego></VideoJuego> */}
      <Switch>
        <Route
          exact path = "/landing"
          >  
            <div className = "landing">
            <Link style={{textDecoration: 'none'}} to = "/home">
              <button className="boton-landing">Entrar a la pagina</button>
            </Link>
            </div>

            
          </Route>
          <Route
            exact path = "/home"
          >
            <Nav reiniciar= {reiniciar}/>

            {/* <button onClick={getVideoGames()}>boton...</button> */}
            {isLoading ? <div className='cargando'><img src={loadingImage}/></div>:<>
            <VideoJuegos videoJuegos={videoJuegos}/>
            <div className='paginado'>
              <button onClick={() => { 
                if(pagina > 1)
                setPagina(pagina-1)
                }} className="boton-pag">&#8249;</button>
                <h1 className='indicador-pagina'>{pagina}</h1>
              <button onClick={() => {
                console.log(pagina)
                if(pagina*15-1 < videoGames.length-1)
                  setPagina(pagina+1)
                }}className="boton-pag">&#8250;</button>
            </div>
            </>}
          </Route>
          <Route
            path="/home/videogame/:id"
          >
            <Nav reiniciar= {reiniciar}/>
            {/* hacer otro nav sin los filtros */}
            <PagVideoJuego reiniciar = {reiniciar} titulo="kingdom"/>
          </Route>
          <Route
            path = "/crearvideojuego"
          >
            <Nav reiniciar= {reiniciar}/>
            <FormVideoJuego/>
          </Route>
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videoGames: state.videoGames,
    isLoading: state.isLoading,
    ordenando: state.ordenando
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
