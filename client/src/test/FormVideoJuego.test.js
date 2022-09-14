import { validate } from "../components/FormVideoJuego";

describe('Function validate',() =>{
    let input
    beforeAll(() => input = {})
    describe('Debe validar los campos',()=>{
        it('Debe tener un nombre valido',() =>{
            input.nombre = "alguncar%%$#acterinvalido"
            errors = validate(input)
            expect(errors.nombre).toBe('Nombre de juego invalido')
        })//No puedo hacer test aca :()

    })
})