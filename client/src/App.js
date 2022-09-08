import './App.css';
import { Route, Switch,Link,useLocation  } from 'react-router-dom';
import VideoJuegos from './components/VideoJuegos';
import Nav from './components/Nav';

function App() {
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  const videoJuegos = [{titulo:"Kingdom Come deliverance",generos:["Drama","Accion"],img : "https://cdn1.epicgames.com/ca4058f18b0a4a9e9e2ccc28f7f33000/offer/EGS_WarhorseStudios_KingdomComeDeliverance_S3-1360x766-1e8502930c6282cb34acf7add01c6832a5bc217e.jpg"}]
  const guiltyGear = {titulo: "Guilty gear Strive",generos:["Pelea","Accion"],img:"https://areajugones.sport.es/wp-content/uploads/2022/08/guilty-gear-strive.jpg"}
  videoJuegos.push(guiltyGear)
  videoJuegos.push(guiltyGear)
  videoJuegos.push(guiltyGear)
  videoJuegos.push(guiltyGear)
  videoJuegos.push(guiltyGear)
  return (
    <div className={"App " + location}>
      {/* <VideoJuego></VideoJuego> */}
      <Switch>
        <Route
          exact path = "/landing"
          > 
            <Link style={{textDecoration: 'none'}} to = "/home">
              <button class="boton-landing">Entrar a la pagina</button>
            </Link>
            
          </Route>
          <Route
            path = "/home"
          >
            <Nav/>
            <VideoJuegos videoJuegos={videoJuegos}/>
          </Route>
      </Switch>
      
    </div>
  );
}

export default App;
