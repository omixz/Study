import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = `${fs.readFileSync('public/hsc-syllabus-data.js', 'utf8')}\nglobalThis.__syllabus = HSC_SYLLABUS; globalThis.__validate = validateSyllabusData; globalThis.__points = getAllDotPoints;`;
const context = { window: undefined };
vm.createContext(context);
vm.runInContext(source, context);

const subjects = Object.fromEntries(Object.keys(context.__syllabus).map(key => [key, { label: context.__syllabus[key].label }]));
assert.equal(context.__validate(subjects, {}).length, 0, 'checked-in syllabus must pass structural validation');
for (const key of Object.keys(subjects)) {
  const points = context.__points(key);
  assert.ok(points.length > 0, `${key} has dot points`);
  assert.equal(new Set(points.map(point => point.id)).size, points.length, `${key} IDs are unique`);
  assert.ok(points.every(point => point.id.startsWith(`${key}.y12.`)), `${key} uses stable Year 12 IDs`);
}
assert.match(context.__validate(subjects, { 'obsolete-point': 'complete' }).join('\n'), /orphaned tracker progress/);
console.log('Syllabus structural validation passed.');
