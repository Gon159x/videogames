const { Router } = require('express');
const { Genero } = require('../db.js');
const router = Router();


router.post('/',async function(req,res){
    try{
    let {nombre} = req.body
    if(nombre){
        const genero = await Genero.create({nombre:nombre})
        res.status(201).send(genero)
    }else
        res.status(404).send('Falta enviar datos obligatorios')
    }catch(error){
        console.log(error)
    }

})

router.get('/',async function(req,res){
    try{
        let generos = await Genero.findAll()
        res.send(generos)
    }catch (error){
        console.log(error)
        res.send('Error: '+error)
    }
})

module.exports = router;