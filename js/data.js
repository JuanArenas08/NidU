/* NidU · data.js — datos, estado (S) y helpers base
   Prototipo de arriendos para estudiantes foráneos (ESPOL / Guayaquil).
   Archivo generado al refactorizar el HTML monolítico en módulos. */
/* ===================== HELPERS COMPARTIDOS ===================== */
// Iniciales de un nombre (máx. 2). Centraliza un patrón repetido en todo el código.
const initials=s=>String(s==null?'':s).split(' ').map(w=>w[0]).filter(Boolean).slice(0,2).join('');
// Cabecera estándar de un modal (título + botón cerrar).
const mhead=t=>`<div class="mh"><h3>${t}</h3><button class="iconbtn" data-act="close">${ic('i-x')}</button></div>`;


/* ===================== DATA ===================== */
const UNIS={
  espol:{n:'ESPOL',full:'ESPOL · Campus Gustavo Galindo',x:300,y:236},
  ug:{n:'U. de Guayaquil',full:'Universidad de Guayaquil · Cdla. Universitaria',x:640,y:352},
  ucsg:{n:'UCSG',full:'Universidad Católica de Santiago de Guayaquil',x:552,y:468},
  uees:{n:'UEES',full:'UEES · Samborondón',x:948,y:226}
};
const ZAVG={Prosperina:172,Ceibos:235,Mapasingue:132,Urdesa:238,Kennedy:220,Centenario:188,Centro:205,Alborada:168,Sauces:150,'Samborondón':330,'Vía a la Costa':260};
const ZONEXY={Prosperina:[392,330],Ceibos:[205,345],Mapasingue:[450,305],Urdesa:[505,405],Kennedy:[685,320],Centenario:[612,540],Centro:[745,505],Alborada:[720,215],Sauces:[785,150],'Samborondón':[960,300],'Vía a la Costa':[120,430]};

