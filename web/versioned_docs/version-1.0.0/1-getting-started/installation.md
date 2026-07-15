---
sidebar_position: 2
---

# Instalación y Primeros Pasos

Para comenzar un nuevo proyecto con **Miolo**, el ecosistema incluye un comando de scaffolding (`npx miolo create`) que generará toda la estructura recomendada.

## Crear un Nuevo Proyecto

Para iniciar una nueva aplicación llamada `mi-app`:

```bash
npx miolo create mi-app
```

Este comando descargará la plantilla oficial (basada en `miolo-sample`) y configurará automáticamente:

- Ecosistema completo de servidor (Koa + Miolo).
- Aplicación de cliente en React + Vite.
- Ficheros de entorno (`.env`).
- Archivos de configuración (`package.json`, `jsconfig.json`, `biome.json`).
- Scripts de base de datos e inicialización.

## Arrancar en Desarrollo

Una vez creado el proyecto, instala las dependencias y arranca el entorno de desarrollo:

```bash
cd mi-app
npm install
npm run dev
```

El script `npm run dev` arrancará el servidor backend y el entorno de React con hot-reload en el puerto especificado en tu archivo `.env`.

Si necesitas depurar, también puedes usar:

```bash
npm run deb
```

## Producción

Para construir y desplegar tu aplicación:

1. **Construcción**: `npm run build`
2. **Ejecución**: `npm start` (o alternativamente `npm stop` y `npm run restart`).

La carpeta compilada se almacenará en el directorio `build/` (ignorada en control de versiones).
