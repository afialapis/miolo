---
sidebar_position: 2
---

# Modelos y Clases de Dominio (Namespace)

Un patrón arquitectónico central de Miolo es la **capa de Namespace (`src/ns/`)**. El código que reside aquí (Modelos, validadores, constantes) está diseñado para ejecutarse indiscriminadamente en cualquier entorno de JavaScript, tanto en el Backend (servidor Node) como en el Frontend (cliente React).

## Beneficios de los Modelos Compartidos

Si utilizas objetos planos JSON provenientes de la API en el frontend, acabas repitiendo la lógica de negocio (ej. `if (tarea.estado === "COMPLETADA")`) en docenas de componentes de React.  

Para evitar esto, Miolo utiliza clases de **Modelos**. Instanciarás estas clases al recibir los datos JSON de la API, encapsulando la lógica allí.

## Creando un Modelo: `MioloModel`

Todos los modelos de entidad única deben heredar de la clase base `MioloModel`. Su convención es situarlos en `src/ns/model/base/`.

```javascript
import { MioloModel } from "miolo-model"

export default class Todo extends MioloModel {
  constructor(data) {
    // Almacena el JSON plano internamente
    super(data) 
  }

  // --- 1. Getters Seguros ---
  
  /** @returns {number | undefined} */
  get id_todo() {
    // Siempre extraemos valores usando get_value(key, defaultValue)
    return this.get_value("id_todo")
  }

  /** @returns {string} */
  get status() {
    return this.get_value("status", "PENDING")
  }

  /** @returns {boolean} */
  get is_urgent() {
    return this.get_value("is_urgent", false)
  }

  // --- 2. Lógica de Negocio Encapsulada ---

  /** @returns {boolean} */
  is_completed() {
    return this.status === "COMPLETED"
  }
}
```

Al utilizarlo en React, el componente queda extremadamente limpio:
```jsx
// ❌ Antes (Lógica de negocio mezclada en el Frontend)
<div className={todo.status === 'COMPLETED' ? 'verde' : 'rojo'} />

// ✅ Ahora (El componente sólo pinta el resultado del modelo)
<div className={todo.is_completed() ? 'verde' : 'rojo'} />
```

## Creando Listas: `MioloArray`

Si necesitas instanciar una lista de Modelos a partir de un Array plano, la librería te provee `MioloArray`.

```javascript
import { MioloArray } from "miolo-model"
import Todo from "./Todo.mjs"

/**
 * Indicamos al IDE que es un array que contiene Todos
 * @extends {MioloArray<Todo>}
 */
export default class TodoList extends MioloArray {
  
  /**
   * Propiedad obligatoria: Indica en qué Clase individual debe envolverse cada
   * elemento plano de la lista (inyectando new Todo(json_plano))
   */
  get model() {
    return Todo
  }

  // --- Métodos de Lista ---

  /** @returns {Array<Todo>} */
  get_urgent_todos() {
    // Internamente, MioloArray se encarga de llamar a filter() y 
    // asegurarse de que los iterables sigan siendo de tipo Todo
    return this.filter(t => t.is_urgent && !t.is_completed())
  }
}
```

## Uso Práctico con SSR y Fetchers

El mejor lugar para transformar los objetos crudos (JSON) provenientes del API en clases del Modelo (instancias de `MioloModel`) es justo en la entrada de datos: **el `remoteLoader` del hook `useSsrData`**.

```javascript
import TodoList from '#ns/models/TodoList.mjs'

const [todos, setTodos, refreshTodos] = useSsrData(
  'todos', // Supongamos que del backend llega un array literal '[{id:1, desc:"Foo"}]'
  new TodoList([]), // Default value inicializado como clase
  async (context, fetcher) => {
    // Si la llamada al API se hace, nos traemos los crudos
    const { data: rawTodos } = await fetcher.get('/api/todo/list')
    
    // Transformamos en Modelos y los devolvemos al frontend
    const todoList = new TodoList(rawTodos)
    return todoList
  }
)

// Ya podemos invocar la lógica agregada a la lista
const totalUrgent = todos.get_urgent_todos().length;
```

## Tipado Fuerte con JSDoc

Para que el uso de estas clases funcione a lo largo de toda la estructura de la app, **es estrictamente necesario utilizar JSDoc**. 

Dado que Miolo tiene configurado `checkJs: true` a nivel de proyecto, al declarar `/** @returns {boolean} */` encima de un método, el compilador advertirá al programador si éste trata de utilizar el resultado como una Cadena de Texto o un Número.

- Documenta siempre el `@return` de los getters.
- Usa `@typedef` para importar y reusar enums u otros modelos (ej. Categorías).
