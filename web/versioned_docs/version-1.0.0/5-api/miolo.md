---
sidebar_position: 2
---

# `miolo` (Server)

Este paquete contiene toda la infraestructura de backend necesaria para arrancar el framework, configurar la base de datos y montar el enrutador.

> **Uso:** Importado exclusivamente en el entorno de Node (`src/server/`).

## Utilidades Principales

### `with_miolo_input_schema`
Envuelve una función asíncrona para validar automáticamente sus parámetros (`params`) con Joi antes de la ejecución.

### `with_miolo_output_schema`
Asegura que el objeto retornado por una función coincida con un esquema Joi, recortando propiedades adicionales (útil para limpiar contraseñas o campos internos antes de devolverlos a la API).

*(Pendiente de documentación exhaustiva de métodos del objeto Context de Koa extendidos por Miolo).*
