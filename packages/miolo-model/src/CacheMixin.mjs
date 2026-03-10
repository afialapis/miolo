export default (BaseClass = class {}) =>
  class extends BaseClass {
    reset_cache() {
      this.__cache__ = {}
    }

    resetCache = this.reset_cache

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

    getFromCacheOrMake = this.get_from_cache_or_make

    invalidate_cache(cache_key) {
      if (this.__cache__ !== undefined) {
        delete this.__cache__[cache_key]
      }
    }

    invalidateCache = this.invalidate_cache
  }
