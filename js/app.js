/* NidU · app.js — eventos, enrutamiento y arranque
   Prototipo de arriendos para estudiantes foráneos (ESPOL / Guayaquil).
   Archivo generado al refactorizar el HTML monolítico en módulos. */
/* ===================== EVENTS ===================== */
document.addEventListener('click',e=>{const a=e.target.closest('[data-act]');if(!a)return;const act=a.dataset.act,id=+a.dataset.id;
  switch(act){
  case 'go':e.preventDefault();closeModal();$('#menu')?.classList.remove('on');if(a.dataset.v==='registro'||a.dataset.v==='ingresar'){regRole='estudiante';sstep='pick';authUni=null;agentPay=false;agentTab=(a.dataset.v==='ingresar'?'login':'register');}go(a.dataset.v);break;
  case 'agentSignup':regRole='agente';go('registro');break;
  case 'role':e.preventDefault();regRole=a.dataset.r;sstep='pick';authUni=null;agentPay=false;reAuth();break;
  case 'agentTab':agentTab=a.dataset.t;agentPay=false;reAuth();break;
  case 'payKind':a.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===a));break;
  case 'payBack':agentPay=false;reAuth();break;
  case 'editL':editListing(id);break;
  case 'tenant':tenantModal(id);break;
  case 'remind':closeModal();toast('Recordatorio de pago enviado al inquilino (demo)');break;
  case 'agentProfile':openAgentProfile(a.dataset.ag);break;
  case 'uniPick':authUni=a.dataset.u;sstep='sso';reAuth();break;
  case 'ssoBack':sstep='pick';authUni=null;reAuth();break;
  case 'ssoGo':submitSso();break;
  case 'guest':toast('Explorando como invitado');go('explorar');break;
  case 'sw':S.notify=!S.notify;a.classList.toggle('on',S.notify);break;
  case 'demo':if(a.dataset.r==='agente'){S.verif='ok';S.subscribed=true;}S.user=a.dataset.r==='agente'?{name:'Carlos Ríos',email:'carlos.rios@nidu.ec',role:'agente'}:{name:'Juan Pablo Arenas',email:'jparenas@espol.edu.ec',role:'estudiante',uni:'espol',phone:'098 123 4567'};S.prof=true;store();toast(`Entraste como ${S.user.name}`);go(S.user.role==='agente'?'agente':'explorar');break;
  case 'forgot':e.preventDefault();toast('Te enviaríamos un enlace para restablecerla (demo)');break;
  case 'menu':openMenu('menu');break;
  case 'bell':openMenu('bell');break;
  case 'logout':S.user=null;store();toast('Sesión cerrada');go('inicio');break;
  case 'switchRole':S.user.role=S.user.role==='agente'?'estudiante':'agente';if(S.user.role==='agente'&&!S.verif)S.verif='ok';store();go(S.user.role==='agente'?'agente':'explorar');break;
  case 'favs':onlyFav=true;$('#menu').classList.remove('on');go('explorar');break;
  case 'budget':e.preventDefault();$('#menu')?.classList.remove('on');modal(`${mhead(`Tu presupuesto mensual`)}<div class="mb"><div class="budget" style="margin:0"><div class="v" id="mbv">$${S.budget}<small> /mes</small></div><input class="rng" id="mb" type="range" min="80" max="400" step="5" value="${S.budget}" style="--p:${(S.budget-80)/320*100}%"><div class="minmax"><span>$80</span><span>$400</span></div></div><p style="color:var(--ink2);font-size:13.5px;margin-top:12px">Usamos tu presupuesto para decirte si cada arriendo es justo, promedio o caro para ti.</p></div><div class="mf"><button class="btn pri" data-act="saveBudget">Guardar</button></div>`);const r=$('#mb');r.oninput=()=>{$('#mbv').innerHTML=`$${r.value}<small> /mes</small>`;r.style.setProperty('--p',(r.value-80)/320*100+'%');};break;
  case 'saveBudget':S.budget=+$('#mb').value;store();closeModal();toast(`Presupuesto actualizado a $${S.budget}`);render();break;
  case 'close':closeModal();break;
  case 'openL':{const l=L.find(x=>x.id===id);if(!l)return;S.sel=l;S.dir='ida';l.views++;$('#menu')?.classList.remove('on');closeModal();go('arriendo');break;}
  case 'fav':e.stopPropagation();S.fav.has(id)?S.fav.delete(id):S.fav.add(id);store();a.classList.toggle('on');toast(S.fav.has(id)?'Guardado en favoritos':'Quitado de favoritos');if(onlyFav)paintResults();break;
  case 'pin':showPop(id);break;
  case 'closePop':a.closest('.popup').remove();break;
  case 'setUni':if(S.user&&S.user.role==='estudiante'){toast('Tu universidad queda fija según tu cuenta');break;}S.uni=a.dataset.u;store();if(location.hash==='#explorar')renderExplore();else if(location.hash==='#arriendo')renderDetail();$('#appTop').innerHTML=topbar(location.hash.slice(1));toast(`Mostrando distancias a ${UNIS[S.uni].n}`);break;
  case 'filters':filtersModal();break;
  case 'qSafe':S.f.safe=S.f.safe>=4?0:4;renderExplore();break;
  case 'tSafe':S.f.safe=+a.dataset.v;a.parentNode.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c===a));modal.cnt&&modal.cnt();break;
  case 'tVph':S.f.vph=!S.f.vph;a.classList.toggle('on',S.f.vph);modal.cnt&&modal.cnt();break;
  case 'cmp':{e.stopPropagation();if(S.cmp.has(id))S.cmp.delete(id);else{if(S.cmp.size>=3){toast('Puedes comparar hasta 3 arriendos');break;}S.cmp.add(id);}
    document.querySelectorAll(`.cmpb[data-id="${id}"]`).forEach(b=>b.classList.toggle('on',S.cmp.has(id)));paintCmp();
    if($('#ov').classList.contains('on'))cmpModal();else if(location.hash==='#arriendo')renderDetail();else toast(S.cmp.has(id)?'Agregado a comparar':'Quitado de comparar');break;}
  case 'cmpOpen':cmpModal();break;
  case 'cmpClear':S.cmp.clear();paintCmp();document.querySelectorAll('.cmpb.on').forEach(b=>b.classList.remove('on'));break;
  case 'review':if(!S.user){toast('Inicia sesión para opinar');go('ingresar');break;}reviewModal();break;
  case 'star':S.rvStar=+a.dataset.v;paintStars();break;
  case 'report':reportModal();break;
  case 'sendReport':closeModal();toast('Gracias. Revisaremos el anuncio en menos de 24 horas');break;
  case 'toCost':e.preventDefault();$('#costo').scrollIntoView({behavior:'smooth',block:'start'});break;
  case 'qBudget':S.f.max=S.f.max<=S.budget?350:S.budget;renderExplore();break;
  case 'qType':{const t=a.dataset.t;S.f.types.has(t)?S.f.types.delete(t):S.f.types.add(t);renderExplore();break;}
  case 'qSv':{const s=a.dataset.s;S.f.sv.has(s)?S.f.sv.delete(s):S.f.sv.add(s);renderExplore();break;}
  case 'qFav':onlyFav=!onlyFav;renderExplore();break;
  case 'tType':case 'tZone':case 'tSv':{const set={tType:S.f.types,tZone:S.f.zones,tSv:S.f.sv}[act];const v=a.dataset.t||a.dataset.z||a.dataset.s;set.has(v)?set.delete(v):set.add(v);a.classList.toggle('on');modal.cnt&&modal.cnt();break;}
  case 'applyF':closeModal();renderExplore();break;
  case 'clearF':S.f={min:80,max:350,zones:new Set(),types:new Set(),sv:new Set(),dist:8,sort:S.f.sort,q:'',safe:0,vph:false};onlyFav=false;closeModal();renderExplore();break;
  case 'mapToggle':{const ex=$('#explore');ex.classList.toggle('showmap');a.querySelector('span').textContent=ex.classList.contains('showmap')?'Ver lista':'Ampliar mapa';window.scrollTo(0,0);const U=UNIS[S.uni];requestAnimationFrame(()=>MAPS.exMap.center(U.x+60,U.y+40,1.2));break;}
  case 'dir':S.dir=a.dataset.d;a.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===a));paintSteps();break;
  case 'contact':contactModal();break;
  case 'addQ':{const t=a.closest('form').querySelector('textarea');t.value+=' '+a.textContent;a.classList.add('on');break;}
  case 'visit':visitModal();break;
  case 'pickOne':a.parentNode.querySelectorAll('.chip').forEach(c=>c.classList.toggle('on',c===a));break;
  case 'confirmVisit':confirmVisit();break;
  case 'cancelVisit':cancelVisit(id);break;
  case 'reVisit':reVisit(id);break;
  case 'openChat':openChat(id);break;
  case 'sendChat':sendChat(id);break;
  case 'call':{const A=agentOf(S.sel);toast(A?`Teléfono de ${A.n}: ${A.ph}`:'Teléfono no disponible');break;}
  case 'zoomImg':{const k=a.dataset.k;modal(`${mhead(`${esc(a.dataset.c||'Foto')}`)}<div style="height:420px">${k?room(k,S.sel.pal):`<img src="${S.sel.imgs[+a.dataset.i]}" style="width:100%;height:100%;object-fit:contain;background:#000">`}</div>`,true);break;}
  case 'aTab':S.aTab=a.dataset.t;renderAgent();break;
  case 'toggleL':{const l=L.find(x=>x.id===id);l.st=!l.st;toast(l.st?'Arriendo activado: visible para estudiantes':'Arriendo pausado: ya no aparece en el mapa');renderAgent();break;}
  case 'readMsg':readMsg(+a.dataset.i);break;
  case 'reply':closeModal();toast('Respuesta enviada (demo)');break;
  case 'addPh':$('#phIn').click();break;
  case 'pType':S.pub.type=a.dataset.t;a.parentNode.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b===a));pubPrev();break;
  case 'pSv':{const s=a.dataset.s;S.pub.sv.has(s)?S.pub.sv.delete(s):S.pub.sv.add(s);a.classList.toggle('on');pubPrev();break;}
  case 'addFriend':addFriendModal();break;
  case 'addFr2':S.friends.add(a.dataset.k);store();closeModal();toast('Amigo agregado');if(location.hash==='#amigos')renderFriends();break;
  case 'rmFriend':S.friends.delete(a.dataset.k);store();renderFriends();break;
  case 'inviteFriend':inviteModal(a.dataset.k);break;
  case 'shareRent':if(isRenting()){toast('Ya tienes un arriendo activo. Solo puedes tener uno a la vez');break;}shareModal(id);break;
  case 'shInv':createInvite(a.dataset.k,id);break;
  case 'shOpen':createOpen(id);break;
  case 'invAccept':acceptInvite(id);break;
  case 'invReject':rejectInvite(id);break;
  case 'flowSign':{const ok=$('#flowChk')&&$('#flowChk').checked;const nm=($('#flowSignName')&&$('#flowSignName').value.trim())||'';if(!ok||!nm){vfld('#flowSignName',false);toast('Firma con tu nombre y acepta las reglas');break;}flowG.members.find(m=>m.me).signed=true;flowStep=2;renderSharedFlow();break;}
  case 'flowPayKind':flowPay=a.dataset.k;renderSharedFlow();break;
  case 'flowBack':flowStep--;renderSharedFlow();break;
  case 'flowPay':flowG.members.find(m=>m.me).paid=true;flowStep=3;renderSharedFlow();break;
  case 'flowFinish':finalizeGroup(flowG);break;
  case 'smsOk':{const c=(($('#smsCode')&&$('#smsCode').value)||'').trim();if(!/^\d{4,6}$/.test(c)){vfld('#smsCode',false);toast('Ingresa el código (4 a 6 dígitos)');break;}const cb=smsCb;smsCb=null;closeModal();if(cb)cb();break;}
  case 'smsResend':toast('Código reenviado por SMS (demo)');break;
  case 'sendLink':sendLink(+a.dataset.i);break;
  case 'linkWiz':$('#menu')?.classList.remove('on');closeModal();if(isRenting()){toast('Ya tienes un arriendo activo. Solo puedes tener uno a la vez');break;}linkWizard(id);break;
  case 'wizNext':wizStep++;renderWiz();break;
  case 'wizBack':wizStep--;renderWiz();break;
  case 'wizPayKind':wizPay=a.dataset.k;renderWiz();break;
  case 'wizFinish':finishLink();break;
  case 'zoneOpine':zoneOpineModal(a.dataset.z);break;
  case 'zoneSend':zoneSend(a.dataset.z);break;
  case 'savePhone':{const ph=$('#spPhone').value.trim();if(!/^\d{10}$/.test(ph)){vfld('#spPhone',false);toast('El teléfono debe tener exactamente 10 dígitos');break;}smsVerify(ph,()=>{S.user.phone=ph;store();toast('Teléfono verificado y actualizado');});break;}
  case 'reportBug':modal(`${mhead(`Reportar un error`)}<div class="mb"><div class="fld"><label>¿Qué salió mal?</label><textarea class="inp" rows="4" placeholder="Describe el error que viste en la app…"></textarea></div></div><div class="mf"><button class="btn pri" data-act="sendBug">Enviar reporte</button></div>`);break;
  case 'sendBug':closeModal();toast('Gracias. Enviamos tu reporte al equipo de NidU');break;
  case 'support':modal(`${mhead(`Servicio al cliente`)}<div class="mb"><p style="color:var(--ink2)">Estamos para ayudarte. En este prototipo los canales son de demostración.</p><div style="display:grid;gap:8px;margin-top:10px;color:var(--ink2)"><div>${ic('i-mail','sm')} ayuda@nidu.ec</div><div>${ic('i-phone','sm')} 04 500 0000</div><div>${ic('i-msg','sm')} Chat en la app (9:00–18:00)</div></div></div><div class="mf"><button class="btn pri" data-act="close">Entendido</button></div>`);break;
  case 'delAcct':modal(`${mhead(`Eliminar cuenta`)}<div class="mb"><p style="color:var(--ink2)">¿Seguro que quieres eliminar tu cuenta? Perderás tus favoritos, amigos y vinculaciones. Esta acción no se puede deshacer.</p></div><div class="mf"><button class="btn ghost" data-act="close">Cancelar</button><button class="btn pri" style="background:var(--bad);box-shadow:none" data-act="delAcct2">Eliminar definitivamente</button></div>`);break;
  case 'delAcct2':S.user=null;S.friends=new Set();S.fav=new Set();S.links=[];store();closeModal();toast('Tu cuenta fue eliminada (demo)');go('inicio');break;
  }});
