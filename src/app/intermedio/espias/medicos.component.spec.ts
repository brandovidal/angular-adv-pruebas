import { EMPTY, from, throwError } from 'rxjs';

import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';

describe('MedicosComponent', () => {

    let componente: MedicosComponent;
    const servicio = new MedicosService(null)

    beforeEach( () => {
      componente = new MedicosComponent(servicio)
    });


    it('Init debe de cargar los medicos', () => {
      spyOn(servicio, 'getMedicos').and.callFake(() => {
        const medicos = ['medico1', 'medico2', 'medico3']
        return from([medicos])
      })

      componente.ngOnInit()

      expect(componente.medicos.length).toBeGreaterThan(0)
    });

    it('Debe llamar al servidor para llamar al medico', () => {
      const espia = spyOn(servicio, 'agregarMedico').and.callFake(() => {
        return EMPTY
      })

      componente.agregarMedico()
      expect(espia).toHaveBeenCalled()
    })

    it('Debe de agregar un nuevo medico al areglo de medicos', () => {
      const medico = {id: 1, nombre: 'Juan'}

      spyOn(servicio, 'agregarMedico').and.returnValue(from([medico]))

      componente.agregarMedico()
      expect(componente.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0)
    })

    it('Si falla la adicion, la propiedad mensajeError, debe ser igual al error del servicio', () => {
      const error = 'nose pudo agregar el medico'

      spyOn(servicio, 'agregarMedico').and.returnValue(throwError(error))

      componente.agregarMedico()
      expect(componente.mensajeError).toBe(error)
    })

    it('Debe llamar al servidor para borrar un medico', () => {
      spyOn(window, 'confirm').and.returnValue(true)

      const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY)

      componente.borrarMedico('1')
      expect(espia).toHaveBeenCalledWith('1')
    })


    it('No debe llamar al servidor para borrar un medico', () => {
      spyOn(window, 'confirm').and.returnValue(false)

      const espia = spyOn(servicio, 'borrarMedico').and.returnValue(EMPTY)

      componente.borrarMedico('1')
      expect(espia).not.toHaveBeenCalledWith('1')
    })
});
