---
name: miolo-model
description: Patterns and conventions for data models in miolo apps. Use when creating or modifying data models, establishing JSDoc strict typing, extending MioloModel or MioloArray, or working in the src/ns/model directory.
---

# Miolo Data Models

This skill details how to properly use and type data models in miolo applications using `miolo-model`. Models should encapsulate business logic and data structure securely, working across both client and server boundaries.

## Architecture & Location

Models reside in `src/ns/model/` (or `src/ns/models/`) because they are part of the shared **namespace (ns)** layer, meaning they execute seamlessly on both the server (Node.js) and the client (React).

```
src/ns/model/
├── base/                   # Base models mirroring DB structures or API responses
│   ├── Category.mjs
│   ├── Todo.mjs
│   └── TodoList.mjs
└── aggregate_models...     # Domain-specific aggregated models
```

## Extending `MioloModel`

All single-entity models should extend `MioloModel`.

**File:** `src/ns/model/base/Todo.mjs`

```javascript
import { MioloModel } from "miolo-model"
import Category from "./Category.mjs"

/**
 * @typedef {import("#ns/names/status.mjs").TodoStatus} TodoStatus
 */

export default class Todo extends MioloModel {
  constructor(data) {
    super(data)
    
    /**
     * Initializing nested models
     * @type {Category}
     */
    this.category = new Category()
  }

  /**
   * Safely setting a nested model using Miolo patterns
   * @param {Category | object} [category]
   */
  set_category(category) {
    this.category = category instanceof Category ? category : new Category(category || {})
  }

  // --- Getters to access internal data map safely ---

  /** @returns {number | undefined} */
  get id_todo() {
    return this.get_value("id_todo")
  }

  /** @returns {TodoStatus} */
  get status() {
    // Provide a sensible default if property is not found
    return this.get_value("status", "PENDING")
  }

  /** @returns {boolean} */
  get is_urgent() {
    return this.get_value("is_urgent", false)
  }

  // --- Encapsulated Business Logic ---

  /**
   * @returns {boolean}
   */
  is_completed() {
    return this.status === "COMPLETED"
  }
}
```

### Key Principles for Models:
1. **Never read internal keys directly:** Always use `this.get_value("key", defaultValue)`.
2. **Encapsulate Nested Objects:** Provide initialization logic in `constructor` and use setters like `set_category` to ensure the nested data is instantiated as a proper model object.
3. **Keep Logic Here:** Don't put business logic like "is this todo completed?" in a React component. Put it in `is_completed()` inside the model.

## Extending `MioloArray`

For lists of models, extend `MioloArray`. This allows mapping a raw array of data directly into an array of proper model instances.

**File:** `src/ns/model/base/TodoList.mjs`

```javascript
import { MioloArray } from "miolo-model"
import Todo from "./Todo.mjs"

/**
 * @extends {MioloArray<Todo>}
 */
export default class TodoList extends MioloArray {
  /**
   * Return the Model class to map the raw items into
   */
  get model() {
    return Todo
  }

  // --- List-specific Business Logic ---

  /**
   * @returns {Array<Todo>}
   */
  get_urgent_todos() {
    return this.filter(t => t.is_urgent && !t.is_completed())
  }
}
```

> [!WARNING]
> **TypeScript limitations with MioloArray:** Because `MioloArray` alters how native array methods (`filter`, `slice`, etc.) return data (returning a `MioloArray` instead of a standard `Array`), strict TypeScript checking might complain about `push()` signature incompatibilities. This is a known TS limitation with extending `Array`.
> *Solution:* Use `"skipLibCheck": true` in `jsconfig.json` or explicitly ignore the TS errors in `node_modules` via `exclude`.

## Strict JSDoc Typing (`checkJs: true`)

Miolo enforces robust type safety without needing `.ts` files by utilizing standard JSDoc.

1. **Enable Type Checking:** Add `"checkJs": true` in your `jsconfig.json`.
2. **Type Every Getter:** `/** @returns {number | undefined} */ get id()`
3. **Type Every Param:** `/** @param {boolean} also_doubt @returns {boolean} */ is_callable(also_doubt = false)`
4. **Use `@typedef`:** Import and declare shared enums/types from namespace files. 

```javascript
/**
 * @typedef {import("#ns/names/role.mjs").Role} Role
 */
```

### Why Typed Models?

By strictly typing the `src/ns/model` layer, you guarantee that API responses mapped into `MioloModel` objects will provide intelligent autocompletion across your entire client (React components) and server (routing layers), drastically reducing runtime errors.
