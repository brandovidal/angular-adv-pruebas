import { usuarioIngresado } from "./booleanos"

describe('Prubeas de booleanos', () => {
  it('Debe de retornar true', () => {
    const res = usuarioIngresado()
    expect(res).not.toBeTruthy()
  })
})
