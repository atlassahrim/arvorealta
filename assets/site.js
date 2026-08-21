/* Report in before the head timer fires, so the reveal failsafe in
   system.css knows this file actually loaded. Must stay first. */
document.documentElement.classList.add('rv-ready');

/* live clocks — answers "you're in Brazil" without a word */
(function(){
  var f=function(tz){
    return new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',
      hour12:false,timeZone:tz}).format(new Date());
  };
  var tick=function(){
    var a=document.getElementById('cl-br'),b=document.getElementById('cl-eu');
    if(a) a.textContent=f('America/Sao_Paulo');
    if(b) b.textContent=f('Europe/Helsinki');
  };
  tick(); setInterval(tick,30000);
})();

/* reveal on scroll — no library */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){
    els.forEach(function(e){e.classList.add('in')}); return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}
    });
  },{rootMargin:'0px 0px -8% 0px',threshold:.08});
  els.forEach(function(e){io.observe(e)});
})();
