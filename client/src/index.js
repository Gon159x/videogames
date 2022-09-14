import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from "./store/index.js";
import { Provider } from "react-redux";

const baseURL= "https://videogames-bd.herokuapp.com"
//const baseURL = "http://localhost:3001"
export {baseURL};
// async function postearGenero(data){
//   const respuesta = await fetch("http://localhost:3001/genres",{
//   method:'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
//   })
// }

// fetch("https://api.rawg.io/api/genres?key=f79ce3822058497090acd470ecd98a01")
// .then(data => data.json())
// .then(data => data.results.map(elemento => elemento))
// .then(data => data.forEach(elemento => {
//   postearGenero({id:elemento.id,nombre:elemento.name})
//   }
// ))

// const data = {
//   nombre:"dwa",
//   descripcion:"dw",
//   generos:["racing"],
//   plataformas: "Playstation"
// }

// fetch("http://localhost:3001/videogames",{
//   method:'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
//   })
//   .then(data => console.log(data.json()))

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
