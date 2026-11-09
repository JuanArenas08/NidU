# NidU — prototipo web

**NidU** es un prototipo funcional de una plataforma que ayuda a los
**estudiantes foráneos de Guayaquil** (ESPOL, UG, UCSG, UEES) a encontrar y
comparar **arriendos cerca de su universidad**, según su presupuesto, la
seguridad de la zona y las rutas de transporte. Del otro lado, los **agentes
inmobiliarios** publican y administran sus arriendos y llegan directo a esos
estudiantes.

> Proyecto académico de *Emprendimiento e Innovación* (ESPOL, 2026-PAO2) —
> Grupo *Los desubicados*. Es un **prototipo de media fidelidad**: los datos son
> de ejemplo y los servicios externos (inicio de sesión universitario, SMS,
> pagos) están **simulados**, no son reales.

---

## Cómo probarlo

No requiere instalar nada ni un servidor:

1. Descomprime el proyecto.
2. Abre **`index.html`** con doble clic en tu navegador.

### Formas de entrar

- **Probar como estudiante / agente** (botones en la pantalla de inicio de
  sesión): entras en **modo prueba**. Puedes navegar y explorar todo, pero al
  intentar una función (contactar, agendar, publicar…) aparece un aviso para
  iniciar sesión o crear cuenta.
- **Estudiante (flujo completo):** elige tu universidad → escribe cualquier
  contraseña → ingresa cualquier código de 4 a 6 dígitos (SMS de demostración)
  → define presupuesto y teléfono.
- **Agente (flujo completo):** crea una cuenta con una contraseña segura, sube
  los documentos, verifica por SMS y completa el pago de suscripción (todo de
  demostración; no se cobra nada).

---

## Qué puede hacer

**Estudiante**
- Explorar arriendos en un mapa con filtros, orden y comparación de hasta 3.
- Ver el detalle: costo real al mes, seguridad de la zona (índice NidU +
  opiniones de estudiantes), rutas de bus de ida y regreso, reseñas y el perfil
  del agente.
- Contactar al agente (bandeja **Mis mensajes**) y **agendar visitas**.
- **Arriendo compartido**: invitar amigos o dejar cupo abierto, con contrato,
  firma y pago por cada roommate.
- Calificar la **seguridad de las zonas** con sus opiniones.
- Perfil con su calificación, historial, reseñas y datos de contacto.
- Regla: un estudiante solo puede tener **un arriendo activo** a la vez.

**Agente**
- Panel con métricas (vistas, interesados, tasa de contacto).
- Publicar arriendos (fotos, precio comparado con la zona, zona ↔ mapa).
- Administrar arriendos (disponibles / pausados / arrendados) e inquilinos.
- Responder mensajes y **vincular** a un estudiante con su arriendo.
- Perfil visible para los estudiantes.

---

## Estructura del proyecto

```
NidU-web/
├─ index.html          Estructura de la página y sprite de íconos (SVG)
├─ README.md           Este archivo
├─ css/
│  └─ styles.css       Estilos: tema, componentes y diseño responsive
├─ js/
│  ├─ data.js          Datos de ejemplo, estado global (S) y helpers base
│  ├─ ui.js            Mapa, enrutador y todas las vistas (funciones render*)
│  └─ app.js           Manejo de eventos y arranque de la app
└─ resources/
   ├─ icon.png, word.png, …        Logotipos
   └─ nidu-mapa-navegacion.html    Mapa de navegación del prototipo
```

---

## Tecnologías

Solo **HTML, CSS y JavaScript** puro: sin frameworks, sin dependencias y **sin
paso de compilación**. La única carga externa son las tipografías de Google
Fonts. Por eso el proyecto funciona igual abierto como archivo local
(`file://`) o publicado como sitio estático.

Los scripts se cargan en orden (`data.js` → `ui.js` → `app.js`) y comparten un
mismo ámbito global.

## Cómo está organizado el código

- **Estado único `S`** (en `data.js`): guarda el usuario, los filtros, los
  arriendos seleccionados, etc. Lo importante se persiste en `localStorage`.
- **Enrutador por hash** (en `ui.js`): la URL (`#explorar`, `#arriendo`,
  `#agente`…) decide qué pantalla se dibuja, mediante una tabla
  *vista → función `render*`*.
- **Eventos delegados** (en `app.js`): un solo manejador lee el atributo
  `data-act` de cada botón, así el HTML que se genera no necesita volver a
  enlazar eventos.

**Para agregar una pantalla nueva:** añade su `<section>` en `index.html`, su
función `render*` en `ui.js`, y regístrala en la lista `VIEWS` y en la tabla del
enrutador. Para una acción nueva, añade un `data-act` al botón y su caso en
`app.js`.

---

## Limitaciones (es un prototipo)

- Los arriendos, agentes y reseñas son **datos de ejemplo**.
- La información se guarda **solo en el navegador** (`localStorage`); no hay
  servidor ni base de datos compartida.
- El inicio de sesión universitario, la verificación por SMS y los pagos están
  **simulados** (no validan ni cobran nada real).
- El mapa es **ilustrativo**, con avenidas y zonas de Guayaquil basadas en datos
  públicos.

Para una versión real (alta fidelidad) haría falta backend, base de datos,
autenticación real, pasarela de pagos y un mapa con datos en vivo.

---

*NidU · Grupo Los desubicados · ESPOL — Emprendimiento e Innovación 2026-PAO2.*
