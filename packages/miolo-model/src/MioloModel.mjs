import CacheMixin from "./CacheMixin.mjs"
import MioloArray from "./MioloArray.mjs"

export default class MioloModel extends CacheMixin() {
  constructor(data) {
    super()
    this.data = data
    this.reset_cache()
  }

  _get(field, def) {
    if (this.data !== undefined) {
      if (this.data[field] !== undefined && this.data[field] !== null) {
        return this.data[field]
      }
    }
    return def
  }

  _set(field, val) {
    if (this.data === undefined) {
      this.data = {}
    }
    this.data[field] = val
  }

  get_extra_data() {
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

  getExtraData() {
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

  get_data() {
    const extra = this.get_extra_data() || {}
    return {
      ...this.data,
      ...extra
    }
  }

  getData() {
    const extra = this.getExtraData() || {}
    return {
      ...this.data,
      ...extra
    }
  }

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

  clone() {
    const currentData = this.getData()
    const clonedData = JSON.parse(JSON.stringify(currentData))

    const clone = new this.constructor(clonedData)

    Object.assign(clone, this)

    return clone
  }
}
