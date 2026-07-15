---
sidebar_position: 4
---

# `miolo-model` (Namespace)

Librería isomórfica (funciona tanto en navegador como en Node) para la creación de modelos de dominio ricos que encapsulan reglas de negocio.

> **Uso:** Importado mayoritariamente en la capa agnóstica (`src/ns/`).

## Clases Principales

### `MioloModel`
Clase base para entidades individuales. Su constructor acepta el objeto JSON devuelto por la base de datos.
- Provee métodos seguros como `this.get_value(key, defaultValue)` para evitar colisiones.

### `MioloArray`
Clase base para colecciones. Modifica el comportamiento natural del `Array` para garantizar que tras hacer un `.filter()` o `.slice()`, los elementos resultantes sigan siendo instancias vivas de sus correspondientes `MioloModel`.
