/* ============================================================
   UNI&CORE — shared header/footer + data + commerce (cart)
   Product order follows us.unincore.com (HQ catalog).
   Prices: Shopee (PH, ₱) for listed items; others "Coming soon".
   ============================================================ */
(function(){
  const PIMG = 'https://us.unincore.com/uImage/product/';
  const SHOPEE = 'https://shopee.ph/mygameam.ph';

  /* HQ catalog order (id 1-17). Pricing policy: PHP (₱).
     live=true → listed on Shopee now (real ₱ price); others → ₱ converted from member USD (₱66/$, aligned to Shopee listings) */
  const PRODUCTS = [
    {id:1, img:'20260415023915_9afcf7cb-312e-4031-87e5-c81f3dbcf515.png', cat:'Healthcare', name:'Glow Beauty Collagen Jelly (Tart Cherry)', desc:'Low-molecular collagen jelly in a tart cherry flavor. Easy daily inner-beauty care.', usd:70, php:4620, live:false},
    {id:2, img:'20260415020425_bd4ed838-0660-458e-9505-421124680e9f.png', cat:'Healthcare', name:'Daily Mega Energizer Plus 30packs', desc:'A daily energizer for vitality, helping you stay in top condition through busy days.', usd:114, php:7520, live:false},
    {id:3, img:'20260415020309_849afe2f-b625-443f-bbae-96759bb3cdea.png', cat:'Healthcare', name:'Triple Mega Extension 60capsules', desc:'Triple mega formula in daily capsules for consistent health management.', usd:64, php:4220, live:false},
    {id:4, img:'20260415020021_ee467100-1a4a-4df4-a99f-6a98190011dd.png', cat:'Healthcare', name:'Daily Chewable Propolis 90capsules', desc:'Chewable propolis for easy, everyday immune care.', usd:20, php:1320, live:false},
    {id:5, img:'20260415015903_a4659e68-2a93-4712-acb9-dad792b587fc.png', cat:'Skincare', name:'Daily Calming Toner Pad', desc:'Calming daily toner pads that soothe stressed skin and refine texture.', usd:39, php:2570, live:false},
    {id:6, img:'20260415015807_7dd996fc-db02-4aae-ae35-8ec72a061f35.png', cat:'Healthcare', name:'Slimming Mega Probiotics 30capsules', desc:'Slimming mega probiotics for gut health and a balanced condition.', usd:62, php:4090, live:false},
    {id:7, img:'20260415015728_4800c9f2-3b2d-490d-82f3-534b4806bee7.png', cat:'Skincare', name:'Vita C Enzyme Powder Wash', desc:'Vitamin C enzyme powder wash for a smooth, brighter cleanse.', usd:26, php:1720, live:false},
    {id:8, img:'20260415015537_c22435ef-8519-4176-a7ba-ee14843b403e.png', cat:'Healthcare', name:'Bone & Joint Active Mega Formula 60capsules', desc:'Active mega formula for bone & joint health to support an active lifestyle.', usd:60, php:3960, live:false},
    {id:9, img:'20260415015551_9c61d304-766b-42ac-919b-fe069d2b5394.png', cat:'Skincare', name:'Pure Vita Rice Cleansing Oil', desc:'Rice-extract cleansing oil that gently melts away makeup and impurities.', usd:42, php:2770, live:false},
    {id:10, img:'20260415015333_8f9b5507-fa68-4186-8820-bb5a6e99a8b2.png', cat:'Healthcare', name:'Slim Fit Protein Shake (Multigrain Nutty)', desc:'Multigrain nutty protein shake for a balanced meal replacement.', usd:43, php:2840, live:false},
    {id:11, img:'20260415015306_dc0b52f6-4020-41b0-97f7-3d4380fd31f1.png', cat:'Skincare', name:'Vita C Super Brightening Mask 5packs', desc:'Vita C super brightening mask, 5 sheets, for intensive radiance care.', usd:30, php:2039, live:true},
    {id:12, img:'20260415015018_38e5e50b-bed6-497e-96fb-3bbb487ce790.png', cat:'Skincare', name:'Hydrating Skin Barrier Serum Mist', desc:'24-hour moisture-lock skin barrier serum mist 50ml for instant soothing & hydration.', usd:26, php:1752, live:true},
    {id:13, img:'20260415014633_4e2bf1dc-cadb-45bf-85f9-f041154a58f8.jpeg', cat:'Healthcare', name:'V Apple Night Action', desc:'V Apple Night Action works overnight — your slimming routine partner.', usd:70, php:4620, live:false},
    {id:14, img:'20260415014609_69b65b56-3243-4c72-aaa3-466137876500.jpeg', cat:'Skincare', name:'Vita C Glutaglow Ampoule', desc:'Vita C Glutaglow ampoule for radiant tone-up and intensive brightening.', usd:90, php:5940, live:false},
    {id:15, img:'20260415013926_ab73c8ee-ac1e-4967-8784-b9fe406e56c9.png', cat:'Skincare', name:'Vita C 13.5 Super Brightening Ampoule 30g', desc:'High-potency 13.5% vitamin C super brightening ampoule 30g. Authentic K-beauty bestseller.', usd:90, php:5961, live:true},
    {id:16, img:'20260415013928_ba9bedf7-81e1-40fb-a927-eb43bee8a73f.png', cat:'Skincare', name:'Signature Revitalizing Shampoo', desc:'Signature revitalizing shampoo — daily care that energizes the scalp.', usd:42, php:2770, live:false},
    {id:17, img:'20260415031350_8f10e8cf-922d-42bb-a8d2-312ee5ed9b75.png', cat:'Skincare', name:'Deep Hydrating Skin Nutrition Cream', desc:'Deep hydrating skin nutrition cream for intensive nourishment, moisture and elasticity.', usd:72, php:4719, live:true}
  ];
  const peso = n => '₱'+n.toLocaleString('en-US');
  window.UNICORE = { PRODUCTS, PIMG, SHOPEE, peso, get:id=>PRODUCTS.find(p=>p.id==id) };

  /* ---------- cart (localStorage) ---------- */
  const CK='unicore_cart';
  function getCart(){try{return JSON.parse(localStorage.getItem(CK))||{}}catch(e){return {}}}
  function setCart(c){localStorage.setItem(CK,JSON.stringify(c));paintBadge();}
  function cartCount(){const c=getCart();return Object.values(c).reduce((a,b)=>a+b,0);}
  window.UNICORE.addToCart=function(id){const p=UNICORE.get(id);if(!p){return;}
    const c=getCart();c[id]=(c[id]||0)+1;setCart(c);toast('Added to cart');};
  window.UNICORE.getCart=getCart;window.UNICORE.setCart=setCart;window.UNICORE.cartCount=cartCount;
  function paintBadge(){const b=document.getElementById('cartCount');if(b){const n=cartCount();b.textContent=n;b.style.display=n?'grid':'none';}}

  /* ---------- toast ---------- */
  let tT;function toast(m){let el=document.getElementById('toast');if(!el){el=document.createElement('div');el.id='toast';el.className='toast';document.body.appendChild(el);}el.textContent=m;el.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>el.classList.remove('show'),1700);}
  window.UNICORE.toast=toast;

  /* ---------- header / footer ---------- */
  const headerHTML = `
  <div class="topbar"><div class="wrap">
    <a href="support.html">Business center</a><span class="sep"></span>
    <a href="support.html">FAQ</a><span class="sep"></span>
    <a href="${SHOPEE}" target="_blank" rel="noopener">Shopee</a><span class="sep"></span>
    <a href="#">Login</a><span class="sep"></span><a href="#">Sign up</a>
  </div></div>
  <header class="nav"><div class="wrap">
    <a class="logo" href="index.html" aria-label="UNI&CORE home"><img class="logo-img" src="https://superhero.co.kr/unincore/images/common/logo.png" alt="UNI&CORE SEA"></a>
    <ul class="menu">
      <li data-nav="products"><a href="products.html">SHOP</a><div class="submenu"><a href="products.html#skincare">Skincare</a><a href="products.html#healthcare">Healthcare</a><a href="products.html#living">Living</a><a href="products.html#package">Packages</a></div></li>
      <li data-nav="derma"><a href="derma.html">DERMA</a><div class="submenu"><a href="derma.html#derma-home">Derma Home</a><a href="derma.html#derma-10">Derma 10</a><a href="derma.html#derma-10-pro">Derma 10 Pro</a><a href="derma.html#derma-hand">Derma Hand Hybrid</a></div></li>
      <li data-nav="ai"><a href="ai-analysis.html">AI ANALYSIS</a><div class="submenu"><a href="ai-analysis.html">Skin Analysis</a><a href="skin-quiz.html">Skin Quiz</a><a href="ai-analysis.html#recommend">Recommendations</a></div></li>
      <li data-nav="sub"><a href="subscription.html">SUBSCRIPTION</a><div class="submenu"><a href="subscription.html">Plans & Benefits</a><a href="rewards.html">Rewards</a><a href="subscription.html#faq">FAQ</a></div></li>
      <li data-nav="about"><a href="about.html">STORY</a><div class="submenu"><a href="about.html#about">About us</a><a href="about.html#brand">Brand Story</a><a href="about.html#history">History</a><a href="about.html#business">Business</a></div></li>
      <li data-nav="community"><a href="community.html">COMMUNITY</a><div class="submenu"><a href="community.html#news">News</a><a href="community.html#reviews">Reviews</a><a href="community.html#tiktok">TikTok</a><a href="community.html#tips">Beauty Tips</a></div></li>
      <li data-nav="support"><a href="support.html">SUPPORT</a><div class="submenu"><a href="support.html#faq">FAQ</a><a href="support.html#contact">Contact</a><a href="support.html#shipping">Shipping</a></div></li>
    </ul>
    <div class="nav-tools">
      <div class="lang" title="Language">EN ▾</div>
      <a class="ic" href="cart.html" title="Cart" aria-label="Cart" style="position:relative"><svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M6 6L5 3H2"/></svg><span id="cartCount" class="cart-badge" style="display:none">0</span></a>
      <a class="btn btn-green" style="height:42px;padding:0 20px;font-size:13.5px" href="ai-analysis.html">AI Analysis</a>
      <button class="hamb" id="hambBtn" aria-label="Open menu" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    </div>
  </div></header>
  <div class="drawer" id="drawer">
    <div class="ov" data-close></div>
    <div class="panel" role="dialog" aria-label="Mobile menu">
      <div class="dhead"><span class="logo"><img class="logo-img" src="https://superhero.co.kr/unincore/images/common/logo.png" alt="UNI&CORE SEA" style="height:42px"></span><button class="close" data-close aria-label="Close">×</button></div>
      <nav class="dnav">
        <a href="products.html">SHOP</a><a href="derma.html">DERMA SERIES</a><a href="ai-analysis.html">AI ANALYSIS</a><a href="skin-quiz.html">Skin Quiz</a>
        <a href="subscription.html">SUBSCRIPTION</a><a href="rewards.html">Rewards</a><a href="about.html">STORY</a><a href="community.html">COMMUNITY</a>
        <a href="support.html">SUPPORT</a><a href="cart.html">Cart</a><a class="sub" href="#">Login · Sign up</a>
      </nav>
    </div>
  </div>`;

  const footerHTML = `
  <footer><div class="wrap">
    <div class="fcols">
      <div>
        <span class="logo"><img class="logo-img" src="https://superhero.co.kr/unincore/images/common/logo_w.png" alt="UNI&CORE SEA" style="height:54px"></span>
        <div class="ftagline">United power of uni&core to the global</div>
        <div class="fabout">Uni&Core, USA, INC<br>333 City Blvd West Suite #850, Orange, CA 92868<br>TEL 714-363-3342 · unincoreusa@unincore.com</div>
      </div>
      <div class="fcol"><h4>Shop</h4><a href="products.html#skincare">Skincare</a><a href="products.html#healthcare">Healthcare</a><a href="derma.html">Derma Series</a><a href="products.html#package">Packages</a><a href="${SHOPEE}" target="_blank" rel="noopener">Shopee Store</a></div>
      <div class="fcol"><h4>Support</h4><a href="support.html">Business center</a><a href="support.html#faq">FAQ</a><a href="support.html#contact">1:1 Contact</a><a href="support.html#shipping">Shipping & Returns</a></div>
      <div class="fcol"><h4>Story</h4><a href="about.html#about">About us</a><a href="about.html#brand">Brand Story</a><a href="about.html#business">Business</a><a href="community.html#news">Press Release</a></div>
    </div>
    <div class="fbottom">
      <div class="copy">© 2025 UNI&CORE USA, INC. All rights reserved.</div>
      <div class="badges"><a href="https://www.instagram.com/unincore.official/" target="_blank" rel="noopener">Instagram</a><a href="https://www.youtube.com/channel/UC8N5ddiUjYan6rxn5laJcEg" target="_blank" rel="noopener">YouTube</a><a href="https://www.tiktok.com/@uniandcore_usa" target="_blank" rel="noopener">TikTok</a><span>KakaoTalk</span><span>PWA</span><span>ESG</span></div>
    </div>
  </div></footer>`;

  function inject(){
    const h=document.getElementById('site-header'); if(h) h.innerHTML=headerHTML;
    const f=document.getElementById('site-footer'); if(f) f.innerHTML=footerHTML;
    const page=document.body.dataset.page;
    if(page){const li=document.querySelector('.menu li[data-nav="'+page+'"] > a'); if(li) li.setAttribute('aria-current','page');}
    const drawer=document.getElementById('drawer'), hamb=document.getElementById('hambBtn');
    if(hamb&&drawer){hamb.addEventListener('click',()=>{drawer.classList.add('open');hamb.setAttribute('aria-expanded','true');});
      drawer.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',()=>{drawer.classList.remove('open');hamb.setAttribute('aria-expanded','false');}));}
    paintBadge();
    mountChatbot();
    initTikTokPlayer();
  }

  /* ---------- TikTok in-page video player (lightbox) ---------- */
  function initTikTokPlayer(){
    if(document.getElementById('ttModal')) return;
    const m=document.createElement('div');
    m.id='ttModal'; m.className='tt-modal';
    m.innerHTML=`
      <div class="tt-modal-box" role="dialog" aria-label="TikTok video">
        <button class="tt-modal-x" type="button" aria-label="Close">&#10005;</button>
        <div class="tt-modal-load">Loading video…</div>
        <iframe title="UNI&CORE TikTok video" allow="autoplay; encrypted-media; fullscreen" scrolling="no"></iframe>
        <a class="tt-modal-ext" target="_blank" rel="noopener">Open on TikTok ↗</a>
      </div>`;
    document.body.appendChild(m);
    const frame=m.querySelector('iframe'), loadEl=m.querySelector('.tt-modal-load'), ext=m.querySelector('.tt-modal-ext');
    function open(id,url){
      loadEl.style.display='grid';
      frame.addEventListener('load',()=>{loadEl.style.display='none';},{once:true});
      frame.src='https://www.tiktok.com/embed/v2/'+id;
      ext.href=url;
      m.classList.add('open'); document.body.style.overflow='hidden';
    }
    function close(){ m.classList.remove('open'); frame.src=''; document.body.style.overflow=''; }
    m.querySelector('.tt-modal-x').addEventListener('click',close);
    m.addEventListener('click',e=>{ if(e.target===m) close(); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&m.classList.contains('open')) close(); });
    document.addEventListener('click',e=>{
      const clip=e.target.closest('.tt-clip'); if(!clip) return;
      const href=clip.getAttribute('href')||''; const mt=href.match(/\/video\/(\d+)/);
      if(mt){ e.preventDefault(); open(mt[1],href); }
    });
  }

  /* ---------- site-wide AI chatbot widget ---------- */
  function mountChatbot(){
    if(document.getElementById('uniChat')) return;
    const ASSISTANT='https://ai-assistant.unincore.com/?lang=en';
    const wrap=document.createElement('div');
    wrap.id='uniChat';
    wrap.innerHTML=`
      <button id="uniChatBtn" class="uc-fab" type="button" aria-label="Open UNI&CORE AI Assistant" aria-expanded="false">
        <svg class="ic-chat" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/><circle cx="8.5" cy="11.5" r="1"/><circle cx="12" cy="11.5" r="1"/><circle cx="15.5" cy="11.5" r="1"/></svg>
        <svg class="ic-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        <span class="uc-fab-tip">Ask UNI&CORE AI</span>
      </button>
      <div id="uniChatPanel" class="uc-panel" role="dialog" aria-label="UNI&CORE AI Assistant" aria-hidden="true">
        <div class="uc-head">
          <div class="uc-h-l"><span class="uc-dot"></span><b>UNI&CORE AI Assistant</b></div>
          <div class="uc-h-r">
            <a class="uc-ext" href="${ASSISTANT}" target="_blank" rel="noopener" title="Open in new tab" aria-label="Open in new tab">&#8599;</a>
            <button class="uc-close" type="button" aria-label="Close">&#10005;</button>
          </div>
        </div>
        <div class="uc-body"><div class="uc-loading">Loading assistant…</div><iframe title="UNI&CORE AI Assistant" allow="microphone; camera; clipboard-write"></iframe></div>
      </div>`;
    document.body.appendChild(wrap);
    const btn=wrap.querySelector('#uniChatBtn'), frame=wrap.querySelector('iframe'),
          closeB=wrap.querySelector('.uc-close'), loadEl=wrap.querySelector('.uc-loading');
    let loaded=false;
    function open(){
      if(!loaded){ frame.src=ASSISTANT; loaded=true;
        frame.addEventListener('load',()=>{ if(loadEl) loadEl.style.display='none'; },{once:true}); }
      wrap.classList.add('open'); btn.setAttribute('aria-expanded','true');
      wrap.querySelector('.uc-panel').setAttribute('aria-hidden','false');
    }
    function close(){ wrap.classList.remove('open'); btn.setAttribute('aria-expanded','false');
      wrap.querySelector('.uc-panel').setAttribute('aria-hidden','true'); }
    btn.addEventListener('click',()=> wrap.classList.contains('open') ? close() : open());
    closeB.addEventListener('click',close);
    document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&wrap.classList.contains('open')) close(); });
  }

  /* ---------- product card renderer ---------- */
  window.renderProducts=function(sel,opts){
    opts=opts||{};const host=document.querySelector(sel);if(!host)return;
    let list=PRODUCTS.slice();
    if(opts.cat&&opts.cat!=='All') list=list.filter(p=>p.cat===opts.cat);
    if(opts.onlyShopee) list=list.filter(p=>p.live);
    if(opts.limit) list=list.slice(0,opts.limit);
    host.innerHTML=list.map(p=>{
      const priceBlock = `<div class="p">${peso(p.php)} <small>${p.live?'Shopee':'Member'}</small></div>`;
      const badge = p.live ? `<span class="badge">On Shopee</span>` : `<span class="badge soon">New</span>`;
      const btn = `<button class="addcart" onclick="event.preventDefault();UNICORE.addToCart(${p.id})">Add to cart</button>`;
      return `<a class="prod" data-cat="${p.cat}" href="product-detail.html?id=${p.id}">
        <div class="img">${badge}<span class="ph">${p.name.slice(0,16)}</span>
          <img src="${PIMG}${p.img}" alt="${p.name}" loading="lazy" onload="this.previousElementSibling.style.display='none'" onerror="this.style.display='none'"></div>
        <div class="body"><div class="cat">${p.cat}</div><div class="nm">${p.name}</div>
          ${priceBlock}${btn}</div>
      </a>`;}).join('');
  };

  /* ---------- interactions ---------- */
  function initFX(){
    const rev=document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:0,rootMargin:'0px 0px -8% 0px'});
      rev.forEach(el=>io.observe(el));
    } else { rev.forEach(el=>el.classList.add('in')); }
    // safety: never leave content invisible if observer/JS stalls
    setTimeout(()=>rev.forEach(el=>el.classList.add('in')),2500);
    let counted=false;const cs=document.querySelector('[data-counters]');
    if(cs){const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!counted){counted=true;
      document.querySelectorAll('.cnt').forEach(el=>{const tg=+el.dataset.count;let c=0,s=tg/70;
        const t=setInterval(()=>{c+=s;if(c>=tg){c=tg;clearInterval(t);}el.textContent=Math.floor(c).toLocaleString('en-US');},20);});}}),{threshold:.3});
      co.observe(cs);}
    document.querySelectorAll('.acc .q').forEach(q=>q.addEventListener('click',()=>{
      const acc=q.closest('.acc');const a=acc.querySelector('.a');const open=acc.classList.toggle('open');
      a.style.maxHeight=open?a.scrollHeight+'px':0;}));
    const fl=document.querySelector('.filter');
    if(fl){fl.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
      fl.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');
      renderProducts('#catalog',{cat:b.dataset.cat});});}
    // subtle scroll parallax (sub-page banner backgrounds)
    const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pxEls=[].slice.call(document.querySelectorAll('.page-hero .bg'));
    if(pxEls.length && !reduce){
      pxEls.forEach(el=>{el.setAttribute('data-parallax','');el.style.transform='scale(1.12)';});
      let ticking=false;
      const run=()=>{const y=window.pageYOffset;pxEls.forEach(el=>{el.style.transform='scale(1.12) translateY('+(y*0.16)+'px)';});ticking=false;};
      window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(run);ticking=true;}},{passive:true});
      run();
    }
  }

  if(document.readyState!=='loading'){inject();initFX();}
  else document.addEventListener('DOMContentLoaded',()=>{inject();initFX();});
})();
