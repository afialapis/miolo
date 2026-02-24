import { Flavour } from '../models.mjs'
import { FLAVOUR_TYPES } from '../data.mjs'

const expect = global.expect

export default function test_model_basic() {

  describe('MioloModel basic methods', () => {
    const flavourData = FLAVOUR_TYPES[0]
    
    it('constructor', () => {
      const flavour = new Flavour(flavourData)
      expect(flavour.data).to.deep.equal(flavourData)
    })

    it('_get', () => {
      const flavour = new Flavour(flavourData)
      expect(flavour._get('name')).to.equal('Trigo Blanco')
      expect(flavour._get('non_existent', 'default_value')).to.equal('default_value')
    })

    it('_set', () => {
      const flavour = new Flavour({...flavourData})
      flavour._set('name', 'Trigo Especial')
      expect(flavour._get('name')).to.equal('Trigo Especial')

      // test _set on empty object
      const emptyModel = new Flavour()
      emptyModel._set('new_prop', 123)
      expect(emptyModel._get('new_prop')).to.equal(123)
    })

    it('get_extra_data (empty by default on basic model)', () => {
      const flavour = new Flavour(flavourData)
      expect(flavour.get_extra_data()).to.deep.equal({})
    })

    it('get_data', () => {
      const flavour = new Flavour(flavourData)
      expect(flavour.get_data()).to.deep.equal(flavourData)
    })

    it('update', () => {
      const flavour = new Flavour({...flavourData})
      flavour.update({
        strength: 'W150',
        color: 'Gris'
      })
      
      expect(flavour._get('strength')).to.equal('W150')
      expect(flavour._get('color')).to.equal('Gris')

      // ensure old untouched fields are intact
      expect(flavour._get('name')).to.equal('Trigo Blanco')

      // update when data is undefined
      const emptyModel = new Flavour()
      emptyModel.update({ test: 'val' })
      expect(emptyModel._get('test')).to.equal('val')
    })
  })
}
