const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const form = document.getElementById("input-form");

// Detectar palabras de despedida
const despedidas = ["adiós","adios","hasta luego","gracias","nos vemos","chao","chau","bye"];
// Detectar saludos
const saludos = ["hola", "buenos dias", "buenos días", "buen dia", "buen día", "buenas", "buenas tardes", "buenas noches", "buen dia", "buen día", "buenas dias", "buenas días"];


// --- Sede activa ---
let sedeActual = null;

// Ubicaciones por sede para los puntos que cambian entre sedes
const SEDES_INFO = {
  "Sede Fusagasugá":                  { pilas: "cafeterías, laboratorios, CGCA y bloque administrativo nuevo", tapas: "cafeterías, biblioteca y bloque administrativo nuevo", aceite: "Bloque Académico" },
  "Seccional Ubaté":                  { pilas: "edificio principal, planta baja",   tapas: "recepción principal",   aceite: "área de cafetería" },
  "Seccional Girardot":               { pilas: "bloque administrativo",             tapas: "biblioteca",            aceite: "cafetería central" },
  "Extensión Soacha":                 { pilas: "coordinación académica",            tapas: "recepción",             aceite: "cafetería" },
  "Extensión Chía":                   { pilas: "bloque administrativo",             tapas: "recepción",             aceite: "cafetería" },
  "Extensión Zipaquirá":              { pilas: "coordinación",                      tapas: "recepción",             aceite: "cafetería" },
  "Extensión Facatativá":             { pilas: "coordinación",                      tapas: "recepción",             aceite: "cafetería" },
  "Centro Académico Deportivo (CAD)": { pilas: "oficina administrativa",            tapas: "recepción CAD",         aceite: "área de servicios" }
};

function ubicacion(campo) {
  if (sedeActual && SEDES_INFO[sedeActual]) {
    return SEDES_INFO[sedeActual][campo] || "los puntos habilitados en tu sede";
  }
  return "los puntos habilitados en tu sede";
}


// FLUJO DEL CHATBOT