const ZSAFE={Prosperina:{s:3.6,l:'Media en calles internas',upc:'UPC a 400 m',r:'Pocos reportes'},Ceibos:{s:4.5,l:'Buena',upc:'UPC a 600 m',r:'Muy pocos reportes'},Mapasingue:{s:2.7,l:'Baja en calles internas',upc:'UPC a 900 m',r:'Robos reportados de noche'},Urdesa:{s:4.2,l:'Buena',upc:'UPC a 300 m',r:'Pocos reportes'},Kennedy:{s:4.1,l:'Buena',upc:'UPC a 500 m',r:'Pocos reportes'},Centenario:{s:4.0,l:'Buena',upc:'UPC a 700 m',r:'Pocos reportes'},Centro:{s:3.1,l:'Buena en avenidas',upc:'UPC a 200 m',r:'Reportes en la noche'},Alborada:{s:3.8,l:'Media',upc:'UPC a 450 m',r:'Algunos reportes'},Sauces:{s:3.4,l:'Media',upc:'UPC a 800 m',r:'Algunos reportes'},'Samborondón':{s:4.8,l:'Muy buena',upc:'Guardia privada',r:'Muy pocos reportes'},'Vía a la Costa':{s:4.4,l:'Buena',upc:'Guardia privada',r:'Pocos reportes'}};
const ORIG={milagro:{n:'Milagro',c:1.50,t:75},daule:{n:'Daule',c:1.00,t:50},duran:{n:'Durán',c:0.60,t:45},babahoyo:{n:'Babahoyo',c:2.25,t:100},salinas:{n:'Salinas',c:4.00,t:150},quevedo:{n:'Quevedo',c:6.50,t:180},machala:{n:'Machala',c:7.00,t:210},manta:{n:'Manta',c:8.00,t:240},otra:{n:'Otra ciudad',c:5.00,t:180}};
const EXTRA={wifi:25,luz:18,agua:8};
const AGENTS={
  carlos:{n:'Carlos Ríos',ini:'CR',col:'#07275C',v:true,r:4.8,rv:32,ph:'099 412 3388',email:'carlos.rios@nidu.ec',agency:'Agente independiente',lic:'RUC 0912345678001',joined:'marzo 2025',bio:'Agente independiente enfocado en arriendos para estudiantes foráneos cerca de ESPOL y la Vía a la Costa. Respondo rápido y acompaño la visita.'},
  puerto:{n:'Inmobiliaria Puerto Sol',ini:'PS',col:'#0469E6',v:true,r:4.6,rv:58,ph:'04 268 1190',email:'contacto@puertosol.ec',agency:'Inmobiliaria',lic:'RUC 0991234567001',joined:'enero 2024',bio:'Inmobiliaria con cartera de suites y mini departamentos en el norte de Guayaquil.'},
  andrea:{n:'Andrea Mora',ini:'AM',col:'#7C5CC4',v:true,r:4.9,rv:21,ph:'098 776 1203',email:'andrea.mora@nidu.ec',agency:'Agente independiente',lic:'RUC 0923456789001',joined:'agosto 2025',bio:'Propietaria de varias habitaciones cerca de la UG y la UCSG.'},
  luis:{n:'Luis Vera',ini:'LV',col:'#2F8F6B',v:false,r:4.2,rv:9,ph:'096 330 5521',email:'luis.vera@correo.com',agency:'Propietario',lic:'En verificación',joined:'octubre 2026',bio:'Propietario de habitaciones económicas cerca de la Perimetral.'}
};
const SVC={wifi:['Wifi','i-wifi'],agua:['Agua','i-drop'],luz:['Luz eléctrica','i-zap'],amoblado:['Amoblado','i-sofa'],lavanderia:['Lavandería','i-wash'],parqueo:['Parqueo','i-car'],aire:['Aire acondicionado','i-snow']};
const TYPES={'Habitación':'i-bed','Mini depa':'i-home','Compartido':'i-users','Suite':'i-building'};
let NID=100;
const L=[
 {id:1,t:'Habitación amoblada en Prosperina',type:'Habitación',zone:'Prosperina',x:356,y:300,price:170,m2:14,bath:'Privado',sv:['wifi','agua','luz','amoblado'],cond:['Garantía de 1 mes','Contrato mínimo de 6 meses','Solo estudiantes · máx. 1 persona','Edificio con guardia 24/7'],ag:'carlos',pal:0,isNew:true,views:124,contacts:7,st:true,desc:'Habitación luminosa con escritorio, closet y ventana a la calle. A dos cuadras de la parada de buses hacia la Vía Perimetral.'},
 {id:2,t:'Mini depa en Ceibos Norte',type:'Mini depa',zone:'Ceibos',x:196,y:330,price:240,m2:32,bath:'Privado',sv:['wifi','agua','luz','amoblado','parqueo'],cond:['Garantía de 1 mes','Contrato de 12 meses','Cocina equipada','Conjunto cerrado'],ag:'carlos',pal:1,views:98,contacts:6,st:true,desc:'Mini departamento independiente con cocina, sala pequeña y baño propio. Ideal si buscas privacidad.'},
 {id:3,t:'Cuarto con baño privado',type:'Habitación',zone:'Prosperina',x:388,y:252,price:150,m2:12,bath:'Privado',sv:['agua','luz','wifi'],cond:['Garantía de 1 mes','Contrato mínimo de 5 meses','No se permiten mascotas'],ag:'andrea',pal:2,views:61,contacts:3,st:true,desc:'Cuarto en casa de dos pisos, entrada independiente. Muy cerca del ingreso a ESPOL.'},
 {id:4,t:'Habitación en casa familiar',type:'Habitación',zone:'Mapasingue',x:434,y:330,price:125,m2:11,bath:'Compartido',sv:['agua','luz','lavanderia'],cond:['Sin garantía','Contrato mes a mes','Incluye uso de cocina'],ag:'luis',pal:3,views:40,contacts:1,st:true,desc:'Habitación sencilla en casa de familia. Ambiente tranquilo para estudiar.'},
 {id:5,t:'Departamento compartido (2 hab.)',type:'Compartido',zone:'Ceibos',x:236,y:392,price:205,m2:22,bath:'Compartido',sv:['wifi','agua','luz','amoblado','lavanderia'],cond:['Garantía de 1 mes','Contrato de 6 meses','Compartes con 1 estudiante de ESPOL'],ag:'puerto',pal:4,views:77,contacts:5,st:true,desc:'Departamento de 2 habitaciones; se arrienda una. Tu compañera de depa estudia en ESPOL.'},
 {id:6,t:'Suite estudiantil en Urdesa',type:'Suite',zone:'Urdesa',x:486,y:418,price:285,m2:28,bath:'Privado',sv:['wifi','agua','luz','amoblado','aire','lavanderia'],cond:['Garantía de 2 meses','Contrato de 12 meses','Edificio con guardia y cámaras'],ag:'puerto',pal:1,views:150,contacts:9,st:true,desc:'Suite con aire acondicionado, en zona con mucho comercio y buena conexión de buses.'},
 {id:7,t:'Habitación económica cerca de la Perimetral',type:'Habitación',zone:'Mapasingue',x:410,y:286,price:115,m2:10,bath:'Compartido',sv:['agua','luz'],cond:['Sin garantía','Contrato mes a mes'],ag:'luis',pal:2,views:33,contacts:2,st:true,desc:'Opción económica, a 10 minutos en bus de ESPOL.'},
 {id:8,t:'Habitación junto a la Cdla. Universitaria',type:'Habitación',zone:'Kennedy',x:612,y:322,price:165,m2:13,bath:'Privado',sv:['wifi','agua','luz','amoblado'],cond:['Garantía de 1 mes','Contrato de 6 meses','Solo estudiantes'],ag:'andrea',pal:0,isNew:true,views:58,contacts:4,st:true,desc:'A pocos pasos de la Universidad de Guayaquil. Zona con farmacias, comida y transporte.'},
 {id:9,t:'Mini depa en Kennedy Norte',type:'Mini depa',zone:'Kennedy',x:702,y:308,price:265,m2:30,bath:'Privado',sv:['wifi','agua','luz','amoblado','aire','parqueo'],cond:['Garantía de 2 meses','Contrato de 12 meses'],ag:'puerto',pal:4,views:88,contacts:4,st:true,desc:'Mini depa moderno con aire acondicionado y parqueo.'},
 {id:10,t:'Cuarto en Urdesa Central',type:'Habitación',zone:'Urdesa',x:530,y:392,price:195,m2:13,bath:'Compartido',sv:['wifi','agua','luz','amoblado'],cond:['Garantía de 1 mes','Contrato de 6 meses'],ag:'carlos',pal:3,views:71,contacts:3,st:false,desc:'Habitación cómoda en casa compartida con otros dos estudiantes.'},
 {id:11,t:'Habitación en Barrio Centenario',type:'Habitación',zone:'Centenario',x:604,y:530,price:175,m2:15,bath:'Privado',sv:['wifi','agua','luz'],cond:['Garantía de 1 mes','Contrato de 6 meses'],ag:'andrea',pal:2,views:44,contacts:2,st:true,desc:'Barrio residencial tranquilo, cerca de la UCSG.'},
 {id:12,t:'Mini depa en el Centro',type:'Mini depa',zone:'Centro',x:730,y:500,price:220,m2:26,bath:'Privado',sv:['wifi','agua','luz','amoblado'],cond:['Garantía de 1 mes','Contrato de 12 meses'],ag:'puerto',pal:0,views:66,contacts:3,st:true,desc:'Cerca de la Metrovía y del malecón.'},
 {id:13,t:'Habitación en la Alborada',type:'Habitación',zone:'Alborada',x:716,y:198,price:155,m2:12,bath:'Compartido',sv:['wifi','agua','luz','lavanderia'],cond:['Garantía de 1 mes','Contrato de 6 meses'],ag:'luis',pal:4,views:39,contacts:1,st:true,desc:'Habitación en ciudadela con buena oferta de transporte.'},
 {id:14,t:'Depa compartido en Sauces',type:'Compartido',zone:'Sauces',x:782,y:148,price:140,m2:18,bath:'Compartido',sv:['agua','luz','wifi'],cond:['Sin garantía','Contrato de 6 meses'],ag:'andrea',pal:3,views:29,contacts:1,st:true,desc:'Compartes con dos estudiantes de otras provincias.'},
 {id:15,t:'Suite en Samborondón',type:'Suite',zone:'Samborondón',x:966,y:292,price:330,m2:34,bath:'Privado',sv:['wifi','agua','luz','amoblado','aire','parqueo','lavanderia'],cond:['Garantía de 2 meses','Contrato de 12 meses','Urbanización privada'],ag:'puerto',pal:1,views:102,contacts:5,st:true,desc:'Suite amplia a minutos de la UEES.'},
 {id:16,t:'Habitación en Vía a la Costa',type:'Habitación',zone:'Vía a la Costa',x:110,y:420,price:210,m2:16,bath:'Privado',sv:['wifi','agua','luz','amoblado','parqueo'],cond:['Garantía de 1 mes','Contrato de 6 meses','Urbanización cerrada'],ag:'carlos',pal:2,views:47,contacts:2,st:true,desc:'Urbanización cerrada, ideal si tienes carro o vas en expreso.'}
];

