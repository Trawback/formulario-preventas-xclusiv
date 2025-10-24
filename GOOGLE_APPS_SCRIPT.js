function doPost(e) {
  // ==========================================
  // CONFIGURACIÓN - CAMBIA ESTOS VALORES
  // ==========================================
  
  // Token de autorización - DEBE coincidir con APP_WEBHOOK_TOKEN en tu .env.local
  // Genera uno seguro con: openssl rand -base64 32
  const AUTHORIZED_TOKEN = "ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=";
  
  // Nombre de la hoja donde se guardarán los datos
  const SHEET_NAME = "Registros";
  
  // ==========================================
  // FIN DE CONFIGURACIÓN
  // ==========================================
  
  try {
    // Log de la petición recibida
    Logger.log("Petición recibida");
    Logger.log("typeof e: " + typeof e);
    Logger.log("e: " + JSON.stringify(e));
    
    // Verificar que e existe y tiene las propiedades esperadas
    if (!e || typeof e !== 'object') {
      Logger.log("❌ Error: Objeto 'e' no definido o inválido");
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        success: false,
        error: "Invalid request - e is undefined"
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    Logger.log("Tipo de request: " + (e.postData ? "POST con datos" : "Otro"));
    
    // Parsear datos del POST primero
    let data;
    try {
      data = JSON.parse(e.postData.contents);
      Logger.log("Datos recibidos: " + JSON.stringify(data));
    } catch (parseError) {
      Logger.log("❌ Error al parsear JSON: " + parseError);
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        success: false,
        error: "JSON inválido"
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Verificar autorización usando el token del body como alternativa
    let authHeader = "";
    let token = "";
    
    // Log completo de lo que recibimos para debugging
    Logger.log("e.parameter: " + JSON.stringify(e.parameter));
    
    // Método 1: Intentar desde query parameters (?authorization=...)
    if (e.parameter && e.parameter.authorization) {
      authHeader = e.parameter.authorization;
      token = authHeader.replace("Bearer ", "").trim();
      Logger.log("✓ Token obtenido de e.parameter: " + token);
    }
    // Método 2: Token en el body del JSON (fallback)
    else if (data._auth_token) {
      token = data._auth_token;
      Logger.log("✓ Token obtenido del body: " + token);
      delete data._auth_token; // Remover del objeto de datos
    }
    // Método 3: Sin autenticación válida
    else {
      Logger.log("❌ No se encontró token de autorización");
      Logger.log("💡 Para que funcione, agrega ?authorization=Bearer%20TOKEN a la URL");
    }
    
    Logger.log("Token extraído: '" + token + "'");
    Logger.log("Token esperado: '" + AUTHORIZED_TOKEN + "'");
    Logger.log("¿Coinciden?: " + (token === AUTHORIZED_TOKEN));
    
    if (token !== AUTHORIZED_TOKEN) {
      Logger.log("❌ Token no autorizado");
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        success: false,
        error: "unauthorized",
        debug: {
          received_token_length: token.length,
          expected_token_length: AUTHORIZED_TOKEN.length
        }
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    Logger.log("✅ Token autorizado correctamente");
    
    // Obtener la hoja de cálculo
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      Logger.log("❌ Hoja no encontrada: " + SHEET_NAME);
      return ContentService.createTextOutput(JSON.stringify({
        ok: false,
        success: false,
        error: "Hoja '" + SHEET_NAME + "' no encontrada"
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Preparar las prendas (hasta 3)
    const prendas = data.prendas_seleccionadas || [];
    const prenda1 = prendas[0] || {};
    const prenda2 = prendas[1] || {};
    const prenda3 = prendas[2] || {};
    
    // Función helper para convertir array de tallas a string
    const formatTallas = (prenda) => {
      if (!prenda.tallas || !Array.isArray(prenda.tallas)) return "";
      return prenda.tallas.filter(t => t).join(", ");
    };
    
    // Preparar la fila de datos
    const row = [
      data.lead_id || "",
      data.timestamp || new Date().toISOString(),
      data.nombre || "",
      data.apellido || "",
      data.email || "",
      data.whatsapp || "",
      data.ciudad || "",
      data.dia_competencia || "",
      // Prenda 1
      prenda1.prenda_nombre || "",
      formatTallas(prenda1),
      prenda1.cantidad || "",
      // Prenda 2
      prenda2.prenda_nombre || "",
      formatTallas(prenda2),
      prenda2.cantidad || "",
      // Prenda 3
      prenda3.prenda_nombre || "",
      formatTallas(prenda3),
      prenda3.cantidad || "",
      data.metodo_entrega || "",
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
    Logger.log("✅ Fila agregada exitosamente");
    
    // Respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      success: true,
      message: "Datos guardados correctamente",
      lead_id: data.lead_id
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("❌ Error general: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función de prueba para verificar que el script funciona
 * Ejecuta esta función desde el editor para probar
 * 
 * IMPORTANTE: Cambia TEST_TOKEN por el mismo valor que usas en AUTHORIZED_TOKEN (línea 9)
 */
function testScript() {
  // ⚠️ CAMBIA ESTE TOKEN POR EL MISMO QUE USAS EN LA LÍNEA 8
  const TEST_TOKEN = "ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=";
  
  Logger.log("🧪 Iniciando test...");
  Logger.log("📝 Token configurado: " + TEST_TOKEN);
  
  // Simular el objeto 'e' que Google Apps Script recibe en un POST real
  const testData = {
    postData: {
      contents: JSON.stringify({
        lead_id: "test-" + new Date().getTime(),
        timestamp: new Date().toISOString(),
        nombre: "TEST",
        apellido: "USUARIO",
        email: "test@example.com",
        whatsapp: "+52 55 1234 5678",
        ciudad: "Ciudad de México",
        dia_competencia: "7_noviembre",
        prendas_seleccionadas: [
          { prenda_id: "Hoodie XSV1", prenda_nombre: 'Hoodie "XSV1"', tallas: ["M"], cantidad: 1 },
          { prenda_id: "Tank Top XSV2", prenda_nombre: 'Tank Top "XSV2"', tallas: ["L", "XL"], cantidad: 2 }
        ],
        metodo_entrega: "envio_nacional",
        contacto: "WhatsApp",
        instagram_user: "@testuser",
        consent_marketing: true,
        ip_hash: "test-hash-123",
        utm_source: "test",
        utm_medium: "manual",
        utm_campaign: "test-campaign",
        utm_content: "",
        user_agent: "Test Script",
        referer: "http://localhost:3000"
      }),
      // Los headers deben ser un string JSON cuando vienen de fetch()
      headers: JSON.stringify({
        "Authorization": "Bearer " + TEST_TOKEN,
        "Content-Type": "application/json"
      }),
      type: "application/json",
      length: 500
    },
    parameter: {},
    contextPath: "",
    contentLength: 500,
    queryString: ""
  };
  
  Logger.log("🚀 Llamando a doPost()...");
  Logger.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  try {
    const result = doPost(testData);
    const resultContent = result.getContent();
    
    Logger.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    Logger.log("📊 Resultado completo:");
    Logger.log(resultContent);
    
    try {
      const resultJson = JSON.parse(resultContent);
      Logger.log("");
      if (resultJson.ok || resultJson.success) {
        Logger.log("✅✅✅ ¡TEST EXITOSO! ✅✅✅");
        Logger.log("Los datos se guardaron en la hoja 'Registros'");
        Logger.log("Verifica tu Google Sheet para confirmar");
      } else {
        Logger.log("❌❌❌ TEST FALLÓ ❌❌❌");
        Logger.log("Error: " + resultJson.error);
        Logger.log("");
        Logger.log("💡 Posibles soluciones:");
        if (resultJson.error === "unauthorized") {
          Logger.log("→ Verifica que TEST_TOKEN (línea ~151) sea IGUAL a AUTHORIZED_TOKEN (línea 9)");
        } else if (resultJson.error && resultJson.error.includes("Hoja")) {
          Logger.log("→ Ejecuta la función setupSheet() primero");
        }
      }
    } catch (parseError) {
      Logger.log("⚠️ No se pudo parsear el resultado como JSON");
      Logger.log("Respuesta raw: " + resultContent);
    }
  } catch (error) {
    Logger.log("❌ Error al ejecutar doPost(): " + error.toString());
  }
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
    "ciudad",
    "dia_competencia",
    "prenda_1",
    "talla_1",
    "cantidad_1",
    "prenda_2",
    "talla_2",
    "cantidad_2",
    "prenda_3",
    "talla_3",
    "cantidad_3",
    "metodo_entrega",
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
      "Bogotá",
      "8_noviembre",
      'Hoodie "XSV1"',
      "M, L",
      "2",
      'Tank Top "XSV2"',
      "S",
      "1",
      "",
      "",
      "",
      "entrega_presencial",
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

