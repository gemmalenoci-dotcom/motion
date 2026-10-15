/* Copia dei prompt e spunte del setup (la spunta resta solo in questo browser) */
(function(){
  function riserva(t,fatto){var a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(a);fatto()}
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click',function(e){
      e.preventDefault();
      var p=document.getElementById(b.dataset.target);if(!p)return;
      var t=p.innerText;
      var fatto=function(){var o=b.textContent;b.textContent='Copiato ✓';b.classList.add('done');setTimeout(function(){b.textContent=o;b.classList.remove('done')},1800)};
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(fatto).catch(function(){riserva(t,fatto)})}else{riserva(t,fatto)}
    });
  });
  var chiave='montaggio-setup';
  var stato={};
  try{stato=JSON.parse(localStorage.getItem(chiave)||'{}')||{}}catch(e){stato={}}
  document.querySelectorAll('.spunte input[type=checkbox]').forEach(function(c){
    if(stato[c.id])c.checked=true;
    c.addEventListener('change',function(){
      stato[c.id]=c.checked;
      try{localStorage.setItem(chiave,JSON.stringify(stato))}catch(e){}
    });
  });
})();
