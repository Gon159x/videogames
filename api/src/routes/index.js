const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const modelVideojuego = require('./Videojuego.js')
const modelGenero = require('./Genero.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames',modelVideojuego)
router.use('/genres',modelGenero)

module.exports = router;
