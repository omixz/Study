const USER_KEY = 'hsc-user-id';
const QUESTIONS_SEEN_KEY = 'hsc-questions-seen';
const USERS_DB_KEY = 'hsc-users-db';

function getUserId() {
  let userId = localStorage.getItem(USER_KEY);
  if (!userId) {
    userId = 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(USER_KEY, userId);
  }
  return userId;
}

function getUserProfile() {
  const userId = getUserId();
  const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
  if (!db[userId]) {
    db[userId] = {
      id: userId,
      createdAt: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      totalQuestionsAnswered: 0,
      questionsSeenCount: 0
    };
  }
  db[userId].lastVisit = new Date().toISOString();
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
  return db[userId];
}

function recordQuestionSeen(mode, subject, questionId) {
  const userId = getUserId();
  const seen = JSON.parse(localStorage.getItem(QUESTIONS_SEEN_KEY) || '{}');
  if (!seen[userId]) {
    seen[userId] = {};
  }
  if (!seen[userId][mode]) {
    seen[userId][mode] = {};
  }
  if (!seen[userId][mode][subject]) {
    seen[userId][mode][subject] = [];
  }
  if (!seen[userId][mode][subject].includes(questionId)) {
    seen[userId][mode][subject].push(questionId);
  }
  localStorage.setItem(QUESTIONS_SEEN_KEY, JSON.stringify(seen));
  
  // Update user stats
  const profile = getUserProfile();
  profile.questionsSeenCount = Object.values(seen[userId]).reduce((acc, modes) => {
    return acc + Object.values(modes).reduce((sum, qs) => sum + qs.length, 0);
  }, 0);
  const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
  db[userId] = profile;
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
}

function hasSeenQuestion(mode, subject, questionId) {
  const userId = getUserId();
  const seen = JSON.parse(localStorage.getItem(QUESTIONS_SEEN_KEY) || '{}');
  return seen[userId]?.[mode]?.[subject]?.includes(questionId) || false;
}

function getQuestionsSeenByUser() {
  const userId = getUserId();
  const seen = JSON.parse(localStorage.getItem(QUESTIONS_SEEN_KEY) || '{}');
  return seen[userId] || {};
}

function getUniqueQuestionId(subject, topic, content) {
  return btoa(`${subject}-${topic}-${JSON.stringify(content)}`).slice(0, 24);
}

function updateUserStats(mode, statKey, increment = 1) {
  const userId = getUserId();
  const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
  if (!db[userId]) {
    db[userId] = getUserProfile();
  }
  if (!db[userId].modeStats) {
    db[userId].modeStats = {};
  }
  if (!db[userId].modeStats[mode]) {
    db[userId].modeStats[mode] = {};
  }
  db[userId].modeStats[mode][statKey] = (db[userId].modeStats[mode][statKey] || 0) + increment;
  db[userId].totalQuestionsAnswered = (db[userId].totalQuestionsAnswered || 0) + increment;
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
  return db[userId];
}

function getUserDisplayName() {
  const userId = getUserId();
  const user = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}')[userId];
  if (user?.displayName) return user.displayName;
  return 'Student ' + userId.slice(-4).toUpperCase();
}

function setUserDisplayName(name) {
  const userId = getUserId();
  const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
  if (!db[userId]) {
    db[userId] = getUserProfile();
  }
  db[userId].displayName = name;
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
}

console.log('User ID:', getUserId());
console.log('Profile:', getUserProfile());