const flow = {
  // --- Inicio ---
  inicio: {
    message: `👋 ¡Hola! Soy **PEPE**, del *Sistema de Gestión Ambiental* de la **Ucundinamarca**.  
¡Qué buen ambiente verte por aquí! 🌿  
¿Desde qué madriguera te comunicas?

Escribe el número o elige una opción:`,
    options: [
      { text: "1. Sede Fusagasugá", next: "sedes", sede: "Sede Fusagasugá" },
      { text: "2. Seccional Ubaté", next: "sedes", sede: "Seccional Ubaté" },
      { text: "3. Seccional Girardot", next: "sedes", sede: "Seccional Girardot" },
      { text: "4. Extensión Soacha", next: "sedes", sede: "Extensión Soacha" },
      { text: "5. Extensión Chía", next: "sedes", sede: "Extensión Chía" },
      { text: "6. Extensión Zipaquirá", next: "sedes", sede: "Extensión Zipaquirá" },
      { text: "7. Extensión Facatativá", next: "sedes", sede: "Extensión Facatativá" },
      { text: "8. Centro Académico Deportivo (CAD)", next: "sedes", sede: "Centro Académico Deportivo (CAD)" }
    ]
  },

  // --- Menú sede ---
  sedes: {
    message: () => `🌎 Hola desde **${sedeActual || "tu sede"}**. ¡Puedes hacer parte del cambio!  
Escoge las opciones que tengo para ti:`,
    options: [
      { text: "1. Oficina del SGA", next: "oficina_sga" },
      { text: "2. Medicamentos vencidos", next: "medicamentos" },
      { text: "3. Aceite de cocina usado", next: "aceite" },
      { text: "4. Pilas y baterías", next: "pilas" },
      { text: "5. Tapas plásticas", next: "tapas" },
      { text: "6. Ropa usada", next: "ropa" },
      { text: "7. Botellitas de amor", next: "botellitas" },
      { text: "8. RAEE (Residuos electrónicos)", next: "raee" },
      { text: "9. Voluntariado", next: "voluntariado" },
      { text: "10. Canales de comunicación", next: "canales" }
    ]
  },

  oficina_sga: {
    message: () => {
      const ubicaciones = {
        "Sede Fusagasugá":                  "🏢 Nos encontramos en el **Bloque Administrativo, quinto piso**.",
        "Seccional Ubaté":                  "🏢 Encuéntranos en el *tercer piso del Bloque Administrativo*.",
        "Seccional Girardot":               "🏢 Nos encontramos en el **tercer piso del Bloque Administrativo** *(ubicación temporal)*.",
        "Extensión Soacha":                 "🏢 **Oficina del Sistema de Gestión Ambiental (SGA)**\nNos encuentras en el **Bloque A**.",
        "Extensión Chía":                   "🏢 Primer piso del Bloque Administrativo, **Oficina 4** *(Sistemas Integrados de Gestión)*.",
        "Extensión Zipaquirá":              "🏢 **Oficina administrativa, quinto piso**.",
        "Extensión Facatativá":             "🏢 **Segundo piso del Bloque Administrativo**, Oficina SGA.",
        "Centro Académico Deportivo (CAD)": "🏢 Pronto nos veremos en el CAD. Por el momento encuéntranos en la **Sede Fusagasugá, quinto piso del Bloque Administrativo**."
      };
      return ubicaciones[sedeActual] || "🏢 La oficina del SGA se encuentra en el **Bloque Administrativo, quinto piso**.";
    },
    options: [
      { text: "Volver al menú anterior", next: "sedes" },
      { text: "Volver al inicio", next: "inicio" }
    ]
  },

  // --- Medicamentos vencidos ---
  medicamentos: {
    message: `💊 Un medicamento vencido ya no cura, ¡pero sí puede contaminar!  
Escribe el número de la opción que deseas conocer:`,
    options: [
      { text: "2.1 ¿Qué son medicamentos vencidos?", next: "med_que_son" },
      { text: "2.2 ¿Dónde puedo disponer medicamentos vencidos?", next: "med_donde" },
      { text: "2.3 ¿Qué elementos puedo disponer?", next: "med_elementos" },
      { text: "2.4 ¿Qué se hace con ellos?", next: "med_proceso" },
      { text: "Volver al menú anterior", next: "sedes" },
      { text: "Volver al inicio", next: "inicio" }
    ]
  },

  med_que_son: {
    message: `💊 Todos aquellos medicamentos **caducados, en desuso o en mal estado de conservación**,  
o que por temperatura o luz no se hayan guardado correctamente.`,
    options: [
      { text: "Volver", next: "medicamentos" }
    ]
  },

  med_donde: {
    message: `📍 Llévalos a los **contenedores Punto Azul** ubicados en la unidad regional.`,
    options: [
      { text: "Volver", next: "medicamentos" }
    ]
  },

  med_elementos: {
    message: `♻️ **Envases y empaques de medicamentos**, medicamentos que ya no uses o parcialmente consumidos.`,
    options: [
      { text: "Volver", next: "medicamentos" }
    ]
  },

  med_proceso: {
    message: `🌍 Se entregan a la entidad sin ánimo de lucro **Punto Azul**,  
que garantiza su **destrucción mediante incineración controlada**.  
🔗 Más información: [puntoazul.com.co](https://puntoazul.com.co/)`,
    options: [
      { text: "Volver", next: "medicamentos" }
    ]
  },

  // --- Aceite usado ---
  aceite: {
    message: `🛢️ “El ciclo no termina cuando desechas, ¡comienza cuando devuelves!”  
Escribe el número de la opción que deseas conocer:`,
    options: [
      { text: "3.1 ¿Qué es el aceite usado?", next: "aceite_que_es" },
      { text: "3.2 ¿Dónde puedo disponerlo?", next: "aceite_donde" },
      { text: "3.3 ¿Qué elementos puedo disponer?", next: "aceite_elementos" },
      { text: "3.4 ¿Qué se hace con este material?", next: "aceite_proceso" },
      { text: "Volver", next: "sedes" }
    ]
  },

  aceite_que_es: {
    message: `🧈 Es grasa (animal o vegetal) usada para cocinar, que se vuelve un residuo nocivo si no se maneja bien.`,
    options: [{ text: "Volver", next: "aceite" }]
  },

  aceite_donde: {
    message: () => `♻️ **Deposita tu aceite usado** en el punto de recolección del **${ubicacion("aceite")}**.  
Tráelo en una botella bien sellada.`,
    options: [{ text: "Volver", next: "aceite" }]
  },

  aceite_elementos: {
    message: `Solo aceite de cocina usado (de origen vegetal o animal).`,
    options: [{ text: "Volver", next: "aceite" }]
  },

  aceite_proceso: {
    message: `🌿 El programa **Separa2** de la CAR convierte el aceite vegetal usado en **biodiésel**.`,
    options: [{ text: "Volver", next: "aceite" }]
  },

  // --- Pilas y baterías ---
  pilas: {
    message: `🔋 “Las pilas y baterías también tienen un ciclo de vida, ¡ayúdales a cerrarlo responsablemente!”  
Escribe el número de la opción que deseas conocer:`,
    options: [
      { text: "4.1 ¿Qué son las pilas y baterías?", next: "pilas_que_son" },
      { text: "4.2 ¿Dónde puedo disponerlas?", next: "pilas_donde" },
      { text: "4.3 ¿Qué elementos puedo disponer?", next: "pilas_elementos" },
      { text: "4.4 ¿Qué se hace con este material?", next: "pilas_proceso" },
      { text: "Volver", next: "sedes" }
    ]
  },

  pilas_que_son: {
    message: `🔋 Almacenan energía para aparatos eléctricos.  
Contienen **metales peligrosos** (plomo, mercurio) que contaminan si no se disponen correctamente.`,
    options: [{ text: "Volver", next: "pilas" }]
  },

  pilas_donde: {
    message: () => `📍 Encuentra puntos de recolección en **${ubicacion("pilas")}**.`,
    options: [{ text: "Volver", next: "pilas" }]
  },

  pilas_elementos: {
    message: `♻️ Puedes entregar **pilas AA, AAA, de reloj, de celular** y **baterías recargables**.`,
    options: [{ text: "Volver", next: "pilas" }]
  },

  pilas_proceso: {
    message: `🔧 Se envían a **gestores autorizados** donde se separan metales y componentes aprovechables.  
Más info en: [pilascolombia.com](https://www.pilascolombia.com/)`,
    options: [{ text: "Volver", next: "pilas" }]
  },

  // --- Tapas plásticas ---
  tapas: {
    message: `🧢 “Ayudar nunca fue tan fácil: junta tapitas y salva patitas.”  
Escribe el número de la opción que deseas conocer:`,
    options: [
      { text: "5.1 ¿Por qué es importante recolectar tapas plásticas?", next: "tapas_importancia" },
      { text: "5.2 ¿Dónde puedo disponerlas?", next: "tapas_donde" },
      { text: "5.3 ¿Qué elementos puedo disponer?", next: "tapas_elementos" },
      { text: "5.4 ¿Qué se hace con este material?", next: "tapas_proceso" },
      { text: "Volver", next: "sedes" }
    ]
  },

  tapas_importancia: {
    message: `♻️ Recolectarlas evita que lleguen a ríos o rellenos.  
Cada tapa apoya a la **Fundación PATA** y promueve la economía circular.`,
    options: [{ text: "Volver", next: "tapas" }]
  },

  tapas_donde: {
    message: () => `💙 Encuentra puntos de recolección cerca de **${ubicacion("tapas")}**.`,
    options: [{ text: "Volver", next: "tapas" }]
  },

  tapas_elementos: {
    message: `🧢 Se reciben tapas limpias de botellas de agua, jugos, gaseosas, productos de aseo o alimentos.  
No incluyas tapas metálicas ni envases.`,
    options: [{ text: "Volver", next: "tapas" }]
  },

  tapas_proceso: {
    message: `🐾 Las tapas recolectadas se entregan a la **Fundación PATA**, que las convierte en fondos para tratamientos y esterilizaciones de animales.`,
    options: [{ text: "Volver", next: "tapas" }]
  },

  // --- Ropa usada ---
  ropa: {
    message: `👗 “Tu ropa usada aún tiene mucho que contar, ¡entrégala y dale una nueva historia!”  
Escribe el número de la opción que deseas conocer:`,
    options: [
      { text: "6.1 ¿Qué es la moda circular?", next: "ropa_moda" },
      { text: "6.2 ¿Dónde puedo entregarla?", next: "ropa_donde" },
      { text: "6.3 ¿Qué elementos puedo disponer?", next: "ropa_elementos" },
      { text: "6.4 ¿Qué se hace con este material?", next: "ropa_proceso" },
      { text: "Volver", next: "sedes" }
    ]
  },

  ropa_moda: {
    message: `👚 La **moda circular** busca reducir desechos textiles, promoviendo la **reutilización, reparación y reciclaje**.`,
    options: [{ text: "Volver", next: "ropa" }]
  },

  ropa_donde: {
    message: `📍 Lleva tu ropa usada a la **oficina del SGA (quinto piso del bloque administrativo)**.`,
    options: [{ text: "Volver", next: "ropa" }]
  },

  ropa_elementos: {
    message: `👕 Se reciben **camisas, jeans, vestidos, zapatos, bolsos, chaquetas**, etc., en buen o mal estado (pero limpios).`,
    options: [{ text: "Volver", next: "ropa" }]
  },

  ropa_proceso: {
    message: `♻️ La ropa se **dona**, se usa en **Cambiatones**, se entrega a **emprendedores textiles** o se reutiliza como relleno.`,
    options: [{ text: "Volver", next: "ropa" }]
  },

  // --- Botellitas de amor ---
  botellitas: {
    message: `💖 “Cada envoltura que guardas aquí es un paso hacia un mundo más limpio.”  
Escribe el número de la opción que deseas conocer:`,
    options: [
      { text: "7.1 ¿Qué son las Botellitas de Amor?", next: "botellitas_que_son" },
      { text: "7.2 ¿Dónde puedo entregarlas?", next: "botellitas_donde" },
      { text: "7.3 ¿Qué elementos van dentro?", next: "botellitas_elementos" },
      { text: "7.4 ¿Qué se hace con este material?", next: "botellitas_proceso" },
      { text: "Volver", next: "sedes" }
    ]
  },

  botellitas_que_son: {
    message: `🧴 Botellas plásticas (PET) llenas de **plásticos limpios, secos y flexibles** como bolsas, empaques o envolturas.`,
    options: [{ text: "Volver", next: "botellitas" }]
  },

  botellitas_donde: {
    message: `📍 Entrégalas en la **oficina del SGA**, quinto piso del bloque administrativo.`,
    options: [{ text: "Volver", next: "botellitas" }]
  },

  botellitas_elementos: {
    message: `✅ SÍ: bolsas, empaques, vinipel, tapas, envolturas limpias.  
❌ NO: papel, metal, vidrio, tetrabriks, icopor, comida o textiles.`,
    options: [{ text: "Volver", next: "botellitas" }]
  },

  botellitas_proceso: {
    message: `♻️ Se transforman en **sillas, mesas y parques** mediante procesos de reciclaje con fundaciones ambientales.`,
    options: [{ text: "Volver", next: "botellitas" }]
  },

  // --- RAEE ---
  raee: {
    message: `⚙️ “Transforma tus residuos electrónicos en nuevas oportunidades.”  
Escribe el número de la opción que deseas conocer:`,
    options: [
      { text: "8.1 ¿Qué son los RAEE?", next: "raee_que_son" },
      { text: "8.2 ¿Dónde puedo entregarlos?", next: "raee_donde" },
      { text: "8.3 ¿Qué elementos puedo disponer?", next: "raee_elementos" },
      { text: "8.4 ¿Qué se hace con este material?", next: "raee_proceso" },
      { text: "Volver", next: "sedes" }
    ]
  },

  raee_que_son: {
    message: `💻 Residuos de aparatos eléctricos y electrónicos desechados (computadores, celulares, televisores).  
Contienen metales como plomo, mercurio y cadmio.`,
    options: [{ text: "Volver", next: "raee" }]
  },

  raee_donde: {
    message: `📍 Llévalos a la **oficina del SGA (quinto piso)**.  
¡Dale un cierre responsable a lo que ya no usas! 🌱`,
    options: [{ text: "Volver", next: "raee" }]
  },

  raee_elementos: {
    message: `Puedes traer **mouses, teclados, cables, celulares dañados, audífonos, relojes digitales, computadores, pantallas y electrodomésticos**.`,
    options: [{ text: "Volver", next: "raee" }]
  },

  raee_proceso: {
    message: `🔋 Los residuos se entregan a **organizaciones que los remanufacturan o aprovechan**.  
Los peligrosos reciben disposición final adecuada.`,
    options: [{ text: "Volver", next: "raee" }]
  },

  // --- Voluntariado ---
  voluntariado: {
    message: `🌱 “Pequeñas acciones, grandes transformaciones.”  
Escribe el número de la opción que deseas conocer:`,
    options: [
      { text: "9.1 ¿Qué es el voluntariado ambiental?", next: "voluntariado_que_es" },
      { text: "9.2 ¿Cómo puedo participar?", next: "voluntariado_como" },
      { text: "Volver", next: "sedes" }
    ]
  },

  voluntariado_que_es: {
    message: `💚 Participación libre y altruista en acciones de conservación, restauración, lucha contra el cambio climático y sostenibilidad.`,
    options: [{ text: "Volver", next: "voluntariado" }]
  },

  voluntariado_como: {
    message: `🌿 Inscríbete en el voluntariado del SGA:  
👉 [Formulario de inscripción](https://forms.office.com/r/g8BJKJiLf8)  
¡Tu compromiso transforma nuestro entorno! 💪`,
    options: [{ text: "Volver", next: "voluntariado" }]
  },

  // --- Canales de comunicación ---
  canales: {
    message: `📩 Escríbenos a:  
**sgambiental.fusagasuga@ucundinamarca.edu.co**  
💚 Estaremos atentos a responderte lo más rápido posible.`,
    options: [{ text: "Volver al inicio", next: "inicio" }]
  }
};


