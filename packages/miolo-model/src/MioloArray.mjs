import CacheMixin from "./CacheMixin.mjs"

export default class MioloArray extends CacheMixin(Array) {
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

  last() {
    return this[this.length - 1]
  }

  get_data() {
    return [...this].map((i) => i.get_data())
  }

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

  find_by_id(id) {
    return this.find_by_field("id", id)
  }

  remove_by_field(field, value) {
    const fidx = this.find_index_by_field(field, value)
    if (fidx >= 0) {
      this.splice(fidx, 1)
    }
  }

  append(data) {
    const item = new this.itemClass(data)
    this[this.length] = item
    return item
  }
}
