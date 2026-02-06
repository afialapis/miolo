import os from 'os'

/**
 * Genera un cuerpo de email HTML a partir del objeto info de Winston.
 * @param {Object} info - El objeto info transformado por Winston.
 * @returns {String} HTML string.
 */
export default function buildErrorEmailBody(info) {
  // 1. Extraemos propiedades estándar y conocidas
  const { timestamp, level, message, stack, ...metadata } = info;
  
  // 2. Preparamos el Stack Trace (si existe)
  // Nota: Winston solo tiene 'stack' si usas format.errors({ stack: true })
  const stackHtml = stack 
    ? `<div style="margin-top: 20px;">
         <h3 style="color: #d9534f;">Stack Trace</h3>
         <pre style="background: #f4f4f4; padding: 10px; border: 1px solid #ddd; overflow-x: auto; font-size: 12px; font-family: monospace;">${stack}</pre>
       </div>`
    : '<p><em>No stack trace available (Log was likely a string or logical error).</em></p>';

  // 3. Preparamos los Metadatos (el resto de propiedades en info)
  // Esto es vital en Koa para ver requestId, url, method, etc.
  const metaRows = Object.entries(metadata).map(([key, value]) => {
    // Si el valor es un objeto complejo, lo pasamos a string
    const displayValue = (typeof value === 'object') 
      ? `<pre style="margin: 0;">${JSON.stringify(value, null, 2)}</pre>` 
      : value;

    return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; width: 30%;">${key}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${displayValue}</td>
      </tr>
    `;
  }).join('');

  const metadataHtml = metaRows.length > 0
    ? `<div style="margin-top: 20px;">
         <h3>Metadata / Context</h3>
         <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 14px;">
           ${metaRows}
         </table>
       </div>`
    : '';

  // 4. Construcción final del HTML
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="background-color: #ca7d7bff; color: white; padding: 10px;">🚨 Error at [${process.env.MIOLO_NAME || 'miolo'}]</h2>
      
      <div style="padding: 10px; border: 1px solid #ddd; background-color: #fff9f9;">
        <strong>Message:</strong> <span style="font-size: 1.2em;">${message.split('\n').map(l => `<div>${l}</div>`).join('\n')}</span><br>
        <strong>Time:</strong> ${timestamp || new Date().toISOString()}<br>
        <strong>Server:</strong> ${os.hostname()}
      </div>

      ${stackHtml}
      ${metadataHtml}
      
      <div style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
        Sent automatically by <strong>miolo</strong> logger.
      </div>
    </div>
  `;
}