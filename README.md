# NidU — prototipo web

Prototipo funcional de NidU: marketplace de arriendos para estudiantes foráneos
cerca de sus universidades en Guayaquil (ESPOL, UG, UCSG, UEES). Es una SPA sin
dependencias de build: se abre con doble clic en `index.html` o se sirve como
sitio estático.

## Estructura

```
index.html          Estructura HTML + sprite de íconos SVG. Enlaza CSS y JS.
css/
  styles.css        Todos los estilos (variables de tema, componentes, layout).
js/
  data.js           Datos y estado: universidades, zonas, agentes, arriendos (L),
                    reseñas, el objeto de estado `S` y helpers base (initials, mhead,
                    persistencia en localStorage).
  ui.js             Helpers, mapa SVG (con zoom/paneo), router y todas las vistas
                    (renderLanding, renderAuth, renderExplore, renderDetail,
                    renderAgent, renderPublish, perfil/amigos/zonas y modales).
  app.js            Delegación de eventos (un solo listener por tipo) y arranque.
icon*.png word*.png  Logotipos.
```

Los scripts se cargan como scripts clásicos en orden (`data → ui → app`) y
comparten un único ámbito global, por eso funciona también abierto como archivo
local (`file://`), sin módulos ES ni servidor.

## Decisiones de diseño

- **Separación por responsabilidad** (datos / vistas / eventos) para que cada
  parte sea ubicable y modificable sin tocar el resto.
- **Sin duplicación**: `initials()` centraliza las iniciales de avatares y
  `mhead()` la cabecera de los modales (antes repetidas decenas de veces).
- **Estado único `S`** con persistencia selectiva en localStorage.
- **Un router por hash** (`render()`), con una tabla vista→función; agregar una
  vista nueva es: añadir su sección en `index.html`, su `render*` en `ui.js` y
  registrarla en `VIEWS` y en el mapa del router.
- **Eventos delegados** por `data-act`, así el HTML dinámico no necesita
  re-enganchar listeners.

## Sobre TypeScript

El prototipo se entrega como sitio estático de cero configuración (se abre con
doble clic, sin `npm`/compilador). TypeScript requeriría un paso de build y un
bundler, lo que rompería ese flujo. El código queda organizado en módulos planos
y documentado; migrar a TS/ESM es directo cuando exista un empaquetador.

## Ejecutar

Abre `index.html` en el navegador, o sirve la carpeta con cualquier servidor
estático.
