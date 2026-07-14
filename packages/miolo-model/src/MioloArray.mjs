import CacheMixin from "./CacheMixin.mjs"

export default class MioloArray extends CacheMixin(Array) {

  /**
   * Create a new MioloArray.
   * @param {Function} itemClass - The class of the items in the array.
   * @param {Array<MioloModel> | Array<Object>} items - The items to initialize the array with.
   * @param {...any} extra - Extra parameters to pass to the item class constructor.
   */  
  constructor(itemClass, items = [], ...extra) {
    // Arrays can be inited with a number
    if (typeof items === "number") {
      super(items)
      this.reset_cache()
      return
    }
    //
    super()
    this.reset_cache()

    // Check properties
    if (!itemClass) {
      console.error(`[${this.constructor.name}] MioloArray received no itemClass`)
      return
    }
    this.itemClass = itemClass

    items.forEach((r, index) => {
      this[index] =
        r !== undefined && r instanceof this.itemClass ? r : new this.itemClass(r || {}, ...extra)
    })
  }

  /**
   * Returns the last item in the array.
   * @returns {MioloModel} The last item in the array.
   * @public
   */  
  last() {
    return this[this.length - 1]
  }

  /**
   * Returns an Object data containing both:
   *   - the instance inner data
   *   - data from attriobutes of type MioloModel or MioloArray
   *       (attributes with prefix "__" are ignored).
   * @returns {Object} All the data of the instance.
   * @public
   */    
  get_data() {
    return [...this].map((i) => i.get_data())
  }

  /**
   * Returns an Object data containing both:
   *   - the instance inner data
   *   - data from attriobutes of type MioloModel or MioloArray
   *       (attributes with prefix "__" are ignored).
   * @returns {Object} All the data of the instance.
   * @public
   */    
  getData() {
    return [...this].map((i) => i.getData())
  }

  /**
   * Find the index of the first item in the array that has the given field and value.
   * @param {string} field - The field to search for.
   * @param {any} value - The value to search for.
   * @returns {number} The index of the first item that has the given field and value, or -1 if not found.
   * @public
   */
  find_index_by_field(field, value) {
    if (this.length >= 0) {
      const fidx = this.findIndex((elem) => {
        const val = typeof elem._get === "function" ? elem._get(field) : elem[field]
        return val === value
      })
      if (fidx >= 0) {
        return fidx
      }
    }
    return -1
  }

  /**
   * Find the index of the first item in the array that has the given field and value.
   * @param {string} field - The field to search for.
   * @param {any} value - The value to search for.
   * @returns {number} The index of the first item that has the given field and value, or -1 if not found.
   * @public
   */  
  findIndexByField(field, value) {
    return this.find_index_by_field(field, value)
  }

  /**
   * Find the first item in the array that has the given field and value.
   * @param {string} field - The field to search for.
   * @param {any} value - The value to search for.
   * @returns {MioloModel} The first item in the array that has the given field and value, or undefined if not found.
   * @public
   */  
  find_by_field(field, value) {
    if (this.length >= 0) {
      const filt = this.filter((elem) => {
        const val = typeof elem._get === "function" ? elem._get(field) : elem[field]
        return val === value
      })
      if (filt.length > 0) {
        return filt[0]
      }
    }
    return undefined
  }

  /**
   * Find the first item in the array that has the given field and value.
   * @param {string} field - The field to search for.
   * @param {any} value - The value to search for.
   * @returns {MioloModel} The first item in the array that has the given field and value, or undefined if not found.
   * @public
   */   
  findByField(field, value) {
    return this.find_by_field(field, value)
  }

  /**
   * Find the first item in the array that has the given id.
   * @param {string} id - The id to search for.
   * @returns {MioloModel} The first item in the array that has the given id, or undefined if not found.
   * @public
   */  
  find_by_id(id) {
    return this.find_by_field("id", id)
  }

  /**
   * Find the first item in the array that has the given id.
   * @param {string} id - The id to search for.
   * @returns {MioloModel} The first item in the array that has the given id, or undefined if not found.
   * @public
   */   
  findById(id) {
    return this.find_by_id(id)
  }

  /**
   * Remove the first item in the array that has the given field and value.
   * @param {string} field - The field to search for.
   * @param {any} value - The value to search for.
   * @public
   */  
  remove_by_field(field, value) {
    const fidx = this.find_index_by_field(field, value)
    if (fidx >= 0) {
      this.splice(fidx, 1)
    }
  }

  /**
   * Remove the first item in the array that has the given field and value.
   * @param {string} field - The field to search for.
   * @param {any} value - The value to search for.
   * @public
   */   
  removeByField(field, value) {
    return this.remove_by_field(field, value)
  }

  /**
   * Push a new item to the end of the array.
   * @param {Object} data - The data to push to the array.
   * @returns {MioloModel | Object} The new item.
   * @public
   */    
  push(data) {
    const item =
      data !== undefined && data instanceof this.itemClass ? data : new this.itemClass(data)
    this[this.length] = item
    return item
  }

  /**
   * Creates a shallow clone of the model.
   * @returns {MioloArray} A shallow clone of the model.
   * @public
   */    
  clone() {
    const currentData = this.getData()
    const clonedData = JSON.parse(JSON.stringify(currentData))
    const clone = new this.constructor(clonedData)
    // Object.assign(clone, this)
    return clone
  }
}
