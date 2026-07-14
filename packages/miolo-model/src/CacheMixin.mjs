export default (BaseClass = class {}) =>
  class extends BaseClass {

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
  }