[1,2,5,6,8,9,12,15,16].forEach(i=>L.find(l=>l.id===i).vph=true);
const TEN={1:[{n:'Luis Carrión',from:'Milagro',u:'ESPOL',since:'15 ago 2026',months:3,pay:'al día',amount:170,next:'1 dic 2026'}],2:[{n:'Doménica Vera',from:'Manta',u:'ESPOL',since:'1 jun 2026',months:5,pay:'atrasado',lateDays:8,amount:240,next:'5 nov 2026'}],16:[{n:'Mateo Salas',from:'Quevedo',u:'ESPOL',since:'1 oct 2026',months:1,pay:'al día',amount:210,next:'1 dic 2026'}]};
Object.entries(TEN).forEach(([id,t])=>{const l=L.find(x=>x.id==id);if(l){l.rented=true;l.tenants=t;}});
const RPOOL=[
 {n:'Daniela P.',from:'Milagro',u:'ESPOL',r:5,a:[5,4,5,5],t:'El cuarto es tal cual las fotos. El dueño responde rápido y la parada de bus está a una cuadra.'},
 {n:'Kevin M.',from:'Quevedo',u:'ESPOL',r:4,a:[4,3,5,4],t:'Buen internet para clases virtuales. A veces hay ruido el fin de semana.'},
 {n:'Ana Lucía R.',from:'Machala',u:'UG',r:4,a:[4,4,4,5],t:'La dueña es muy atenta y el contrato fue claro desde el inicio.'},
 {n:'Bryan S.',from:'Babahoyo',u:'UCSG',r:3,a:[3,3,4,3],t:'El precio está bien, pero el agua caliente falla seguido.'},
 {n:'Fernanda T.',from:'Salinas',u:'ESPOL',r:5,a:[5,5,4,5],t:'Lo mejor fue dejar de viajar casi 5 horas diarias. Muy tranquilo para estudiar.'},
 {n:'Jorge V.',from:'Daule',u:'UG',r:4,a:[4,4,3,4],t:'Zona con comida y farmacias cerca. El wifi podría ser mejor.'}];
