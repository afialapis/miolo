import { format } from 'winston';

const injectStackTrace = format((info) => {
  // Solo nos interesa inyectar stack si es nivel error y NO tiene stack
  if (info.level === 'error' && !info.stack) {
    const syntheticError = new Error(info.message);
    const stackLines = syntheticError.stack.split('\n');
    
    // 1. Definimos nuestro "Ancla".
    // Es el archivo que actúa de frontera entre tu framework y el código de negocio.
    // Usamos una cadena parcial única para identificarlo.
    const wrapperAnchor = 'src/engines/logger/index.mjs'; 

    // 2. Buscamos en qué línea del stack aparece tu wrapper
    const wrapperIndex = stackLines.findIndex(line => line.includes(wrapperAnchor));

    let cleanStackLines;

    if (wrapperIndex !== -1) {
      // CASO ÉXITO: Encontramos tu wrapper.
      // El stack útil empieza justo en la línea SIGUIENTE (+1).
      // Mantenemos la cabecera (línea 0) y pegamos del wrapper hacia abajo.
      cleanStackLines = [
        stackLines[0], 
        ...stackLines.slice(wrapperIndex + 1)
      ];
    } 
    // FALLBACK: Si por alguna razón extraña no pasa por tu wrapper,
    // hacemos una limpieza conservadora básica (winston y node internals).
    cleanStackLines = cleanStackLines.filter(line => 
      !line.includes('node_modules/winston') &&
      !line.includes('node_modules/logform') &&
      !line.includes('node_modules/koa-compose') &&
      !line.includes('node:internal') &&
      !line.includes('node_modules/readable-stream') &&
      !line.includes('injectStackTrace.mjs')
    );
  

    info.stack = cleanStackLines.join('\n');
  }
  return info;
})

export default injectStackTrace
