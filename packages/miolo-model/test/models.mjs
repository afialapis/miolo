import { MioloModel, MioloArray } from '../../src/index.mjs'

export class Flavour extends MioloModel {
  constructor(data) {
    super(data)
  }

  get id() {
    return this._get('id')
  }

  get name() {
    return this._get('name')
  }

  get texture() {
    return this._get('texture')
  }

  get strength() {
    return this._get('strength')
  }

  get color() {
    return this._get('color')
  }

  getStrengthScore() {
    return this.get_from_cache_or_make('strength_score', () => {
      // Expensive operation here conceptually
      const val = this._get('strength', 'W0').replace('W', '')
      return parseInt(val) * 2
    })
  }  
}

export class FlavourList extends MioloArray {
  constructor(items) {
    super(Flavour, items)
  }

  getTotalScore() {
    return this.get_from_cache_or_make('total_score', () => {
      // simulate expensive reduction
      return this.reduce((acc, curr) => acc + (curr.getStrengthScore()), 0)
    })
  }  
}

export class Bread extends MioloModel {
  constructor(data, storeFlavours) {
    super(data)
    this.storeFlavours = storeFlavours
  }

  get flavour() {
    return this.get_from_cache_or_make('flavour_model', () => {
      const flavourId = this._get('flavour_type')
      const flavourData = this.storeFlavours.find_by_id(flavourId)
      return flavourData ? flavourData : null
    })
  }
}

export class EmptyList extends MioloArray {
  constructor() {
    super(null, [])
  }
}

export class Bakery extends MioloModel {
  constructor(data) {
    super(data)
    // Store explicit array property of child models
    this.breads = new MioloArray(Bread, data.breads || [])
  }
}
