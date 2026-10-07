# Cómo agregar las capturas de los proyectos (Universo Desarrollo)

1. Cada proyecto tiene su **carpeta** aquí dentro. Ya están creadas:

   | Carpeta | Proyecto |
   |---|---|
   | `connexo-clients` | Connexo Clients app |
   | `connexo-sellers` | Connexo Sellers app |
   | `easyxplorer-web` | EasyXplorer, página web |
   | `fundacion-arupo-web` | Fundación Arupo, página web |
   | `connexo-ecuador-web` | Connexo Ecuador, página web |
   | `koda-app` | KODA app |
   | `arupo-medtrack` | Arupo MedTrack app |
   | `crm-arupo` | CRM del Centro Terapéutico Integral Arupo |
   | `centro-terapeutico-arupo-web` | Centro Terapéutico Integral Arupo, página web |
   | `widget-accesibilidad` | Widget de accesibilidad |
   | `project-chaos-dominion` | Project Chaos Dominion |
   | `web-hoteleria` | Web para hotelería |
   | `web-restaurantes` | Web para restaurantes |

2. Dentro de cada carpeta pon las capturas con estos nombres:

   - **Vista de computador:** `pc-1.png`, `pc-2.png`, `pc-3.png`…
   - **Vista de celular:** `movil-1.png`, `movil-2.png`…

   Reglas:
   - Sirven PNG, JPG, WEBP. No hace falta reducirlas.
   - Pueden ser **capturas de página completa** (largas): en la web se podrán desplazar dentro del marco.
   - Para el celular, usa capturas con el ancho de un celular (unos 390 px) o de la vista móvil del navegador.
   - Pon primero (`pc-1`, `movil-1`) la mejor: es la que se ve en la tarjeta.
   - Si un proyecto solo tiene una de las dos vistas (por ejemplo una app solo en móvil), no pasa nada.

3. En la terminal, dentro del proyecto, corre:

   ```
   npm run proyectos
   ```

   Crea las versiones ligeras para la web. Se puede repetir cuando quieras: solo procesa lo nuevo.

4. Revisa con `npm run dev` → Universos → Desarrollo → Proyectos. Para publicar: commit + push como siempre
   (esta carpeta con tus capturas originales **no se sube**).

## Textos de cada proyecto

Se editan en `lib/development.ts`, sección `devProjects`: descripción, cliente, qué hace (`features`),
tecnologías (`stack`), enlaces y la dirección pública (`liveUrl`) para ver el sitio real en PC y móvil.

## Antes de publicar una captura

- Revisa que **no salgan datos reales** de personas (nombres, cédulas, correos, teléfonos, historiales médicos…).
  Esto importa especialmente en el CRM y en la app MedTrack: usa datos de ejemplo o difumina la información.
- Revisa que no se vean claves, tokens ni direcciones internas.
