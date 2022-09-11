// Form.jsx
import './FormVideoJuego.css';

export default function  Form() {
    return (
      <form>
        <div className="pagina-form">
            <div className='contenedor-form'>
                <ul className='ul-form'>
                    <li className='item'>
                        <label>Nombre:&nbsp;&nbsp;&nbsp;</label>
                        <input type="text" name="nombre" />
                    </li>
                    <li className='item-descripcion'>
                        <label >Descripcion:&nbsp;&nbsp;&nbsp;</label>
                        {/* <input type="textarea" name="nombre" size="50"/> */}
                        <textarea placeholder='Una breve descripcion del juego'></textarea>
                    </li>
                    <li className='item'>
                        <label >Lanzamiento:&nbsp;&nbsp;&nbsp;</label>
                        <input type="date" name="nombre" />
                    </li>
                    <li className='item'>
                        <label >Rating:&nbsp;&nbsp;&nbsp;</label>
                        <input type="number" step="0.01" id="totalAmt"/>
                    </li>
                    <li className='item'>
                        <label >Generos:&nbsp;&nbsp;&nbsp;</label>
                        <label>Genero1</label>
                        <input type="checkbox" step="0.01" id="totalAmt" name="generos" value="genero1"/>
                        <label>Genero2</label>
                        <input type="checkbox" step="0.01" id="totalAmt" name="generos" value="genero1"/>
                    </li>
                    <li className='item'>
                        <label >Plataformas:&nbsp;&nbsp;&nbsp;</label>
                        <label>Plataforma1</label>
                        <input type="checkbox" step="0.01" id="totalAmt" name="generos" value="genero1"/>
                        <label>Plataforma2</label>
                        <input type="checkbox" step="0.01" id="totalAmt" name="generos" value="genero1"/>
                    </li>
                    <li className='item'>
                        <button>
                            Agregar videojuego
                        </button>
                    </li>
                </ul>
            </div>

        </div>
        ...
      </form>
    )
  }