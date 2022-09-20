import './App.css';
import { Route, Switch,Link,useLocation  } from 'react-router-dom';
import VideoJuegos from './components/VideoJuegos';
import Nav from './components/Nav';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import {getGeneros, getVideoGames} from "./actions";
import loadingImage from "./55a4629ffc77f363e3ec1534b8a422-unscreen.gif";
import PagVideoJuego from './components/PagVideoJuego';
import FormVideoJuego from './components/FormVideoJuego';
import Loader from './components/Loader';


 //const baseURL = "http://localhost:3001"
const baseURL= "https://videogames-bd.herokuapp.com"


function App({generos,getGeneros,ordenando,videoGames,getVideoGames,isLoading}) {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const [videoJuegos, setvideoJuegos] = useState([]);
  const [pagina,setPagina] = useState(1)

  async function postearGenero(data){
  const respuesta = await fetch(baseURL+"/genres",{
  method:'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
  })
  }


  const reiniciar = function(){
    setPagina(1)
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
        const elementoNuevo = {baseDatos:elemento.baseDatos,key: elemento.id,titulo:elemento.name,generos:generos,img:elemento.background_image}
        videoJuegosNuevos.push(elementoNuevo)
        
      }
    
    setvideoJuegos(videoJuegosNuevos)
  },[videoGames,generos,isLoading,ordenando,pagina])





  //const kingdom = [{titulo:"Kingdom Come deliverance",generos:["Drama","Accion"],img : "https://cdn1.epicgames.com/ca4058f18b0a4a9e9e2ccc28f7f33000/offer/EGS_WarhorseStudios_KingdomComeDeliverance_S3-1360x766-1e8502930c6282cb34acf7add01c6832a5bc217e.jpg"}]
  
  return (
    <div className="home">
      <Switch>
        <Route
          exact path = "/landing"
          >  
            <div className = "landing" >
            <Link style={{textDecoration: 'none'}} to = "/home">
              <button className="boton-landing">Entrar a la pagina</button>
            </Link>
            </div>

            
          </Route>
          <Route
            exact path = "/home"
          >
            <Nav reiniciar={reiniciar} simplificado={false}/>
            {isLoading ? 
            <div className='cargando'><Loader/></div>
            :<>
            <VideoJuegos videoJuegos={videoJuegos}/>
            <div className='paginado'>
              <button onClick={() => { 
                if(pagina > 1)
                setPagina(pagina-1)
                }} className="boton-pag">&#8249;</button>
                <h1 className='indicador-pagina'>{pagina}</h1>
              <button onClick={() => {
                if(pagina*15-1 < videoGames.length-1)
                  setPagina(pagina+1)
                }}className="boton-pag">&#8250;</button>
            </div>
            </>}
          </Route>
          <Route
            path="/home/videogame/:id"
          >
            <Nav reiniciar= {reiniciar} simplificado={true}/>
            <PagVideoJuego reiniciar = {reiniciar} titulo="kingdom"/>
          </Route>
          <Route
            path = "/crearvideojuego"
          >
            <Nav reiniciar= {reiniciar} simplificado={true}/>
            <FormVideoJuego/>
          </Route>
      
          <Route
            path = "/agregado"
          >
            
            <h1>Juego agregado</h1>
          </Route>
      </Switch>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videoGames: state.filtrados,
    isLoading: state.isLoading,
    ordenando: state.ordenando,
    generos: state.generos
  };
}//Creo que esto no hace falta

function mapDispatchToProps(dispatch) {
  return {
    getVideoGames: () => dispatch(getVideoGames()),
    getGeneros: () => dispatch(getGeneros())
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
