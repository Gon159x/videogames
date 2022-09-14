const { Videojuego, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videojuego model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validaciones', () => {
    beforeEach(() => Videojuego.sync({ force: true }));
    describe('Deberia tirar un error si algun campo obligatorio no es enviado', () => {
      it('Nombre', async () => {
        try{
          const data = await Videojuego.create({descripcion:"Esta bueno",plataformas:"Play"})
        }catch(error){
          expect(error.message).to.equal('notNull Violation: Videojuego.nombre cannot be null')
          }
        }); 
        it('Descripcion', async () => {
          try{
            const data = await Videojuego.create({nombre:"Esta bueno",plataformas:"Play"})
          }catch(error){
            expect(error.message).to.equal('notNull Violation: Videojuego.descripcion cannot be null')
            }
          }); 
          it('Plataformas', async () => {
            try{
              const data = await Videojuego.create({descripcion:"Esta bueno",nombre:"Play"})
            }catch(error){
              expect(error.message).to.equal('notNull Violation: Videojuego.plataformas cannot be null')
              }
            }); 
    });
    describe("Validaciones de campos",() =>{
      it('El id debe ser unico',async () => {
        const data1 = await Videojuego.create({nombre:"gonzalo",descripcion:"Esta bueno",plataformas:"Play"})
        const data2 = await Videojuego.create({nombre:"gonzalo",descripcion:"Esta bueno",plataformas:"Play"})
        const id1 = data1.toJSON().id
        const id2 = data2.toJSON().id
        expect(id1).to.not.equal(id2)
      })
      it('Deberia crear un juego si los campos son validos',async () => {
        const data = await Videojuego.create({nombre:"gonzalo",rating:3.5,lanzamiento:'10/10/2010',descripcion:"Esta bueno",plataformas:"Play"})
        const json = data.toJSON()
        expect(json).to.have.a.property('nombre')
        expect(json).to.have.a.property('rating')
        expect(json).to.have.a.property('lanzamiento')
        expect(json).to.have.a.property('descripcion')
        expect(json).to.have.a.property('plataformas')
      })
    })
  });
});
