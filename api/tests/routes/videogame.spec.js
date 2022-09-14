/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const { request } = require('../../src/app.js');
const app = require('../../src/app.js');
const { Videojuego, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  nombre: 'Super Mario Bros',
  descripcion:"Esta bueno",
  plataformas:"Playstation",
};
const videogame2 = {
  nombre: 'Sapar Mario Bros',
  descripcion:"Esta bueno",
  plataformas:"Playstation",
};

describe('Videojuego routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videojuego.sync({ force: true })
    .then(() => {
    for(i = 0;i< 8;i++)  {
      Videojuego.create(videogame)
      Videojuego.create(videogame2)
    }
    }));
  describe('GET /videogames', () => {
    it('Deberia devolver la lista de VideoJuegos',async () => {
  
      const res = await session(app).get('/videogames')
      const body = res.body
      expect(res.body[0].nombre).to.equal('Super Mario Bros')
      expect(res.body[0].descripcion).to.equal("Esta bueno")
      expect(res.body[0].plataformas).to.equal("Playstation")
    })
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });

  describe('Get /videogames?name=',() =>{
    it('Obtiene los elementos que tengan la palabra buscada',async () =>{
      const res = await session(app).get('/videogames?name=Sapar')
      expect(res.body).to.have.length(8)
    })
  })

  describe('Get /videogame/{idVideogame}',() =>{
    it('Obtiene el detalle de un juego en particular', async () => {
      const res = await session(app).get('/videogames/1')
      body = res.body[0] 
      expect(body.id).to.equal(1)
      expect(body.nombre).to.equal('Super Mario Bros')
      expect(body.descripcion).to.equal('Esta bueno')
      expect(body.plataformas).to.equal('Playstation')
    })
  })
  describe('POST /videogames',() =>{
    it('Recibe los datos por body y lo crea en la base de datos', async() => {
      const res = await session(app).post('/videogames').send({nombre:"Gonza",descripcion:"Me gusta",plataformas:"Xbox"})
      expect(res.statusCode).to.equal(201)
      expect(res.body).to.contain({nombre:"Gonza",descripcion:"Me gusta",plataformas:"Xbox"})
    })
  })

});
