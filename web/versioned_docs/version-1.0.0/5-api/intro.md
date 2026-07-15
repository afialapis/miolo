---
sidebar_position: 1
---

# API Reference

Esta sección documenta las APIs públicas exportadas por los paquetes del framework Miolo. 

La arquitectura modular de Miolo permite importar únicamente las piezas necesarias dependiendo del entorno de ejecución (Cliente vs. Servidor).

## Paquetes Principales

- **`miolo`**: El núcleo del servidor. Contiene la configuración de Koa, gestión de sesiones, WebSockets y acceso a base de datos.
- **`miolo-cli`**: Herramientas de línea de comandos para andamiaje (scaffolding), construcción (build) y desarrollo (dev server).
- **`miolo-react`**: Hooks (`useMioloContext`) y componentes principales para las interfaces de cliente.
- **`miolo-model`**: Clases base (`MioloModel`, `MioloArray`) para mapear respuestas JSON en clases de dominio robustas en la capa compartida (`src/ns/`).
