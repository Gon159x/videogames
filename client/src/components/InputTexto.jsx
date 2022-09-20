import React from 'react';
import './InputTexto.css';


export default function InputTexto({texto,name, value,onchangetexto,tipo}) {


    return (
        <div class="group">
            <input required="" type={tipo} class="in" name={name} value={value} onChange={() => onchangetexto}/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label className='label'>{texto}</label>
        </div>

    );
  };
  

  
  