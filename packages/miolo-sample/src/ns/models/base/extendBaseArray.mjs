// import { BaseCache } from './BaseCache.mjs'
// 
// export class BaseArray extends BaseCache {
//   // When extending Array, the way we use the constructor matters
//   //  in order to make  .filter() and other to work properly
//   //  https://stackoverflow.com/questions/67676044/filter-is-buggy-when-i-extend-the-array-class
//   //  To be sure, we will subclass .filter()
// 
//   // More info:
//   // http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
//   // https://stackoverflow.com/a/17866143
// 
//   constructor(data) {
//     super()
//     this.data = data || []
//   }
// 
//   get length() {
//     return this.data.length
//   }
// 
//   map(callback) {
//     let data = []
//     for (const [index,d] of this.data.entries()) {
//       data.push(callback(d, index))
//     }
//     return data
//   }
// 
//   filter(func) {
//     let data = []
//     for (const d of this.data) {
//       if (func(d)) {
//         data.push(d)
//       }
//     }
//     return data
//   }  
// 
//   get_data() {
//     return this.map(d => d.get_data())    
//   }
// 
//   sort(f) {
//     return this.data.sort(f)
//   }  
// 
// 
//   push(item) {
//     this.data.push(item)
//   }
// }


function BaseArray() {
  var arr = [ ]
  arr.push.apply(arr, arguments)
  arr.__proto__ = BaseArray.prototype
  arr.__cache__ = {}
  return arr
}

BaseArray.prototype = new Array

// Add custom functions here to BaseArray.prototype.
BaseArray.prototype.last = function() {
  return this[this.length - 1]
}

BaseArray.prototype.get_from_cache_or_make = function(cache_key, make_callback) {
  if (this.__cache__[cache_key] === undefined) {
    const bound_callback = make_callback.bind(this)
    this.__cache__[cache_key] = bound_callback()
  }
  return this.__cache__[cache_key]
}

BaseArray.prototype.invalidate_cache = function(cache_key) {
  delete this.__cache__[cache_key]
}

BaseArray.prototype.get_data = function() {
  return [...this].map(i => i.get_data())
}

BaseArray.prototype.find_by_field = function(field, value) {
  if (this.length>=0) {
    const filt = this.filter(elem => elem[field] === value)
    if (filt.length > 0) {
      return filt[0]
    }
  }
  return undefined
}



export default function extendBaseArray(name, itemClass, proto) {

  function BaseArrayChild() {
    var arr = [ ]

    var items = arguments[0]
    var extra = Array.prototype.slice.call(arguments, 1)
    arr.push.apply(arr, (items || []).map(r => new itemClass(r, ...extra)))

    arr.__proto__ = BaseArrayChild.prototype
    arr.__cache__ = {}
    return arr
  }
  
  BaseArrayChild.prototype = new Array
  
  for (var [f,c] of Object.entries(BaseArray.prototype)) {
    BaseArrayChild.prototype[f] = c
  }
  
  for (var [f,c] of Object.entries(proto)) {
    BaseArrayChild.prototype[f] = c
  }
  
  Object.defineProperty(BaseArrayChild, "name", {value: name});

  return BaseArrayChild

}

/*
class Expense2 {
  constructor(data, club) {
    this.data = data
    this.club= club
  }
}

const ExpenseList2 = extendBaseArray('ExpenseList2', Expense2, {
  hello1: function() {
    console.log('hi 1')
  }
})

var el = new ExpenseList2([1,2,3], {'name': 'The club'})
*/