document.addEventListener('change',e=>{const up=e.target.dataset.up;if(up){const f=e.target.files[0];if(f){S.upl[up]=true;const lb=e.target.closest('.upl');lb.classList.add('done');lb.classList.remove('bad');lb.querySelector('span').textContent='✓ '+f.name;if(up==='ced')$('#cedErr').style.display='none';}return;}const c=e.target.dataset.chg;if(!c)return;if(c==='uni'){S.uni=e.target.value;store();const v=location.hash.slice(1);if(v==='arriendo')renderDetail();else{go('explorar');renderExplore();}}if(c==='sort'){S.f.sort=e.target.value;paintResults();}if(c==='orig'){S.orig=e.target.value;store();renderDetail();document.getElementById('costo').scrollIntoView({block:'center'});}});
document.addEventListener('input',e=>{if('phone' in e.target.dataset){const mx=+e.target.dataset.max||10;const v=e.target.value.replace(/\D/g,'').slice(0,mx);if(v!==e.target.value)e.target.value=v;e.target.closest('.fld')?.classList.remove('e');e.target.classList.remove('err');}if(e.target.id==='rgPass')pwUpdate(e.target.value);if(e.target.dataset.chg==='q'){S.f.q=e.target.value;if(location.hash!=='#explorar'){go('explorar');}else paintResults();}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if(e.key==='Enter'&&e.target.matches('.card'))e.target.click();});
window.addEventListener('resize',()=>{});
render();
