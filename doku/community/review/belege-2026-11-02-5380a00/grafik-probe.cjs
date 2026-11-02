// Execute the original graph and original low-level helpers with a minimal tree.
// This is an attribute/structure reproduction, not a browser or axe run.
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const root = process.argv[2];
const js = fs.readFileSync(path.join(root, 'quellen/azubipass.js'), 'utf8');
const core = fs.readFileSync(path.join(root, 'quellen/kern.js'), 'utf8');
const originalHelpers = core.slice(core.indexOf('  function el('), core.indexOf('  var datumsformat'));
const graph = js.slice(js.indexOf('  function gBestellmenge('), js.indexOf('  function gPauschale('));
const elements = [];
class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.attrs = {}; this.dataset = {}; this.events = {}; this.parentElement = null; elements.push(this); }
  appendChild(child) { this.children.push(child); child.parentElement = this; return child; }
  setAttribute(name, value) { this.attrs[name] = String(value); }
  getAttribute(name) { return this.attrs[name] ?? null; }
  addEventListener(name, fn) { this.events[name] = fn; }
  set innerHTML(value) { this.html = value; this.children = []; }
  get innerHTML() { return this.html || ''; }
}
const document = {createElement: tag => new Element(tag), createElementNS: (ns, tag) => new Element(tag)};
const scope = {document, Math, Intl};
vm.createContext(scope);
vm.runInContext(originalHelpers + '\nvar AP = {zahl, kommafeld}; var geld = n => (Math.round(n*100)/100).toLocaleString("de-DE") + " €";\n' + graph, scope);
const chapter = JSON.parse(fs.readFileSync(path.join(root, 'quellen/ik2024-lf04-k02.kapitel.json'), 'utf8'));
const data = chapter.bloecke.flatMap(s => s.inhalt || []).find(b => b.variante === 'bestellmenge');
scope.data = data; scope.stage = new Element('div');
vm.runInContext('gBestellmenge(stage, data)', scope);
const inputs = elements.filter(e => e.tag === 'input');
const names = inputs.map(input => {
  const label = input.parentElement.children.find(e => e.tag === 'label');
  return {visibleLabel: label.textContent, id: input.id || input.attrs.id || '',
    ariaLabel: input.attrs['aria-label'] || '', ariaLabelledby: input.attrs['aria-labelledby'] || '',
    labelFor: label.htmlFor || label.attrs.for || '', nestedInLabel: input.parentElement.tag === 'label'};
});
if (inputs.length !== 3 || names.some(n => n.id || n.ariaLabel || n.ariaLabelledby || n.labelFor || n.nestedInLabel)) {
  throw new Error('Observed label structure differs; inspect this review again.');
}
console.log(JSON.stringify({mode:'Originalfunktionen mit minimalem DOM, kein Browserlauf', inputs:names,
  quantityAtMinimum:Math.sqrt(2*10000*50/2), annualCostAtMinimum:Math.sqrt(2*10000*50*2)}, null, 2));
