// Form.jsx
import './FormVideoJuego.css';
import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import {getVideoGames} from "../actions";

// const baseURL = "http://localhost:3001"
const baseURL= "https://videogames-bd.herokuapp.com"



const validate = function(input){
  let errors = {};
  if(!input.nombre){
      errors.nombre = 'El nombre de juego es obligatorio';
  }else if (["%","#","@","&","$"].some(elemento => input.nombre.includes(elemento))){
      errors.nombre = 'Nombre de juego invalido';
  }
  if(!input.descripcion){
      errors.descripcion = 'La descripcion es obligatoria';
  }
  if(input.lanzamiento && !validarFecha(input.lanzamiento)){
      errors.lanzamiento = 'La fecha de lanzamiento no puede superar la actual'
  }
  if(input.rating && input.rating > 5 || input.rating < 1){
      errors.rating = 'El rating va desde 1 hasta 5 puntos'
  }
  if(input.generos.length < 1){
      errors.generos = 'Se debe seleccionar al menos un genero'
  }
  if(input.plataformas.length < 1){
      errors.plataformas = 'Se debe seleccionar al menos una plataforma'
  }
  return errors
}



const validarFecha = function(value){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  return(today >= value)
}

export {validate,validarFecha}

function  Form({generos,getVideoGames}) {


    

    
      
    
    
      const [input,setInput] = React.useState({
        nombre: '',
        descripcion: '',
        generos: [],
        plataformas: []
      })
    
      const [errors,seterrors] = React.useState({})
      
      const [agregado,setAgregado] = React.useState(false)


      

      const handleInputChange = function(e) {
        if(e.target.type === "checkbox"){
            if(input[e.target.name].includes(e.target.value)){
                const filtrado = input[e.target.name].filter((elemento) => elemento != e.target.value)
                setInput({
                    ...input,
                    [e.target.name]:filtrado
                })
                seterrors(validate({
                    ...input,
                    [e.target.name]:filtrado
                    }))
            }else{
                setInput({
                    ...input,
                    [e.target.name]: [...input[e.target.name],e.target.value]
                })
                seterrors(validate({
                    ...input,
                    [e.target.name]: [...input[e.target.name],e.target.value]
                    }))
            }
        }else {
            setInput({
            ...input,
            [e.target.name]: e.target.value
            });
            seterrors(validate({
            ...input,
            [e.target.name] : e.target.value
            }))
        }
      }



      async function postearJuego(data){
        const respuesta = await fetch(baseURL+"/videogames",{
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
          })
          .then(data => alert("Juego agregado"))
          .then(data => getVideoGames())
          .then(data => setAgregado(true))
      }
      const handleSubmit = (event) => {
        input.plataformas = input.plataformas.join(",")
        postearJuego(input)
        event.preventDefault()
      }

    

    if(!agregado)
    return (
      <form onSubmit={handleSubmit}>
        <div className="pagina-form">
            <div className='contenedor-form'>
                <ul className='ul-form'>
                    <li className='item'>
                        <label>Nombre:&nbsp;&nbsp;&nbsp;</label>
                        <input type="text" name="nombre" value={input.nombre} onChange={handleInputChange}/>
                        {errors.nombre && (
                            <label className='danger'>&nbsp;{errors.nombre}</label>
                         )}
                    </li>
                    <li className='item-descripcion'>
                        <label >Descripcion:&nbsp;&nbsp;&nbsp;</label>
                        {/* <input type="textarea" name="nombre" size="50"/> */}
                        <textarea placeholder='Una breve descripcion del juego' name="descripcion" value={input.descripcion} onChange={handleInputChange}></textarea>
                        {errors.descripcion && (
                            <label className='danger'>&nbsp;{errors.descripcion}</label>
                         )}
                    </li>
                    <li className='item'>
                        <label >Lanzamiento:&nbsp;&nbsp;&nbsp;</label>
                        <input type="date" name="lanzamiento" value={input.lanzamiento} onChange={handleInputChange} />
                        {errors.lanzamiento && (
                            <label className='danger'>&nbsp;{errors.lanzamiento}</label>
                         )}
                         {/* esto me da un warning de form uncontrolled, no recuerdo bien la teoria esa, deberia repasarla */}
                    </li>
                    <li className='item'>
                        <label >Rating:&nbsp;&nbsp;&nbsp;</label>
                        <input type="number" step="0.01" id="totalAmt" name="rating" value={input.rating} onChange={handleInputChange}/>
                        {errors.rating && (
                            <label className='danger'>&nbsp;{errors.rating}</label>
                         )}
                    </li>
                    <li className='item'>
                        <div className='item-generos'>
                            <label >Generos:&nbsp;&nbsp;&nbsp;</label>
                            {generos.map(elemento => {return <><label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{elemento.nombre}</label><input type="checkbox" name="generos" value={elemento.nombre} onChange={handleInputChange}/></>})}
                        {errors.generos && (
                            <label className='danger'>&nbsp;{errors.generos}</label>
                         ) }
                        </div>
                    </li>
                    <li className='item'>
                        <label >Plataformas:&nbsp;&nbsp;&nbsp;</label>
                        <label>&nbsp;&nbsp;PC</label>
                        <input type="checkbox" name="plataformas" value="PC" onChange={handleInputChange}/>
                        <label>&nbsp;Playstation</label>
                        <input type="checkbox" name="plataformas" value="Playstation" onChange={handleInputChange}/>
                        <label>&nbsp;Xbox</label>
                        <input type="checkbox" name="plataformas" value="Xbox" onChange={handleInputChange}/>
                        <label>&nbsp;Nintendo</label>
                        <input type="checkbox" name="plataformas" value="Nintendo" onChange={handleInputChange}/>
                        <label>&nbsp;Android</label>
                        <input type="checkbox" name="plataformas" value="Android" onChange={handleInputChange}/>
                        <label>&nbsp;ios</label>
                        <input type="checkbox" name="plataformas" value="ios" onChange={handleInputChange}/>
                        {errors.plataformas && (
                            <label className='danger'>&nbsp;{errors.plataformas}</label>
                         ) }

                    </li>

                    <li className='item'>
                      {/* <Link to="/home" className='link'> */}
                        {/* el boton solo aparece si todos los campos son validos(hacer funcionalidad) */}
                        
                        {(JSON.stringify(errors) === JSON.stringify({}) && input.generos.length > 0) ? <input type="submit" value= "Agregar videojuego"></input> : <label className='danger'>Falta validar campos</label> }
                      {/* </Link> */}

                      
                    </li>
                </ul>
            </div>

        </div>
        ...
      </form>
    )
    else 
    return (
      <Link to="/home">Volver</Link>
    )
  }


  function mapStateToProps(state) {
    return {
      generos: state.generos
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
  )(Form);