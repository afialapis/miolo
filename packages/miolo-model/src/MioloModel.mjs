import CacheMixin from "./CacheMixin.mjs"
import MioloArray from "./MioloArray.mjs"

export default class MioloModel extends CacheMixin() {
  /**
   * Initialize a new MioloModel.
   * Notice the attributes you set to your instance may be handled by MioloModel:
   *   - if you set an attribute of type MioloModel or MioloArray, it will be taken by get_data() / getData() methods
   *   - if you want an attribute of type MioloModel or MioloArray to be ignored by get_data() / getData() methods, you can prefix it with "__" (e.g. __my_attr)
   * @param {Object} data - The data to initialize the model with.
   */
  constructor(data) {
    super()
    this.data = data
    this.reset_cache()
  }

  /**
   * Get a value from the model's data.
   * @param {string} field - The field to get the value from.
   * @param {any} def - The default value to return if the field is not found.
   * @returns {any} The value from the model's data.
   * @public
   */
  get_value(field, def) {
    if (this.data !== undefined) {
      if (this.data[field] !== undefined && this.data[field] !== null) {
        return this.data[field]
      }
    }
    return def
  }

  /**
   * Get a value from the model's data.
   * @param {string} field - The field to get the value from.
   * @param {any} def - The default value to return if the field is not found.
   * @returns {any} The value from the model's data.
   * @public
   * @deprecated Use get_value() instead.
   */  
  _get(field, def) {
    return this.get_value(field, def)
  }

  /**
   * Set a value in the model's data.
   * @param {string} field - The field to set the value to.
   * @param {any} val - The value to set.
   * @public
   */
  set_value(field, val) {
    if (this.data === undefined) {
      this.data = {}
    }
    this.data[field] = val
  }

  /**
   * Set a value in the model's data.
   * @param {string} field - The field to set the value to.
   * @param {any} val - The value to set.
   * @public
   * @deprecated Use set_value() instead.
   */  
  _set(field, val) {
    this.set_value(field, val)
  }

  /**
   * Returns an Object data corresponding to MioloModel and MioloArray instances attributes of this instance.
   * Attributes with prefix "__" are ignored.
   * @returns {Object} The extra data from the model.
   * @private
   */
  _get_extra_data() {
    const data = {}
    for (const [key, value] of Object.entries(this)) {
      if (key.startsWith("__")) {
        continue
      }
      if (value instanceof MioloModel || value instanceof MioloArray) {
        data[key] = value.get_data()
      } else if (Array.isArray(value) && value.every((v) => v instanceof MioloModel)) {
        data[key] = value.map((v) => v.get_data())
      }
    }
    return data
  }

  /**
   * Returns an Object data corresponding to MioloModel and MioloArray instances attributes of this instance.
   * Attributes with prefix "__" are ignored.
   * @returns {Object} The extra data from the model.
   * @private
   */  
  _getExtraData() {
    const data = {}
    for (const [key, value] of Object.entries(this)) {
      if (key.startsWith("__")) {
        continue
      }
      if (value instanceof MioloModel || value instanceof MioloArray) {
        data[key] = value.getData()
      } else if (Array.isArray(value) && value.every((v) => v instanceof MioloModel)) {
        data[key] = value.map((v) => v.getData())
      }
    }
    return data
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
    const extra = this._get_extra_data() || {}
    return {
      ...this.data,
      ...extra
    }
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
    const extra = this._getExtraData() || {}
    return {
      ...this.data,
      ...extra
    }
  }

  /**
   * Update the model's inner data with changes.
   * It resetes model's inner cache.
   * Does the same (updating data and resetting cache) for nested MioloModel or MioloArray attributes
   *  (ignoring those prefixed with "__").
   * @param {Object} changes - The changes to apply to the model.
   * @public
   */
  update(changes) {
    this.reset_cache()

    if (this.data === undefined) {
      this.data = {}
    }
    this.data = {
      ...this.data,
      ...changes
    }

    for (const [key, value] of Object.entries(this)) {
      if (key.startsWith("__")) {
        continue
      }
      if (value instanceof MioloModel) {
        if (changes[key] !== undefined) {
          value.update(changes[key])
        }
      }
    }
  }

  /**
   * Update the model's inner data by merging another model's data with it.
   * It resetes model's inner cache.
   * Does the same (updating data and resetting cache) for nested MioloModel or MioloArray attributes
   *  (ignoring those prefixed with "__").
   * @param {Object} model - The model to merge with.
   * @public
   */  
  merge(model) {
    this.update(model.getData())
    for (const [key, value] of Object.entries(model)) {
      if (key.startsWith("__")) {
        continue
      }
      if (value instanceof MioloModel || value instanceof MioloArray) {
        this[key] = value
      } else if (Array.isArray(value) && value.every((v) => v instanceof MioloModel)) {
        this[key] = value
      }
    }
  }

  /**
   * Creates a shallow clone of the model.
   * @returns {MioloModel} A shallow clone of the model.
   * @public
   */  
  clone() {
    const currentData = this.getData()
    const clonedData = JSON.parse(JSON.stringify(currentData))

    const clone = new this.constructor(clonedData)

    //Object.assign(clone, this)

    return clone
  }
}