// Lógica de interacción

let currentNode = "inicio";

function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.classList.add("message", sender === "bot" ? "bot-message" : "user-message");
  // Render small subset of markdown safely (bold, italic, links)
  div.innerHTML = parseMarkdown(text);
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showNode(key) {
  currentNode = key;
  const node = flow[key];
  if (!node) return;

  // El mensaje puede ser string o función (para mensajes dinámicos con sede)
  const msg = typeof node.message === "function" ? node.message() : node.message;
  addMessage(msg, "bot");

  if (node.options) {
    const container = document.createElement("div");
    container.classList.add("options");
    node.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.classList.add("option-btn");
      // Mostrar formato (negrita/itálica/enlaces) en el texto de la opción
      btn.innerHTML = parseMarkdown(opt.text);
      btn.onclick = () => {
        // Guardar sede si la opción la trae
        if (opt.sede) sedeActual = opt.sede;
        // Limpiar sede al volver al inicio
        if (opt.next === "inicio") sedeActual = null;
        addMessage(opt.text, "user");
        setTimeout(() => showNode(opt.next), 400);
      };
      container.appendChild(btn);
    });
    chatBox.appendChild(container);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Convierte un pequeño subconjunto de Markdown inline a HTML seguro.
function parseMarkdown(input) {
  if (typeof input !== 'string') return '';
  // Escapar HTML primero
  const esc = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Links: [text](url)
  const withLinks = esc.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => {
    try {
      const safeUrl = (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) ? url : '#';
      return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    } catch (e) {
      return text;
    }
  });

  // Bold **text**
  const withBold = withLinks.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic *text*
  const withItalic = withBold.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Preserve line breaks
  return withItalic.replace(/\n/g, '<br>');
}

  // Normaliza texto: quita acentos y signos, devuelve en minúsculas
  function normalizeText(s) {
    return s
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Empareja la entrada del usuario con la mejor opción disponible en el nodo actual.
  function matchInputToOption(input, node) {
    if (!node || !node.options) return null;
    const normalizedInput = normalizeText(input);
    // Try exact number like "2" or "2.1"
    const asNum = parseInt(input);
    if (!isNaN(asNum) && asNum >= 1 && asNum <= node.options.length) {
      return asNum - 1;
    }

    let bestIndex = -1;
    let bestScore = 0;

    const inputWords = normalizedInput.split(' ').filter(Boolean);

    node.options.forEach((opt, idx) => {
      // Remove leading numbering from option text (e.g., "2.1 ")
      const label = opt.text.replace(/^\s*\d+(?:\.\d+)?\s*/,'');
      const normLabel = normalizeText(label);
      if (!normLabel) return;

      // Exact or substring matches get high score
      if (normLabel === normalizedInput || normLabel.includes(normalizedInput) || normalizedInput.includes(normLabel)) {
        if (bestScore < 100) {
          bestScore = 100;
          bestIndex = idx;
        }
        return;
      }

      // Word overlap score
      const labelWords = normLabel.split(' ').filter(Boolean);
      const common = inputWords.filter(w => labelWords.includes(w)).length;
      if (common > 0 && common > bestScore) {
        bestScore = common;
        bestIndex = idx;
      }
    });

    return bestScore > 0 ? bestIndex : null;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = userInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    userInput.value = "";

    // Detectar despedida
      const normalized = normalizeText(text);

      // Detectar saludo — si hay saludo, volver al inicio
      if (saludos.some(s => normalized.includes(normalizeText(s)))) {
        setTimeout(() => {
          addMessage("👋 ¡Hola! Como estas?", "bot");
          setTimeout(() => showNode("inicio"), 300);
        }, 300);
        return;
      }

      // Detectar despedida
      if (despedidas.some(d => normalized.includes(normalizeText(d)))) {
      setTimeout(() => {
        addMessage("🌿 Gracias por visitar el SGA Ucundinamarca. ¡Hasta pronto! 👋");
      }, 500);
      return;
    }

    const node = flow[currentNode];

    // Primero intentar número tal como antes
    const num = parseInt(text);
    if (node && node.options && !isNaN(num) && num >= 1 && num <= node.options.length) {
      const opt = node.options[num - 1];
      if (opt.sede) sedeActual = opt.sede;
      if (opt.next === "inicio") sedeActual = null;
      setTimeout(() => showNode(opt.next), 400);
      return;
    }

    // Intentar emparejar por texto/keywords
    const matchIdx = matchInputToOption(text, node);
    if (matchIdx !== null) {
      const opt = node.options[matchIdx];
      if (opt.sede) sedeActual = opt.sede;
      if (opt.next === "inicio") sedeActual = null;
      setTimeout(() => showNode(opt.next), 400);
      return;
    }

    // Si no se encontró coincidencia
    setTimeout(() => {
      addMessage("🤔 No entendí tu respuesta. Puedes escribir el número o intentar con palabras clave como 'oficina', 'medicamentos', 'aceite', etc.");
    }, 500);
  });

// Iniciar chat
showNode("inicio");
