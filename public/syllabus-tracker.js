/**
 * Syllabus tracking functionality
 * Uses embedded HSC_SYLLABUS data and localStorage for persistence
 */

let syllabusProgress = {};
let currentSyllabusSubject = null;
const SYLLABUS_PROGRESS_KEY = 'hsc-syllabus-progress';

function loadSyllabusProgress(subjectKey) {
  try {
    const stored = localStorage.getItem(SYLLABUS_PROGRESS_KEY);
    syllabusProgress = stored ? JSON.parse(stored) : {};
  } catch (err) {
    console.error('Failed to load progress from localStorage:', err);
    syllabusProgress = {};
  }
}

function saveDotPointStatus(dotPointId, status) {
  const subjectKey = currentSyllabusSubject;
  try {
    syllabusProgress[dotPointId] = status;
    localStorage.setItem(SYLLABUS_PROGRESS_KEY, JSON.stringify(syllabusProgress));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

function renderSyllabusTracker() {
  const syllabusView = document.getElementById('syllabusView');
  const subjectKey = currentSubject;
  currentSyllabusSubject = subjectKey;

  loadSyllabusProgress(subjectKey);

  const syllabus = HSC_SYLLABUS[subjectKey];
  if (!syllabus) {
    syllabusView.innerHTML = '<div class="fb-note">No syllabus data for this subject yet.</div>';
    return;
  }

  let html = '';
  let dotPointCount = 0;
  
  Object.entries(syllabus.topics).forEach(([topicName, dotPoints]) => {
    html += `<div class="syllabus-topic"><h3>${escapeHtml(topicName)}</h3>`;
    dotPoints.forEach((point, pointIdx) => {
      const id = `${subjectKey}-${topicName}-${pointIdx}`;
      const status = syllabusProgress[id] || 'red';
      
      html += `
        <div class="dot-point ${status}" id="dp-${id}">
          <div class="dot-point-text">${escapeHtml(point)}</div>
          <div class="dot-point-buttons">
            <button class="status-btn ${status === 'red' ? 'active' : 'red'}" data-id="${id}" data-status="red" title="Need to learn">🔴</button>
            <button class="status-btn ${status === 'orange' ? 'active' : 'orange'}" data-id="${id}" data-status="orange" title="Sort of know">🟠</button>
            <button class="status-btn ${status === 'green' ? 'active' : 'green'}" data-id="${id}" data-status="green" title="Fully know">🟢</button>
          </div>
        </div>
      `;
      dotPointCount++;
    });
    html += '</div>';
  });

  syllabusView.innerHTML = html;

  // Attach click handlers to all status buttons
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const dotPointId = btn.dataset.id;
      const newStatus = btn.dataset.status;
      saveDotPointStatus(dotPointId, newStatus);

      const dotPointEl = document.getElementById(`dp-${dotPointId}`);
      dotPointEl.classList.remove('red', 'orange', 'green');
      dotPointEl.classList.add(newStatus);

      const btns = dotPointEl.querySelectorAll('.status-btn');
      btns.forEach(b => {
        b.classList.remove('active', 'red', 'orange', 'green');
        if (b.dataset.status === newStatus) {
          b.classList.add('active');
        } else {
          b.classList.add(b.dataset.status);
        }
      });
    };
  });
}

async function initSyllabus() {
  await loadSyllabusProgress(currentSubject);
  renderSyllabusTracker();
}

