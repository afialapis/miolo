export default (BaseClass) => class extends BaseClass {
  reset_cache() {
    this.__cache__ = {}
  }
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

  invalidate_cache(cache_key) {
    if (this.__cache__ !== undefined) {
      delete this.__cache__[cache_key]
    }
  }  
}
