export default class Parser {
  
  parse_value_str(v, required= false, def= undefined) {
    if ((v==null) || (v==undefined)) {
      if (required) {
       throw `Wrong str value passed: ${v}`
      }
      return def
    }
  
    return v.toString()
  }
  
  parse_field_str(fields, name, required= false, def= undefined) {
    if ( ! (name in fields)) {
      if (required) {
       throw `Expected str value not passed for ${name}`
      }
      return def
    }
    return this.parse_value_str(fields[name], required, def)
  }
  
  parse_value_int(v, required= false, def= undefined) {
    let vi= parseInt(v)
    if ((vi==null) || (isNaN(vi))) {
      if (required) {
       throw `Wrong int value passed: ${v}`
      }
      return def
    }
  
    return vi
  }
  
  parse_field_int(fields, name, required= false, def= undefined) {
    if ( ! (name in fields)) {
      if (required) {
       throw `Expected int value not passed for ${name}`
      }
      return def
    }
    return this.parse_value_int(fields[name], required, def)
  }
  
  parse_value_float(v, required= false, def= undefined) {
    const vf= parseFloat(v)
    if ((vf==null) || (isNaN(vf))) {
      if (required) {
       throw `Wrong float value passed: ${v}`
      }
      return def
    }
  
    return v
  }
  
  parse_field_float(fields, name, required= false, def= undefined) {
    if ( ! (name in fields)) {
      if (required) {
       throw `Expected float value not passed for ${name}`
      }
      return def
    }
  
    return this.parse_value_float(fields[name], required, def) 
  }
  
  parse_value_bool(v, required= false, def= undefined) {
    if ((v==null) || (v==undefined)) {
      if (required) {
       throw `Wrong bool value passed for ${name}`
      }
      return undefined
    }
    if ( (v===true) || (v==='true') ||(v==='True') ||(v===1) ||(v==='1')) {
      return true
    }
    if ( (v===false) || (v==='false') ||(v==='False') ||(v===0) ||(v==='0')) {
      return false
    }
  
    return def
  }
  
  parse_field_bool(fields, name, required= false, def= undefined) {
    if ( ! (name in fields)) {
      if (required) {
       throw `Expected bool value not passed for ${name}`
      }
      return def
    }
  
    return this.parse_value_bool(fields[name], required, def) 
  }
  
  parse_value_obj(v, required= false, def= undefined) {
    if ((v==null) || (v==undefined)) {
      if (required) {
       throw `Wrong obj value passed: ${v}`
      }
      return def
    }
    if (Object.keys(v).length==0) {
      if (required) {
        throw `Empty obj value passed: ${v}`
      }
      return def
    }  
    if (typeof v != 'object') {
      throw `Wrong obj value passed: ${v}`
    }  
  
    return v
  }
  
  parse_field_obj(fields, name, required= false, def= undefined) {
    if ( ! (name in fields)) {
      if (required) {
       throw `Expected obj value not passed for ${name}`
      }
      return def
    }
    return this.parse_value_obj(fields[name], required, def)
  }
}
