const { Videojuego, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videojuego model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videojuego.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videojuego.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videojuego.create({ name: 'Super Mario Bros' });
      });
      it('should throw an error if descripcion is null', (done) => {
        Videojuego.create({name:"Gonza"})
        .then(() => done(new Error("It requieres a descripcion")))
        .catch(() => done())
      });
    });
  });
});
