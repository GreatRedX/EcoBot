# Chatbot SGA — PEPE

Repositorio del chatbot ambiental "PEPE" — Sistema de Gestión Ambiental · Ucundinamarca

Contenido
- `Chatbot/` — interfaz (HTML/CSS/JS) del chatbot: `index.html`, `script.js`, `style.css`.
- `convertir.py` — (posible script de conversión o procesamiento de datos)
- `CHAT BOT SGA 8.10.25.csv` — datos/entrada (si procede)

Objetivo
Este repositorio contiene el asistente ambiental (frontend ligero) que muestra menús y respuestas. Se agregó reciente lógica para aceptar respuestas por texto (keywords) y detección de saludos/despedidas.

Cómo probar localmente
1. Abrir `Chatbot/index.html` en un navegador (doble clic o "Abrir con").
2. Escribir en el input o pulsar botones para navegar el flujo.

Git
- Commit inicial hecho localmente.
- Para publicar en GitHub (ejemplo):

```powershell
# 1) Crear repositorio en GitHub (por la web) y copiar la url remota (ej. https://github.com/<usuario>/chatbot-sga.git)
# 2) Añadir remoto y subir:
git remote add origin https://github.com/<usuario>/chatbot-sga.git
git branch -M main
git push -u origin main
```

Mejoras sugeridas
- Añadir un campo `keywords` por cada opción en `Chatbot/script.js` para mejorar el matching.
- Añadir tests end-to-end simples o un pequeño script de smoke-test.

Licencia
Añade aquí la licencia que prefieras (MIT, Apache-2.0, etc.).
