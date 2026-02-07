/**
 * 
 * @param {*} filter An object like
 *   {field1: 10, field2: 'HEY', field3: [1, 2, 3], ...}
 * @param {*} modifiers Optionally modify how fields will be filtered
 *   {
 *     <field_name>: {alias: '', coalesce: true|false|'', op: =|~*|... 
 *   }
 *     alias: the alias in the query for that filter ('s.id', 'table.field1', ...)
 *            <field_name> will be the default
 *     coalesce: if you want to apply some COALESCE on the filter.
 *               For example, if true, result of filter is:
 *               ' AND COALESCE(<alias>, TRUE) IS <value> '
 *     op: By default. the operator to use will be taken based on the value's type:
 *         If array  : ' AND <alias> IN ($1:CSV) '
 *         If boolean: ' AND <alias> IS TRUE/FALSE '
 *         If others : ' AND <alias> = $1 '
 *         You may need another one, for example: {op: '~*}:
 *                     ' AND <alias> ~* $1 '
 * @param {*} options Optional:
 *     {
 *       fields: ['field1', 'field2'] 
 *               Only fields specified here will be taken from <filter> 
 *       startWithWhere: If true (default), returned `where` will be 'WHERE ...'.
 *                       If false, it will start like 'AND ...'
 *     }
 * 
 * @returns 
 *   [where, values]
 *
 * 
 * @example
 *   make_query_filter({'a': 10, 'b': [1,2,3], 'c': '11111', 'd': false}, {'d': {'alias': 'DEDO', 'coalesce': true}}) 
 *     [
 *        "  WHERE  a = $1  AND  b IN ($2:csv)   AND  c = $3  AND  COALESCE(DEDO, TRUE)  IS FALSE ",
 *        [10, [1,2,3], '11111']
 *     ]
 * 
 */
export const make_query_filter = (filter, modifiers= {}, options= {}) => {
  let where= '', values= []

  if (filter) {
    const startWithWhere= options?.startWithWhere !== false

    let filter_fields = Object.keys(filter)
    if (options?.fields) {
      filter_fields = filter_fields.filter(f => options.fields.indexOf(f)>=0)
    }

    filter_fields.map(field_name => {
      const raw_value = filter[field_name]
      if (raw_value == undefined) {
        return
      }
      
      const mod = modifiers[field_name] || {}

      const prefix = ( (values.length==0) && startWithWhere)
        ? ' WHERE ' 
        : ' AND '

      const alias = mod?.alias || field_name
      let filter_name = alias
      if (mod?.coalesce) {
        const def_value = mod.coalesce===true
          ? 'TRUE'
          : mod.coalesce===false
          ? 'FALSE'
          : mod.coalesce
        filter_name= `COALESCE(${alias}, ${def_value})`
      }
     
      let value = raw_value==='true'
        ? true
        : raw_value==='false'
        ? false
        : raw_value
      
      let qfilter = ''
      
      if (typeof value === 'boolean') {
        qfilter = `IS ${value === true ? 'TRUE' : 'FALSE'}`
      } else {
        if (Array.isArray(value)) {
          qfilter = `IN ($${values.length+1}:csv)`
          values.push(value)
        } else {
          const op = mod?.op || '='
          qfilter = `${op} $${values.length+1}`
          values.push(value)
        }        
      }
      
      where+= ` ${prefix} ${filter_name} ${qfilter}`

    })
  }

  return [where, values]

}