const RCOL=['#0469E6','#2F8F6B','#7C5CC4','#E2725B','#07275C','#B07400'];
const REV={};
const FR={
 dome:{n:'Doménica Vera',from:'Manta',u:'ESPOL',col:'#E2725B',rating:4.7,renting:{where:'Mini depa en Ceibos Norte',until:'feb 2027',mates:[]},places:['Suite en Urdesa','Habitación en Kennedy'],reviews:4},
 mateo:{n:'Mateo Salas',from:'Quevedo',u:'ESPOL',col:'#2F8F6B',rating:4.9,renting:{where:'Habitación en Vía a la Costa',until:'abr 2027',mates:[]},places:['Habitación en Mapasingue'],reviews:2},
 valen:{n:'Valentina Cruz',from:'Machala',u:'UCSG',col:'#7C5CC4',rating:4.5,renting:null,places:['Habitación en Centenario','Depa compartido en Sauces'],reviews:5},
 kevin:{n:'Kevin Mora',from:'Babahoyo',u:'UG',col:'#0469E6',rating:4.2,renting:null,places:['Habitación junto a la UG'],reviews:3},
 ana:{n:'Ana Lucía R.',from:'Salinas',u:'ESPOL',col:'#B07400',rating:4.8,renting:{where:'Depa compartido en Sauces',until:'ene 2027',mates:['Bryan S.']},places:[],reviews:6},
 bryan:{n:'Bryan Soto',from:'Daule',u:'UG',col:'#07275C',rating:4.0,renting:null,places:['Mini depa en Kennedy Norte'],reviews:1}
};
L.forEach(l=>{const k=(l.id*7)%RPOOL.length;const n=(l.id===7||l.id===14)?1:(l.id%3)+2;const low=(ZSAFE[l.zone]||{s:4}).s<3.2;REV[l.id]=Array.from({length:n},(_,i)=>{const b=RPOOL[(k+i*2)%RPOOL.length];return {...b,a:[low?Math.min(b.a[0],3):b.a[0],...b.a.slice(1)],h:['hace 2 semanas','hace 1 mes','hace 3 meses','hace 5 meses'][i%4],col:RCOL[(k+i)%RCOL.length]};});});
const S={user:null,uni:'espol',budget:180,notify:true,fav:new Set([3]),sel:null,dir:'ida',orig:'milagro',verif:null,prof:false,authMail:null,cmp:new Set(),rvStar:5,upl:{},
  f:{min:80,max:350,zones:new Set(),types:new Set(),sv:new Set(),dist:8,sort:'cerca',q:'',safe:0,vph:false},
  subscribed:false,
  notifStudent:[{t:'Nuevo arriendo cerca de ESPOL',s:'Habitación amoblada en Prosperina · $170/mes',id:1,h:'hace 2 h',k:'new'},{t:'Bajó de precio',s:'Cuarto con baño privado · ahora $150',id:3,h:'ayer',k:'price'}],
  notifAgent:[{t:'Nuevo mensaje de Juan Pablo Arenas',s:'Sobre: Habitación amoblada en Prosperina',id:1,h:'10:24',k:'msg'},{t:'Nueva reseña · 4★',s:'Mini depa en Ceibos Norte: "Buen internet para clases"',id:2,h:'ayer',k:'rev'},{t:'Un usuario reportó un anuncio',s:'Cuarto en Urdesa Central: las fotos no coinciden',id:10,h:'hace 2 días',k:'report'},{t:'Pago atrasado',s:'Doménica Vera lleva 8 días de atraso · Mini depa en Ceibos',id:2,h:'hace 3 días',k:'pay'}],
  notifApp:[{t:'Novedad en NidU',s:'Ahora puedes comparar hasta 3 arriendos lado a lado',h:'esta semana',k:'app'},{t:'Mejoramos el mapa y las rutas de bus',s:'Más rápido y con líneas actualizadas por universidad',h:'hace 1 semana',k:'app'}],
  msgs:[{n:'Juan Pablo Arenas',ini:'JP',col:'#0469E6',lid:1,m:'Hola, ¿la habitación sigue disponible? Soy estudiante foráneo y entro a ESPOL este semestre.',h:'10:24',u:true},{n:'José Andrade',ini:'JA',col:'#2F8F6B',lid:2,m:'¿Se puede visitar el sábado en la mañana?',h:'ayer',u:true},{n:'Valentina Cruz',ini:'VC',col:'#7C5CC4',lid:10,m:'¿El precio incluye el internet?',h:'lun',u:false}],
  friends:new Set(['dome','mateo']),
  invites:[{id:1,lid:5,from:'valen',to:'me',status:'pending',h:'hace 1 h'}],
  links:[],
  groups:[],
  visits:[{id:1,lid:6,day:'Sáb 15 nov',hour:'11:00',status:'confirmada',h:'hace 2 días'}],
  chats:[{id:1,lid:8,agentKey:'andrea',msgs:[{me:true,text:'Hola, ¿la habitación sigue disponible? Soy estudiante foráneo de la UG.',h:'ayer'},{me:false,text:'¡Hola! Sí, sigue disponible. ¿Te gustaría visitarla este sábado?',h:'ayer'}],unread:1}],
  myRating:{v:4.8,n:5},
  zoneOps:[{zone:'Mapasingue',r:2,t:'De noche la calle interna es oscura; mejor regresar temprano y por la avenida.',who:'Bryan S.',h:'hace 1 semana'},{zone:'Mapasingue',r:3,t:'De día tranquilo, de noche con cuidado.',who:'Ana L.',h:'hace 2 semanas'},{zone:'Prosperina',r:3,t:'Cerca de ESPOL hay movimiento; en las calles internas camino acompañado.',who:'Kevin M.',h:'hace 3 días'},{zone:'Urdesa',r:5,t:'Muy iluminada y con negocios abiertos hasta tarde.',who:'Daniela P.',h:'ayer'},{zone:'Samborondón',r:5,t:'Urbanización con guardia, me siento segura.',who:'Doménica V.',h:'hace 1 mes'},{zone:'Kennedy',r:4,t:'Hay Estación de Acción Segura y patrullaje, bien.',who:'Jorge V.',h:'hace 2 semanas'},{zone:'Centro',r:3,t:'En avenidas bien; en calles internas de noche no tanto.',who:'Fernanda T.',h:'hace 5 días'},{zone:'Sauces',r:3,t:'Normal, algunos robos esporádicos.',who:'Mateo S.',h:'hace 1 semana'}],
  myHistory:[{t:'Habitación amoblada en Prosperina',dur:'3 meses · actual',r:5,t2:'Muy cerca de ESPOL y el dueño responde rápido.'},{t:'Cuarto con baño privado',dur:'5 meses · 2025',r:4,t2:'Buena zona, aunque el agua caliente a veces fallaba.'},{t:'Residencia en Mapasingue',dur:'4 meses · 2024',r:3}],
  pub:null, aTab:'panel'};
