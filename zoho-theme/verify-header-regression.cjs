const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const acorn = require('acorn');
const postcss = require('postcss');
const { JSDOM } = require('jsdom');
const root = path.join(__dirname, 'release-20261119-v4/template');
const theme = fs.readFileSync(path.join(root, '_theme.face'), 'utf8');
const css = fs.readFileSync(path.join(root, 'stylesheets/pheladelfia.css'), 'utf8');
const start = theme.indexOf('<template id="ph-saved-header-code">');
const end = theme.indexOf('<style type="text/css">{{ page.custom_css }}', start);
assert.ok(start >= 0 && end > start);
const headerBlock = theme.slice(start, end);
const fixture = '<style>.ph-header { background:#0F3B26; } .ph-header__nav a {color:#E6CB7A}</style>' +
  '<header class="ph-header"><nav class="ph-header__nav">{{ section.settings.link1_text }}</nav></header>' +
  '{% schema %} { "name": "PH Header" } {% endschema %}' +
  '<script id="ph-auth">window.phAuthLoaded = true;</script>' +
  '<script id="checkout-fix">window.phCheckoutLoaded = true;</script>' +
  '<meta name="analytics-test" content="preserved">' +
  '<style id="analytics-style">body { --test-marker: 1; }</style>';
const markup = '<!doctype html><html><head>' + headerBlock.replace('{{ page.header_code }}', fixture) +
  '</head><body class="ph-body"><header class="ph-header" id="actual-header">Nursery</header></body></html>';
const dom = new JSDOM(markup, { runScripts: 'dangerously', url: 'https://store.example/' });
const d = dom.window.document;
assert.equal(d.querySelectorAll('header.ph-header').length, 1, 'only the FACE header is rendered');
assert.ok(d.querySelector('#actual-header'));
assert.ok(!d.body.textContent.includes('section.settings'));
assert.ok(!d.body.textContent.includes('{% schema'));
assert.ok(!d.querySelector('#ph-saved-header-code'));
assert.equal(dom.window.phAuthLoaded, true, 'saved authentication script still executes');
assert.equal(dom.window.phCheckoutLoaded, true, 'saved checkout script still executes');
assert.ok(d.head.querySelector('[name="analytics-test"]'), 'retain valid saved metadata');
assert.ok(d.head.querySelector('#analytics-style'), 'retain unrelated saved styles');
assert.ok(![...d.querySelectorAll('style')].some(x => x.textContent.includes('.ph-header__')), 'remove incompatible header styles');
dom.window.close();

const tree = postcss.parse(css);
const rules = [];
tree.walkRules(rule => rules.push(rule));
assert.ok(rules.some(rule => rule.selector === ':where(.ph-body) a'), 'link reset has zero class specificity');
assert.ok(rules.some(rule => rule.selector.includes(':where(.ph-body) h1')), 'heading reset allows component colors');
assert.ok(!rules.some(rule => /^\.ph-body h1,/.test(rule.selector)), 'remove the former heading override');
const hero = rules.find(rule => rule.selector === '.ph-body .ph-hero-title');
assert.ok(hero.nodes.some(declaration => declaration.prop === 'color' && declaration.value === 'var(--ivory)'));
const button = rules.find(rule => rule.selector === '.ph-btn');
assert.ok(button.nodes.some(declaration => declaration.prop === 'color' && declaration.value === 'var(--ivory)'));
const font = rules.find(rule => rule.selector === 'html body.ph-body');
assert.ok(font.nodes.some(declaration => declaration.prop === 'font-family' && declaration.important));
for (const script of theme.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) acorn.parse(script[1], { ecmaVersion: 5 });
acorn.parse(fs.readFileSync(path.join(root, 'js/pheladelfia.js'), 'utf8'), { ecmaVersion: 5 });
console.log('PASS: duplicate-header reproduction, unresolved Liquid/schema removal, saved auth/checkout scripts and metadata, CSS parsing/priority, legacy JavaScript syntax');
