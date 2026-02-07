import React, { useState } from 'react'

const JsonTreeViewer = ({ data }) => {
  // Función para ordenar las claves de un objeto
  const sortObjectKeys = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(item => sortObjectKeys(item))
    }

    const sortedKeys = Object.keys(obj).sort()
    const newObj = {}
    for (const key of sortedKeys) {
      newObj[key] = sortObjectKeys(obj[key])
    }
    return newObj
  }

  const sortedData = sortObjectKeys(data)

  return (
    <div className="json-tree-viewer">
      <JsonNode value={sortedData} expanded/>
    </div>
  )
}

const JsonNode = ({ label, value, expanded }) => {
  const [isExpanded, setIsExpanded] = useState(expanded==true)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const renderValue = (val) => {
    if (typeof val === 'object' && val !== null) {
      if (Array.isArray(val)) {
        return (
          <span className="json-array">
            {isExpanded ? (
              <>
                <span className="toggle-icon" onClick={toggleExpand}>▼</span>
                [
                <div className="indent">
                  {val.map((item, index) => (
                    <JsonNode key={index} value={item} />
                  ))}
                </div>
                ]
              </>
            ) : (
              <>
                <span className="toggle-icon" onClick={toggleExpand}>▶</span>
                [...]{` (${val.length} ${val.length === 1 ? 'item' : 'items'})`}
              </>
            )}
          </span>
        )
      } else { // Es un objeto
        return (
          <span className="json-object">
            {isExpanded ? (
              <>
                <span className="toggle-icon" onClick={toggleExpand}>▼</span>
                {'{'}
                <div className="indent">
                  {Object.entries(val).map(([key, itemValue]) => (
                    <JsonNode key={key} label={key} value={itemValue} />
                  ))}
                </div>
                {'}'}
              </>
            ) : (
              <>
                <span className="toggle-icon" onClick={toggleExpand}>▶</span>
                {'{...}'}{` (${Object.keys(val).length} ${Object.keys(val).length === 1 ? 'key' : 'keys'})`}
              </>
            )}
          </span>
        )
      }
    } else {
      // Es un tipo de dato primitivo
      let displayValue = String(val)
      let valueClass = 'json-value-string'

      if (typeof val === 'number') {
        valueClass = 'json-value-number'
      } else if (typeof val === 'boolean') {
        valueClass = 'json-value-boolean'
      } else if (val === null) {
        displayValue = 'null'
        valueClass = 'json-value-null'
      } else if (typeof val === 'string') {
        displayValue = `"${val}"`
      }

      return <span className={valueClass}>{displayValue}</span>
    }
  }

  return (
    <div className="json-node">
      {label && <span className="json-key">{label}: </span>}
      {renderValue(value)}
    </div>
  )
}

export default JsonTreeViewer