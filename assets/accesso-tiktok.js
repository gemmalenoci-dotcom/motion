/* Finestra «lascia la mail e si apre la guida» per chi arriva da TikTok (30/10/2026)
   Si vede SOLO con ?utm_source=tiktok (l'indirizzo corto <sito>/tiktok/ lo aggiunge da solo): chi arriva da Instagram non vede niente.
   La mail va nel gruppo MailerLite della risorsa (modulo del sito, senza doppia conferma).
   Per una risorsa nuova basta il tag nella pagina, con l'endpoint del suo modulo:
   <script src="assets/accesso-tiktok.js?v=1" data-risorsa="motion" data-endpoint="https://assets.mailerlite.com/jsonp/2697895/forms/<ID modulo>/subscribe"></script> */
(function(){
  var tag=document.currentScript;
  if(!tag)return;
  var RISORSA=tag.getAttribute('data-risorsa')||'risorsa';
  var ENDPOINT=tag.getAttribute('data-endpoint')||'';
  var BOTTONE=tag.getAttribute('data-bottone')||'Apri la guida';
  var PRIVACY='https://www.iubenda.com/privacy-policy/15204920';
  var CHIAVE=RISORSA+'-tiktok-mail-ok';
  if(!ENDPOINT)return;

  var fonte='';
  try{fonte=(new URLSearchParams(location.search).get('utm_source')||'').toLowerCase()}catch(e){}
  if(fonte!=='tiktok')return;
  try{if(localStorage.getItem(CHIAVE)==='1')return}catch(e){}

  function rgba(hex,a){
    var m=/^#([0-9a-f]{6})$/i.exec((hex||'').trim());
    if(!m)return 'rgba(205,36,113,'+a+')';
    var n=parseInt(m[1],16);
    return 'rgba('+(n>>16&255)+','+(n>>8&255)+','+(n&255)+','+a+')';
  }
  var accento='#CD2471';
  try{var v=getComputedStyle(document.documentElement).getPropertyValue('--fucsia').trim();if(/^#[0-9a-f]{6}$/i.test(v))accento=v}catch(e){}
  var ombra=rgba(accento,.38);

  var css=document.createElement('style');
  css.textContent=
    '#accesso{position:fixed;inset:0;z-index:99999;background:#F3F2EE;display:flex;align-items:center;justify-content:center;padding:20px;overflow:auto;font-family:"Open Sauce Sans",system-ui,sans-serif;color:#3B3638}'+
    '#accesso .ac-box{width:100%;max-width:480px;background:#fff;border:2px solid #3B3638;border-radius:22px;padding:34px 28px;display:block;grid-template-columns:none;box-shadow:6px 8px 0 '+ombra+'}'+
    '#accesso .ac-bollino{display:inline-block;font-weight:800;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:'+accento+';margin-bottom:12px}'+
    '#accesso h2{font-family:"Open Sauce Sans",system-ui,sans-serif;font-weight:900;font-size:30px;line-height:1.08;letter-spacing:-.045em;margin:0 0 12px;color:#3B3638}'+
    '#accesso p{font-size:16px;line-height:1.5;margin:0 0 14px;color:#5A5456}'+
    '#accesso input[type=text],#accesso input[type=email]{width:100%;box-sizing:border-box;font:inherit;font-size:17px;padding:15px 18px;border:2px solid #3B3638;border-radius:14px;margin:6px 0 14px;background:#fff;color:#3B3638}'+
    '#accesso label.ac-spunta{display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.45;color:#665E61;margin-bottom:18px;cursor:pointer}'+
    '#accesso label.ac-spunta input{margin-top:3px;width:18px;height:18px;flex:none;accent-color:'+accento+'}'+
    '#accesso a{color:'+accento+'}'+
    '#accesso button{width:100%;font:inherit;font-weight:800;font-size:18px;border:0;border-radius:100px;padding:17px 24px;background:'+accento+';color:#fff;cursor:pointer;box-shadow:4px 5px 0 '+ombra+'}'+
    '#accesso button[disabled]{opacity:.6;cursor:wait}'+
    '#accesso .ac-errore{color:#B3261E;font-size:14px;min-height:18px;margin:0 0 10px}'+
    '#accesso .ac-piccolo{font-size:13px;margin:14px 0 0;color:#665E61}'+
    'body.accesso-aperto{overflow:hidden}';
  document.head.appendChild(css);

  var box=document.createElement('div');
  box.id='accesso';
  box.setAttribute('role','dialog');
  box.setAttribute('aria-modal','true');
  box.setAttribute('aria-labelledby','accesso-titolo');
  box.innerHTML=
    '<form class="ac-box" novalidate>'+
      '<span class="ac-bollino">Gratis</span>'+
      '<h2 id="accesso-titolo">Lascia la tua email e si apre la guida</h2>'+
      '<p>Te la mandiamo anche per email, insieme all\'invito al Club gratuito di Unlike Academy</p>'+
      '<input type="text" name="nome" placeholder="Il tuo nome" autocomplete="given-name" required aria-label="Il tuo nome">'+
      '<input type="email" name="email" placeholder="La tua email" autocomplete="email" required aria-label="La tua email">'+
      '<input type="text" name="tiktok" placeholder="Profilo TikTok, facoltativo" autocapitalize="none" autocorrect="off" aria-label="Il tuo profilo TikTok, facoltativo">'+
      '<label class="ac-spunta"><input type="checkbox" name="consenso" required><span>Accetto di ricevere email di Unlike Academy, mi disiscrivo quando voglio · <a href="'+PRIVACY+'" target="_blank" rel="noopener">Informativa privacy</a></span></label>'+
      '<p class="ac-errore" role="alert"></p>'+
      '<button type="submit">'+BOTTONE+'</button>'+
      '<p class="ac-piccolo">Se non vedi le nostre mail, guarda in Promozioni e in Spam</p>'+
    '</form>';
  function mostra(){document.body.appendChild(box);document.body.classList.add('accesso-aperto');var i=box.querySelector('input[name=nome]');if(i)try{i.focus({preventScroll:true})}catch(e){}}
  if(document.body)mostra();else document.addEventListener('DOMContentLoaded',mostra);

  var form=box.querySelector('form');
  var errore=box.querySelector('.ac-errore');
  var bottone=box.querySelector('button');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var nome=(form.nome.value||'').trim();
    var email=(form.email.value||'').trim();
    var tt=(form.tiktok.value||'').trim().replace(/^@+/,'').replace(/^https?:\/\/(www\.)?tiktok\.com\/@?/i,'').replace(/[\/?].*$/,'');
    if(!nome){errore.textContent='Scrivi il tuo nome';form.nome.focus();return}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){errore.textContent='Controlla l\'indirizzo email';form.email.focus();return}
    if(tt&&!/^[A-Za-z0-9._]{1,24}$/.test(tt)){errore.textContent='Il profilo TikTok si scrive così: @nomeprofilo (o lascia vuoto)';form.tiktok.focus();return}
    if(!form.consenso.checked){errore.textContent='Per aprire la guida serve la spunta';return}
    errore.textContent='';
    bottone.disabled=true;bottone.textContent='Un attimo';
    var dati=new FormData();
    dati.append('fields[email]',email);
    dati.append('fields[name]',nome);
    if(tt)dati.append('fields[tiktok]',tt);
    dati.append('ml-submit','1');
    dati.append('anticsrf','true');
    var chiudi=function(){
      try{localStorage.setItem(CHIAVE,'1')}catch(x){}
      box.remove();document.body.classList.remove('accesso-aperto');
    };
    fetch(ENDPOINT,{method:'POST',body:dati,mode:'no-cors'}).then(chiudi).catch(function(){
      bottone.disabled=false;bottone.textContent=BOTTONE;errore.textContent='Non è partito, riprova tra un attimo';
    });
  });
})();
