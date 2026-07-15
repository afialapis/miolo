/**
 * @typedef {import("./MioloModel.mjs").default} MioloModel
 */

/**
 * Represents an array of MioloModel instances.
 * Inherits all native JS Array methods.
 *
 * @template {MioloModel} T
 * @extends {Array<T>}
 */
export default class MioloArray extends Array {
  /**
   * Create a new MioloArray.
   * @param {new (...args: any[]) => T} itemClass - The class of the items in the array.
   * @param {Array<T> | Array<Object>} items - The items to initialize the array with.
   * @param {...any} extra - Extra parameters to pass to the item class constructor.
   */
  constructor(itemClass, items = [], ...extra) {
    // Arrays can be inited with a number of elements or an array of items.
    // TypeScript requires a single top-level super() call when the class has class fields.
    super(typeof items === "number" ? items : 0)

    this.reset_cache()

    // Check properties
    if (!itemClass) {
      console.error(`[${this.constructor.name}] MioloArray received no itemClass`)
      return
    }
    /** @type {new (...args: any[]) => T} */
    this.itemClass = itemClass

    if (typeof items === "number") {
      return
    }

    items.forEach((r, index) => {
      this[index] =
        r !== undefined && r instanceof this.itemClass ? r : new this.itemClass(r || {}, ...extra)
    })
  }

  /**
   * Reset the model's cache.
   * @public
   */
  reset_cache() {
    this.__cache__ = {}
  }

  /**
   * Reset the model's cache.
   * @public
   */
  resetCache = this.reset_cache

  /**
   * Get a value from the model's cache.
   * @param {string} key - The key to get the value from.
   * @returns {any} The value from the cache.
   * @public
   */
  get_from_cache(key) {
    if (this.__cache__ === undefined) {
      return undefined
    }
    return this.__cache__[key]
  }

  /**
   * Get a value from the model's cache.
   * @param {string} key - The key to get the value from.
   * @returns {any} The value from the cache.
   * @public
   */
  getFromCache = this.get_from_cache

  /**
   * Set a value in the model's cache.
   * @param {string} key - The key to set the value to.
   * @param {any} value - The value to set.
   * @public
   */
  set_to_cache(key, value) {
    if (this.__cache__ === undefined) {
      this.__cache__ = {}
    }
    this.__cache__[key] = value
  }

  /**
   * Set a value in the model's cache.
   * @param {string} key - The key to set the value to.
   * @param {any} value - The value to set.
   * @public
   */
  setToCache = this.set_to_cache

  /**
   * Get a value from the model's cache or make it if it doesn't exist.
   * @param {string} cache_key - The key to get the value from.
   * @param {Function} make_callback - The function to make the value if it doesn't exist.
   * @returns {any} The value from the cache.
   * @public
   */
  get_from_cache_or_make(cache_key, make_callback) {
    if (this.__cache__ === undefined) {
      this.__cache__ = {}
    }
    if (this.__cache__[cache_key] === undefined) {
      const bound_callback = make_callback.bind(this)
      this.__cache__[cache_key] = bound_callback()
    }
    return this.__cache__[cache_key]
  }

  /**
   * Get a value from the model's cache or make it if it doesn't exist.
   * @param {string} cache_key - The key to get the value from.
   * @param {Function} make_callback - The function to make the value if it doesn't exist.
   * @returns {any} The value from the cache.
   * @public
   */
  getFromCacheOrMake = this.get_from_cache_or_make

  /**
   * Invalidate a value in the model's cache.
   * @param {string} cache_key - The key to invalidate.
   * @public
   */
  invalidate_cache(cache_key) {
    if (this.__cache__ !== undefined) {
      delete this.__cache__[cache_key]
    }
  }

  /**
   * Invalidate a value in the model's cache.
   * @param {string} cache_key - The key to invalidate.
   * @public
   */
  invalidateCache = this.invalidate_cache

  /**
   * Returns the last item in the array.
   * @returns {T} The last item in the array.
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
        const val = typeof elem.get_value === "function" ? elem.get_value(field) : elem[field]
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
   * @returns {T | undefined} The first item in the array that has the given field and value, or undefined if not found.
   * @public
   */
  find_by_field(field, value) {
    if (this.length >= 0) {
      const filt = this.filter((elem) => {
        const val = typeof elem.get_value === "function" ? elem.get_value(field) : elem[field]
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
   * @returns {T | undefined} The first item in the array that has the given field and value, or undefined if not found.
   * @public
   */
  findByField(field, value) {
    return this.find_by_field(field, value)
  }

  /**
   * Find the first item in the array that has the given id.
   * @param {string} id - The id to search for.
   * @returns {T | undefined} The first item in the array that has the given id, or undefined if not found.
   * @public
   */
  find_by_id(id) {
    return this.find_by_field("id", id)
  }

  /**
   * Find the first item in the array that has the given id.
   * @param {string} id - The id to search for.
   * @returns {T | undefined} The first item in the array that has the given id, or undefined if not found.
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
   * @param {T} data - The data to push to the array.
   * @returns {T} The new item.
   * @public
   */
  // biome-ignore lint/suspicious/noTsIgnore: ignore ts ignore
  // @ts-ignore - Override Array.push to return the item instead of the new length
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

    /** @type {new (data?: any) => any} */
    const Ctor = /** @type {any} */ (this.constructor)

    const clone = new Ctor(clonedData)
    // Object.assign(clone, this)
    return clone
  }

  /**
   * @param {(value: T, index: number, array: Array<T>) => boolean} predicate
   * @param {any} [thisArg]
   * @returns {this}
   */
  // @ts-expect-error
  filter(predicate, thisArg) {
    // @ts-expect-error
    return super.filter(predicate, thisArg)
  }

  /**
   * @template U
   * @param {(value: T, index: number, array: Array<T>) => U} callbackfn
   * @param {any} [thisArg]
   * @returns {Array<U>}
   */
  map(callbackfn, thisArg) {
    return super.map(callbackfn, thisArg)
  }

  /**
   * @param {number} [start]
   * @param {number} [end]
   * @returns {this}
   */
  // @ts-expect-error
  slice(start, end) {
    // @ts-expect-error
    return super.slice(start, end)
  }

  /**
   * @param {number} start
   * @param {number} [deleteCount]
   * @param {...T} items
   * @returns {this}
   */
  // @ts-expect-error
  // biome-ignore lint/correctness/noUnusedFunctionParameters: its ok
  splice(start, deleteCount, ...items) {
    // @ts-expect-error
    // biome-ignore lint/complexity/noArguments: its ok
    return super.splice.apply(this, arguments)
  }

  /**
   * @returns {this}
   */
  // @ts-expect-error
  reverse() {
    // @ts-expect-error
    return super.reverse()
  }
}
