/**
 * XCLUSIV Preventa - Google Apps Script Webhook
 * 
 * Este script recibe los datos del formulario de registro y los guarda en Google Sheets.
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 
 * 1. Crea una Google Sheet con una hoja llamada "Registros"
 * 2. Agrega estas columnas en la primera fila:
 *    lead_id | timestamp | email | whatsapp | ciudad | modelo_favorito | talla | 
 *    intencion_compra | cantidad_estimada | marketing_consent | ip_hash | 
 *    utm_source | utm_medium | utm_campaign | utm_content | referer
 * 
 * 3. En tu Google Sheet, ve a Extensiones > Apps Script
 * 4. Pega este código
 * 5. Cambia el valor de AUTHORIZED_TOKEN por un token seguro
 * 6. Guarda el proyecto
 * 7. Despliega como Aplicación Web:
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 8. Copia la URL del webhook y úsala en tu .env.local como APP_WEBHOOK_URL
 */

function doPost(e) {
  try {
    // ==========================================
    // CONFIGURACIÓN - CAMBIA ESTOS VALORES
    // ==========================================
    
    // Token de autorización - DEBE coincidir con APP_WEBHOOK_TOKEN en tu .env.local
    // Genera uno seguro con: openssl rand -base64 32
    const AUTHORIZED_TOKEN = "CAMBIA_ESTE_TOKEN_POR_UNO_SEGURO";
    
    // Nombre de la hoja donde se guardarán los datos
    const SHEET_NAME = "Registros";
    
    // ==========================================
    // FIN DE CONFIGURACIÓN
    // ==========================================
    
    // Log de la petición recibida
    Logger.log("Petición recibida");
    
    // Verificar autorización
    const authHeader = e.parameter.authorization || 
                      (e.postData && e.postData.headers && e.postData.headers.Authorization) || 
                      "";
    
    const token = authHeader.replace("Bearer ", "");
    
    if (token !== AUTHORIZED_TOKEN) {
      Logger.log("Token no autorizado: " + token);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "No autorizado"
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parsear datos del POST
    let data;
    try {
      data = JSON.parse(e.postData.contents);
      Logger.log("Datos recibidos: " + JSON.stringify(data));
    } catch (parseError) {
      Logger.log("Error al parsear JSON: " + parseError);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "JSON inválido"
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Obtener la hoja de cálculo
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      Logger.log("Hoja no encontrada: " + SHEET_NAME);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Hoja '" + SHEET_NAME + "' no encontrada"
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Preparar la fila de datos
    const row = [
      data.lead_id || "",
      data.timestamp || new Date().toISOString(),
      data.nombre || "",
      data.apellido || "",
      data.email || "",
      data.whatsapp || "",
      data.prenda || "Hoodie",
      data.talla || "",
      data.ciudad || "",
      data.cantidad_estimada || "",
      data.contacto || "",
      data.instagram_user || "",
      data.consent_marketing ? "Sí" : "No",
      data.ip_hash || "",
      data.utm_source || "",
      data.utm_medium || "",
      data.utm_campaign || "",
      data.utm_content || "",
      data.referer || ""
    ];
    
    // Agregar la fila a la hoja
    sheet.appendRow(row);
    Logger.log("Fila agregada exitosamente");
    
    // Respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Datos guardados correctamente",
      lead_id: data.lead_id
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("Error general: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función de prueba para verificar que el script funciona
 * Ejecuta esta función desde el editor para probar
 */
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        lead_id: "test-" + new Date().getTime(),
        timestamp: new Date().toISOString(),
        email: "test@example.com",
        whatsapp: "+57 300 123 4567",
        ciudad: "Bogotá",
        modelo_favorito: "oversized-tee-black",
        talla: "m",
        intencion_compra: "seguro",
        cantidad_estimada: "2",
        marketing_consent: true,
        ip_hash: "test-hash-123",
        utm_source: "test",
        utm_medium: "manual",
        utm_campaign: "test-campaign"
      }),
      headers: {
        Authorization: "Bearer CAMBIA_ESTE_TOKEN_POR_UNO_SEGURO"
      }
    },
    parameter: {}
  };
  
  const result = doPost(testData);
  Logger.log("Resultado del test: " + result.getContent());
}

/**
 * Función para crear automáticamente los encabezados de la hoja
 * Ejecuta esta función una vez para configurar tu hoja automáticamente
 */
function setupSheet() {
  const SHEET_NAME = "Registros";
  
  // Obtener o crear la hoja
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
    Logger.log("Hoja '" + SHEET_NAME + "' creada");
  }
  
  // Encabezados
  const headers = [
    "lead_id",
    "timestamp",
    "nombre",
    "apellido",
    "email",
    "whatsapp",
    "prenda",
    "talla",
    "ciudad",
    "cantidad_estimada",
    "contacto",
    "instagram_user",
    "consent_marketing",
    "ip_hash",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "referer"
  ];
  
  // Verificar si ya hay encabezados
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = firstRow.some(cell => cell !== "");
  
  if (!hasHeaders) {
    // Agregar encabezados
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Formatear encabezados
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#9333ea");
    headerRange.setFontColor("#ffffff");
    headerRange.setHorizontalAlignment("center");
    
    // Ajustar ancho de columnas
    sheet.autoResizeColumns(1, headers.length);
    
    // Congelar la primera fila
    sheet.setFrozenRows(1);
    
    Logger.log("Encabezados configurados correctamente");
    
    // Agregar una fila de ejemplo
    sheet.appendRow([
      "ejemplo-lead-123",
      new Date().toISOString(),
      "Juan",
      "Pérez",
      "ejemplo@email.com",
      "+57 300 123 4567",
      "Hoodie",
      "M",
      "Bogotá",
      "2",
      "WhatsApp",
      "",
      "Sí",
      "hash-ejemplo-123",
      "instagram",
      "stories",
      "preventa2024",
      "video1",
      "https://instagram.com"
    ]);
    
    Logger.log("Fila de ejemplo agregada");
  } else {
    Logger.log("La hoja ya tiene encabezados");
  }
  
  Logger.log("Setup completado");
}

