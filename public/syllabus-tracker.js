const SYLLABUS_PROGRESS_KEY = 'hsc-syllabus-progress';
let syllabusProgress = {};
function loadSyllabusProgress() { try { syllabusProgress = JSON.parse(localStorage.getItem(SYLLABUS_PROGRESS_KEY) || '{}'); } catch { syllabusProgress = {}; } return syllabusProgress; }
function saveProgress() { localStorage.setItem(SYLLABUS_PROGRESS_KEY, JSON.stringify(syllabusProgress)); }
function completed(id) { return syllabusProgress[id] === 'complete'; }
function dotPointStatus(id) { return syllabusProgress[id] || 'needs-review'; }
function syllabusStats(key) { const items = getAllDotPoints(key); const done = items.filter(x => completed(x.id)).length; return { total: items.length, done, percent: items.length ? Math.round(done / items.length * 100) : 0 }; }
function renderSyllabusTracker() {
  loadSyllabusProgress();
  const validationErrors = validateSyllabusData(SUBJECTS, syllabusProgress);
  if (validationErrors.length && shouldValidateSyllabus()) throw new Error(`Invalid syllabus tracker:\n${validationErrors.join('\n')}`);
  if (validationErrors.length) { const validIds = new Set(Object.keys(SUBJECTS).flatMap(getAllDotPoints).map(item => item.id)); Object.keys(syllabusProgress).forEach(id => { if (!validIds.has(id)) delete syllabusProgress[id]; }); saveProgress(); }
  const key = currentSubject, syllabus = HSC_SYLLABUS[key], view = document.getElementById('syllabusView');
  if (!syllabus) { view.innerHTML = '<div class="fb-note">No Year 12 syllabus data is available.</div>'; return; }
  const stats = syllabusStats(key);
  view.innerHTML = `<section class="tracker-head"><div><span class="eyebrow">Year 12 / HSC</span><h2>Syllabus</h2></div><strong>${stats.percent}% complete</strong></section><p class="status-key"><i class="needs-review"></i> Need review <i class="in-progress"></i> In progress <i class="complete"></i> Complete</p><input class="syllabus-search" id="syllabusSearch" type="search" placeholder="Search syllabus…">${syllabus.topics.map((topic, ti) => `<details class="syllabus-topic" open><summary><span>${escapeHtml(topic.name)}</span><small>${escapeHtml(topic.subtopic)} · ${topic.points.length}</small></summary><div class="dot-list">${topic.points.map((text, pi) => { const id = syllabusId(key,ti,pi), status = dotPointStatus(id); return `<div class="dot-point ${status}" data-search="${escapeHtml((topic.name+' '+topic.subtopic+' '+text).toLowerCase())}"><input type="checkbox" aria-label="Mark complete" data-id="${id}" ${completed(id) ? 'checked' : ''}><span>${escapeHtml(text)}</span><div class="status-actions" aria-label="Set revision status"><button data-id="${id}" data-status="needs-review" class="${status === 'needs-review' ? 'active' : ''}" title="Need review">●</button><button data-id="${id}" data-status="in-progress" class="${status === 'in-progress' ? 'active' : ''}" title="In progress">●</button><button data-id="${id}" data-status="complete" class="${status === 'complete' ? 'active' : ''}" title="Complete">●</button></div></div>`; }).join('')}</div></details>`).join('')}`;
  view.querySelectorAll('input[type=checkbox]').forEach(box => box.onchange = () => { syllabusProgress[box.dataset.id] = box.checked ? 'complete' : 'needs-review'; saveProgress(); renderSyllabusTracker(); if (typeof renderDashboard === 'function') renderDashboard(); });
  view.querySelectorAll('.status-actions button').forEach(button => button.onclick = () => { syllabusProgress[button.dataset.id] = button.dataset.status; saveProgress(); renderSyllabusTracker(); if (typeof renderDashboard === 'function') renderDashboard(); });
  view.querySelector('#syllabusSearch').oninput = e => view.querySelectorAll('.dot-point').forEach(row => row.hidden = !row.dataset.search.includes(e.target.value.toLowerCase()));
}
function initSyllabus() { renderSyllabusTracker(); }
