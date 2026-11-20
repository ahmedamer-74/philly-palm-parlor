const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = process.env.PH_THEME_ROOT ? path.resolve(process.env.PH_THEME_ROOT) : path.join(__dirname, 'release-20261119/template');
const releasePath = fs.existsSync(path.join(root, 'js/pheladelfia-release.js')) ? path.join(root, 'js/pheladelfia-release.js') : path.join(root, '../bootstrap.js');
const release = fs.readFileSync(releasePath, 'utf8');
const mainScript = fs.readFileSync(path.join(root, 'js/pheladelfia.js'), 'utf8');
const home = fs.readFileSync(path.join(root, '_homepage.face'), 'utf8').replaceAll('{{ page.template_assets }}', '/template/test');
const pause = () => new Promise(resolve => setTimeout(resolve, 30));

function create(html, pathname = '/') {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(html, { url: 'https://store.example' + pathname, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole });
  const observers = [];
  const Observer = dom.window.MutationObserver;
  dom.window.MutationObserver = class extends Observer {
    constructor(callback) { super(callback); observers.push(this); }
  };
  dom.dispose = () => {
    assert.deepEqual(errors, [], 'no browser runtime errors');
    observers.forEach(observer => observer.disconnect());
    dom.window.close();
  };
  dom.window.matchMedia = () => ({ matches: false, addListener() {} });
  dom.window.AbortController = AbortController;
  return dom;
}

async function run() {
  const fixture = '<article data-ph-product-card data-ph-product-id="catalog-123"><a href="/products/catalog-123"><div class="ph-product-photo"><img src="/product-images/catalog.jpg"></div><h3>Catalog title | عنوان الكتالوج</h3><p>AED 125.00</p></a></article>';
  const dom = create('<main data-ph-page-body>Old furniture</main><div data-ph-route-fallbacks hidden><template data-ph-route="home">' + home + '</template></div>');
  let requests = 0;
  dom.window.fetch = async () => {
    requests++;
    return { ok: true, text: async () => '<div data-ph-product-grid>' + fixture + '</div>' };
  };
  dom.window.eval(release);
  dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
  await pause();
  assert.ok(dom.window.document.querySelector('main .ph-hero'), 'root must render nursery home even when the server Home flag is missing');
  assert.ok(!dom.window.document.body.textContent.includes('Old furniture'));
  assert.ok(dom.window.document.body.classList.contains('is-home'));
  assert.equal(dom.window.document.querySelectorAll('[data-ph-route-fallbacks]').length, 0);
  assert.equal(dom.window.document.querySelectorAll('[data-ph-best-sellers] [data-ph-product-card]').length, 1, 'deduplicate products across categories');
  assert.equal(dom.window.document.querySelector('[data-ph-best-sellers] a').href, 'https://store.example/products/catalog-123');
  assert.equal(dom.window.document.querySelector('[data-ph-best-sellers] img').src, 'https://store.example/product-images/catalog.jpg');
  assert.ok(dom.window.document.querySelector('[data-ph-best-sellers]').textContent.includes('125.00'), 'preserve catalog price');
  assert.equal(dom.window.document.querySelector('[data-ph-best-sellers]').getAttribute('aria-busy'), 'false');
  assert.ok(requests <= 10);
  dom.window.eval(release);
  assert.equal(dom.window.document.querySelectorAll('[data-ph-best-sellers] [data-ph-product-card]').length, 1, 'idempotent bootstrap');
  dom.dispose();

  const child = create(home);
  let childRequests = 0;
  child.window.fetch = async () => ({ ok: true, text: async () => ++childRequests <= 6 ? '<div data-ph-subcats><a href="/categories/species/123">Species</a></div>' : fixture });
  child.window.eval(release);
  child.window.document.dispatchEvent(new child.window.Event('DOMContentLoaded'));
  await pause();
  assert.equal(child.window.document.querySelectorAll('[data-ph-best-sellers] [data-ph-product-card]').length, 1, 'follow real subcategories');
  assert.ok(childRequests <= 10);
  child.dispose();

  const failed = create(home);
  failed.window.fetch = async () => { throw new Error('Offline'); };
  failed.window.eval(release);
  failed.window.document.dispatchEvent(new failed.window.Event('DOMContentLoaded'));
  await pause();
  assert.equal(failed.window.document.querySelector('[data-ph-best-sellers]').hidden, true);
  assert.equal(failed.window.document.querySelector('[data-ph-catalog-status]').hidden, false);
  assert.equal(failed.window.document.querySelector('[data-ph-catalog-loading]').hidden, true);
  failed.dispose();

  const product = create('<main id="native-product">Native product content</main>', '/products/specimen/123');
  product.window.eval(release);
  product.window.document.dispatchEvent(new product.window.Event('DOMContentLoaded'));
  assert.equal(product.window.document.querySelector('#native-product').textContent, 'Native product content');
  product.dispose();

  const about = create('<main data-ph-page-body>Wrong content</main><div data-ph-route-fallbacks><template data-ph-route="about"><h1>Company content</h1></template></div>', '/about/');
  about.window.eval(release);
  about.window.document.dispatchEvent(new about.window.Event('DOMContentLoaded'));
  assert.equal(about.window.document.querySelector('main').textContent, 'Company content');
  about.dispose();

  const arabic = create('<main><h2>Explore our plants</h2><p>From our nursery</p><span>Loading plants…</span><span data-ph-dynamic></span></main>');
  arabic.window.fetch = async () => ({ ok: true, json: async () => ({ payload: { items: [] } }) });
  arabic.window.eval(mainScript);
  arabic.window.document.dispatchEvent(new arabic.window.Event('DOMContentLoaded'));
  await pause();
  assert.equal(arabic.window.document.documentElement.dir, 'rtl');
  assert.equal(arabic.window.document.querySelector('h2').textContent, 'اكتشف نباتاتنا');
  assert.ok(arabic.window.document.body.textContent.includes('من مشتلنا'));
  const dynamic = arabic.window.document.createElement('span');
  dynamic.textContent = 'Catalog title | عنوان الكتالوج';
  arabic.window.document.querySelector('[data-ph-dynamic]').appendChild(dynamic);
  await pause();
  assert.equal(dynamic.textContent, 'عنوان الكتالوج', 'translate catalog content loaded after startup');
  arabic.dispose();

  const english = create('<h2>Explore our plants</h2>');
  english.window.localStorage.setItem('ph_lang', 'en');
  english.window.fetch = async () => ({ json: async () => ({ payload: { items: [] } }) });
  english.window.eval(mainScript);
  english.window.document.dispatchEvent(new english.window.Event('DOMContentLoaded'));
  await pause();
  assert.equal(english.window.document.documentElement.dir, 'ltr');
  assert.equal(english.window.document.querySelector('h2').textContent, 'Explore our plants');
  english.dispose();
  console.log('PASS: root/page routing, native product preservation, catalog cards/prices/images, deduplication, subcategories, request limit, failure fallback, Arabic dynamic translation, English mode');
}
run().catch(error => { console.error(error); process.exitCode = 1; });
