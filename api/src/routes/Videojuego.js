const { Router } = require('express');
const { Videojuego, Genero } = require('../db.js');
const router = Router();


router.get('/',async function(req,res){
    try{
        let name = req.query.name
        let videoJuegos = await Videojuego.findAll()
        if(name){
            let temporal = []
            for (let index = 0; index < videoJuegos.length; index++) {
                const element = videoJuegos[index];
                if(element.nombre.includes(name))
                    temporal.push(element)
                if(temporal.length >= 15)
                    index = videoJuegos.length
            }
            videoJuegos = temporal
        }
        if(videoJuegos.length === 0){
            res.status(200)
            .send('No se encontraron videojuegos con ese nombre')
        }
        else{
            res.status(200)
            .send(videoJuegos)
        }
    }catch(error){
        console.log(error)
        res.sendStatus(400)
    }
})

router.get('/:idVideoGame',async function(req,res){
    try{
        let id = req.params.idVideoGame
        let videoJuego = await Videojuego.findAll({
            where: {
                id: id
            }
        })
        res.send(videoJuego)
    }catch(error){
        console.log(error)
        res.sendStatus(400)
    }
})


router.post('/',async function(req,res){
    try{
    // fetch(`https://api.rawg.io/api/games?key=f79ce3822058497090acd470ecd98a01`)
    // .then(r => r.json())
    // .then(r => console.log(r)) no me deja hacer fetch en el back :(
    let {nombre,descripcion,lanzamiento,rating,plataformas,generos} = req.body
    if(nombre && descripcion && plataformas){
        let agregar_bd = []
        const videojuego = await Videojuego.create({nombre:nombre,descripcion:descripcion,lanzamiento:lanzamiento,rating:rating,plataformas:plataformas})
        if(generos)
            for (let index = 0; index < generos.length; index++) {
                let element = generos[index].toLowerCase();
                let elemento = await Genero.findOne({
                    where: {
                        nombre: element
                    }
                })
                
                if(elemento)
                    videojuego.addGenero(elemento.id)
            }
        res.status(201).send(videojuego)
    }else
        res.status(404).send('Falta enviar datos obligatorios')
    }catch(error){
        console.log(error)
    }

})

module.exports = router;