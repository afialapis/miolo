export default class BaseCache {

  constructor() {
    this._cache = {}
  }


  get_from_cache_or_make(cache_key, make_callback) {
    if (this._cache[cache_key] === undefined) {
      const bound_callback = make_callback.bind(this)
      this._cache[cache_key] = bound_callback()
    }
    return this._cache[cache_key]
  }

  invalidate_cache(cache_key) {
    delete this._cache[cache_key]
  }
}


