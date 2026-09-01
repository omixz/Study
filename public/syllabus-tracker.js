/**
 * Syllabus tracking functionality
 * Uses embedded HSC_SYLLABUS data
 */

let syllabusProgress = {};
let currentSyllabusSubject = null;

async function loadSyllabusProgress(subjectKey) {
  try {
    const res = await fetch(`/api/progress?subject=${subjectKey}`);
    if (res.ok) {
      syllabusProgress = await res.json();
    }
  } catch (err) {
    console.error('Failed to load progress:', err);
    syllabusProgress = {};
  }
}

async function saveDotPointStatus(dotPointId, status) {
  const subjectKey = currentSyllabusSubject;
  try {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: subjectKey, dotPointId, status })
    });
    if (res.ok) {
      syllabusProgress[dotPointId] = status;
    }
  } catch (err) {
    console.error('Failed to save progress:', err);
  }
}

function renderSyllabusTracker() {
  const syllabusView = document.getElementById('syllabusView');
  const subjectKey = currentSubject;
  currentSyllabusSubject = subjectKey;

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
    btn.onclick = async (e) => {
      e.preventDefault();
      const dotPointId = btn.dataset.id;
      const newStatus = btn.dataset.status;
      await saveDotPointStatus(dotPointId, newStatus);

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

