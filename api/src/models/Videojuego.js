const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videojuego', {
    id:{
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    lanzamiento:{
      type:DataTypes.DATEONLY
    },
    rating:{
      type:DataTypes.FLOAT
    },
    plataformas:{
      //type:DataTypes.ENUM('Playstation','Xbox','PC','Wii','Nintendo','Celular'),
      type: DataTypes.TEXT,
      allowNull:false
    }
  },{
    autoIncrement: 10000,
    timestamps: false
    
  });
};
