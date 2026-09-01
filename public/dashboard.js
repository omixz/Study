/**
 * Progress Dashboard and Statistics
 * Uses localStorage for persistent progress tracking
 */

const SYLLABUS_PROGRESS_KEY = 'hsc-syllabus-progress';

function loadAllProgress() {
  try {
    const stored = localStorage.getItem(SYLLABUS_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (err) {
    console.error('Failed to load progress from localStorage:', err);
    return {};
  }
}

function calculateStats(subject, progress) {
  const syllabus = HSC_SYLLABUS[subject];
  if (!syllabus) return { total: 0, green: 0, orange: 0, red: 0, percent: 0 };
  
  let total = 0;
  let green = 0;
  let orange = 0;
  let red = 0;
  
  Object.entries(syllabus.topics).forEach(([topic, points]) => {
    points.forEach((point, idx) => {
      const id = `${subject}-${topic}-${idx}`;
      const status = progress[id] || 'red';
      total++;
      if (status === 'green') green++;
      else if (status === 'orange') orange++;
      else red++;
    });
  });
  
  const percent = total > 0 ? Math.round((green / total) * 100) : 0;
  return { total, green, orange, red, percent };
}

async function renderDashboard() {
  const allProgress = loadAllProgress();
  const dashboardView = document.getElementById('dashboardView');
  
  if (!dashboardView) return;
  
  let html = '<div class="dashboard-header"><h2>Study Progress Dashboard</h2></div>';
  html += '<div class="stats-grid">';
  
  let totalAll = 0, greenAll = 0, orangeAll = 0, redAll = 0;
  
  Object.keys(SUBJECTS).forEach(key => {
    const subject = SUBJECTS[key];
    const stats = calculateStats(key, allProgress || {});
    
    totalAll += stats.total;
    greenAll += stats.green;
    orangeAll += stats.orange;
    redAll += stats.red;
    
    const color = subject.color || '#999';
    html += `
      <div class="stat-card" style="border-top: 4px solid ${color}">
        <div class="stat-title">${subject.label}</div>
        <div class="stat-percent">${stats.percent}%</div>
        <div class="stat-bar">
          <div class="stat-bar-segment green" style="width: ${(stats.green / stats.total) * 100}%"></div>
          <div class="stat-bar-segment orange" style="width: ${(stats.orange / stats.total) * 100}%"></div>
          <div class="stat-bar-segment red" style="width: ${(stats.red / stats.total) * 100}%"></div>
        </div>
        <div class="stat-details">
          <span class="badge green">🟢 ${stats.green}</span>
          <span class="badge orange">🟠 ${stats.orange}</span>
          <span class="badge red">🔴 ${stats.red}</span>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  
  const totalPercent = totalAll > 0 ? Math.round((greenAll / totalAll) * 100) : 0;
  html += `
    <div class="overall-stats">
      <h3>Overall Progress</h3>
      <div class="overall-percent">${totalPercent}%</div>
      <div class="overall-breakdown">
        <div class="breakdown-item">
          <span class="dot green"></span>
          <span>Fully Know: ${greenAll} / ${totalAll}</span>
        </div>
        <div class="breakdown-item">
          <span class="dot orange"></span>
          <span>Sort of Know: ${orangeAll} / ${totalAll}</span>
        </div>
        <div class="breakdown-item">
          <span class="dot red"></span>
          <span>Need to Learn: ${redAll} / ${totalAll}</span>
        </div>
      </div>
    </div>
  `;
  
  dashboardView.innerHTML = html;
}

async function initDashboard() {
  await renderDashboard();
}
