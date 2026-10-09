// Akāpera - script.js. Shared behavior for every page: cards from products.js, drawers, reveal, demo actions.
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const P = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
  const mxn = n => '$' + n.toLocaleString('en-US') + ' MXN';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------- cards ---------- */
  function card(p, o) {
    const sw = p.colors.map((c, i) => `<i class="sw${i ? '' : ' on'}" style="background:${c}"></i>`).join('');
    let extra = '';
    if (o.rating) extra = `<a class="rating" href="feed.html"><span class="stars-txt">★★★★★</span> ${p.rating} · ${p.n} reviews</a>`;
    if (o.fit) extra = `<div class="chips"><span class="chip chip--soft">Your size: ${p.size}</span><span class="chip chip--soft">${p.fit}</span><span class="chip chip--soft">In your palette</span></div>`;
    const cta = o.fit ? `<a href="fitting-room.html" class="btn btn--ghost btn--sm">Try on my avatar</a>` : `<button class="btn btn--sm" type="button" data-bag="open">Add to bag</button>`;
    return `<article class="product"><a href="product.html?id=${p.id}" class="arch arch--photo" aria-label="${esc(p.name)}"><img class="img" src="${p.img}" alt="${esc(p.name)}, example look" loading="lazy" width="480" height="640"><img class="img2" src="${p.img2}" alt="" loading="lazy" width="480" height="640"><span class="chip badge">Example</span></a><h3><a href="product.html?id=${p.id}" style="text-decoration:none;color:inherit">${esc(p.name)}</a></h3><p class="desc">${esc(p.desc)}</p><div class="row"><p class="price">${mxn(p.price)}</p><div class="swatches">${sw}</div></div>${extra}<div>${cta}</div></article>`;
  }
  $$('[data-products]').forEach(el => {
    el.innerHTML = el.dataset.products.split(',').map(id => card(P[id], { rating: el.dataset.rating, fit: el.dataset.fit })).join('');
  });
  function post(i) {
    const r = POSTS[i], p = P[r[1]];
    return `<article class="post"><span class="user"><i aria-hidden="true"></i>${esc(r[0])}</span><a href="product.html?id=${p.id}" class="arch arch--photo"><img src="${p.img}" alt="${esc(r[0])} wearing ${esc(p.name)}" loading="lazy" width="480" height="640"></a><p><b style="font-weight:400">Piece:</b> <a href="product.html?id=${p.id}" class="link">${esc(p.name)}</a></p><p><b style="font-weight:400">Rating:</b> <span class="stars-txt">${'★'.repeat(r[2])}${'☆'.repeat(5 - r[2])}</span> ${r[2]} of 5</p><p>“${esc(r[3])}”</p><div class="acts"><a href="fitting-room.html" class="btn btn--ghost btn--sm">Try on my avatar</a><button class="btn btn--sm" type="button" data-bag="open">Add to bag</button></div></article>`;
  }
  $$('[data-posts]').forEach(el => { el.innerHTML = el.dataset.posts.split(',').map(i => post(+i)).join(''); });
  const cartEl = $('#cart-items');
  if (cartEl) cartEl.innerHTML = CART.map(([id, c, s, on]) => { const p = P[id]; return `<div class="card" style="display:grid;grid-template-columns:5rem 1fr;gap:1rem"><div class="arch arch--photo"><img src="${p.img}" alt="" width="480" height="640"></div><div><h3 style="margin:0">${esc(p.name)}</h3><span class="note">Color ${c}</span><p style="margin:.2rem 0 0;font-weight:400">${mxn(p.price)}</p><span class="note">Recommended for you: size ${s}</span><div class="row" style="display:flex;justify-content:space-between;align-items:center;margin-top:.6rem;gap:.5rem;flex-wrap:wrap"><div class="size-picker">${['S','M','L'].map(z => `<label><input type="radio" name="c-${id}" ${z === s ? 'checked' : ''}><span>${z}</span></label>`).join('')}</div>${on ? '<span class="btn btn--sm">On your avatar</span>' : '<button class="btn btn--ghost btn--sm" type="button" data-note="Trying it on your avatar">Try it on me</button>'}</div></div></div>`; }).join('');
  const bagEl = $('#bag-items');
  if (bagEl) bagEl.innerHTML = CART.map(([id, c, s]) => { const p = P[id]; return `<div class="bag-item"><div class="arch arch--photo"><img src="${p.img}" alt="" width="480" height="640"></div><div><b>${esc(p.name)}</b><small>${c} · ${s}</small><div class="row"><span class="stepper"><button type="button" aria-label="Less">−</button><span>1</span><button type="button" aria-label="More">+</button></span><span>${mxn(p.price)}</span></div></div></div>`; }).join('');
  const garments = $('#garments');
  if (garments) garments.innerHTML = PRODUCTS.map((p, i) => `<a href="product.html?id=${p.id}" class="${i === 0 ? 'on' : ''}" style="background:url(${p.img}) center top/cover" aria-label="${esc(p.name)}" title="${esc(p.name)}"></a>`).join('') + `<a href="shop.html" class="g-stone" title="More pieces" aria-label="More pieces"></a>`;
  $$('.tex').forEach(el => el.style.setProperty('--tex', 'url(assets/stars.jpg)'));
  $$('.stars').forEach(el => { const n = +(el.dataset.stars || 10); let h = ''; for (let i = 0; i < n; i++) { const s = 8 + Math.random() * 10; h += `<span class="star" style="left:${Math.random() * 96}%;top:${Math.random() * 90}%;width:${s}px;height:${s}px;animation-delay:${(Math.random() * 5).toFixed(2)}s"><svg><use href="#star4"/></svg></span>`; } el.innerHTML = h; });

  /* ---------- product page reads ?id= ---------- */
  const id = new URLSearchParams(location.search).get('id');
  if ($('#p-name') && P[id]) {
    const p = P[id];
    $('#p-name').textContent = p.name; $('#p-crumb').textContent = p.name; document.title = p.name + ' · Akāpera';
    $('#p-desc').textContent = p.desc + ' Relaxed fit. Model is 175 cm and wears size S.';
    $('#p-price').textContent = mxn(p.price);
    $('#p-img').src = p.img; $('#p-img').alt = p.name + ', full look, example';
    const others = PRODUCTS.filter(x => x.id !== p.id).slice(0, 2);
    $('#p-thumbs').innerHTML = [p.img, p.img2, others[0].img, others[1].img].map(src => `<div class="arch arch--photo"><img src="${src}" alt="" width="480" height="640"></div>`).join('');
    $('#p-color').textContent = 'as shown';
    $('#p-swatches').innerHTML = p.colors.map((c, i) => `<i class="sw${i ? '' : ' on'}" style="background:${c}"></i>`).join('');
    const comp = $('#p-complete');
    if (comp) comp.innerHTML = PRODUCTS.filter(x => x.id !== p.id).slice(0, 4).map(x => card(x, {})).join('');
  }
  $$('.thumbs .arch').forEach(t => t.addEventListener('click', () => { const main = $('#p-img'); if (main) main.src = t.querySelector('img').src; }));

  /* ---------- scroll reveal (groups of three, 90ms stagger) ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const el = e.target; const sib = [...el.parentElement.children].filter(c => c.classList.contains('reveal')); el.style.transitionDelay = ((sib.indexOf(el) % 3) * 90) + 'ms'; el.classList.add('in'); io.unobserve(el); } }), { threshold: .08 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- header: transparent at the very top of the home page ---------- */
  const hdr = $('.hdr');
  if (hdr && hdr.classList.contains('at-top')) { const check = () => hdr.classList.toggle('at-top', window.scrollY < 24); check(); addEventListener('scroll', check, { passive: true }); }

  /* ---------- drawers ---------- */
  const scrim = $('#scrim'), menu = $('#menu-drawer'), bag = $('#bag-drawer');
  let lastFocus = null;
  function openDrawer(d) { closeDrawers(); lastFocus = document.activeElement; d.classList.add('on'); scrim.classList.add('on'); setTimeout(() => $('.close', d).focus(), 60); }
  function closeDrawers() { const was = [menu, bag].some(d => d.classList.contains('on')); [menu, bag].forEach(d => d.classList.remove('on')); scrim.classList.remove('on'); if (was && lastFocus) lastFocus.focus(); }
  scrim.addEventListener('click', closeDrawers);
  $$('.drawer .close').forEach(b => b.addEventListener('click', closeDrawers));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDrawers();
    if (e.key === 'Tab') { const d = [menu, bag].find(x => x.classList.contains('on')); if (!d) return; const f = $$('a,button,input,[tabindex]', d).filter(x => !x.disabled); if (!f.length) return; if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); } }
  });

  /* ---------- demo actions ---------- */
  const toast = $('#toast'); let tt;
  function say(msg) { toast.textContent = msg; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('on'), 2600); }
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-menu],[data-bag],[data-note],#scan-go,.stepper button');
    if (!el) return;
    if (el.dataset.menu) { openDrawer(menu); return; }
    if (el.dataset.bag) { openDrawer(bag); say('Added to your bag'); return; }
    if (el.dataset.note) { e.preventDefault(); say(el.dataset.note); return; }
    if (el.id === 'scan-go') { const r = $('#scan-results'); r.style.display = 'block'; $$('.reveal', r).forEach(x => io.observe(x)); setTimeout(() => r.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); return; }
    if (el.closest('.stepper')) { const n = el.parentElement.querySelector('span'); n.textContent = Math.max(1, +n.textContent + (el.textContent === '+' ? 1 : -1)); }
  });
  document.addEventListener('submit', e => { e.preventDefault(); say('Demo: form submitted'); });
})();
