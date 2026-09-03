/** Lightweight local spaced-repetition layer for the existing flashcard decks. */
(function enableReviewMode() {
  const REVIEW_KEY = 'hsc-card-review-v1';
  const intervals = { again: 0, hard: 1, good: 3, easy: 7 };

  function readReviews() {
    try { return JSON.parse(localStorage.getItem(REVIEW_KEY) || '{}'); } catch { return {}; }
  }

  function cardId(card) {
    return getUniqueQuestionId(currentSubject, card.topic || 'General', card.q);
  }

  function saveReview(card, rating) {
    const reviews = readReviews();
    const now = new Date();
    const due = new Date(now);
    due.setDate(due.getDate() + intervals[rating]);
    reviews[cardId(card)] = { rating, reviewedAt: now.toISOString(), dueAt: due.toISOString() };
    localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews));
  }

  window.renderFlash = function renderFlashReview() {
    const subject = SUBJECTS[currentSubject];
    const cards = fCards(subject);
    const view = document.getElementById('flashView');
    if (!cards.length) {
      view.innerHTML = '<div class="fb-note">No flashcards under "' + escapeHtml(currentTopic) + '" yet.</div>';
      return;
    }

    const card = cards[cardIndex % cards.length];
    const review = readReviews()[cardId(card)];
    const metadata = [subject.label, card.topic || 'General'].filter(Boolean).join(' · ');
    view.innerHTML = '<div class="tally">' + escapeHtml(metadata.toUpperCase()) + ' · CARD ' + (cardIndex % cards.length + 1) + ' / ' + cards.length + '</div>' +
      '<div class="card" id="flashCard" role="button" tabindex="0" aria-label="Reveal answer"><div class="card-inner"><div class="face front"><div class="face-label">Question</div><div class="face-text">' + escapeHtml(card.q) + '</div><div class="tap-hint">Press Space or tap to reveal</div></div><div class="face back"><div class="face-label">Answer</div><div class="face-text">' + escapeHtml(card.a) + '</div><div class="tap-hint">Rate how well you knew it</div></div></div></div>' +
      '<div class="deck-nav" id="reviewActions" style="display:none"><button class="nav-btn" data-rating="again">1 · Again</button><button class="nav-btn" data-rating="hard">2 · Hard</button><button class="nav-btn got-it" data-rating="good">3 · Good</button><button class="nav-btn" data-rating="easy">4 · Easy</button></div>' +
      '<div class="deck-nav"><button class="nav-btn" id="prevBtn">Prev</button><button class="nav-btn random-btn" id="randomBtn">&#128256;</button><button class="nav-btn got-it" id="nextBtn">Next</button></div>' +
      (review ? '<div class="tap-hint">Last rating: ' + escapeHtml(review.rating) + '</div>' : '');
    const flashCard = document.getElementById('flashCard');
    const reveal = () => { flipped = !flipped; flashCard.classList.toggle('flipped', flipped); document.getElementById('reviewActions').style.display = flipped ? 'flex' : 'none'; };
    flashCard.onclick = reveal;
    flashCard.onkeydown = (event) => { if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); reveal(); } };
    document.querySelectorAll('[data-rating]').forEach((button) => { button.onclick = () => { saveReview(card, button.dataset.rating); cardIndex = (cardIndex + 1) % cards.length; flipped = false; renderFlash(); }; });
    document.getElementById('prevBtn').onclick = () => { cardIndex = (cardIndex - 1 + cards.length) % cards.length; flipped = false; renderFlash(); };
    document.getElementById('nextBtn').onclick = () => { cardIndex = (cardIndex + 1) % cards.length; flipped = false; renderFlash(); };
    document.getElementById('randomBtn').onclick = () => { cardIndex = randIdx(cards.length, cardIndex % cards.length); flipped = false; renderFlash(); };
  };

  document.addEventListener('keydown', (event) => {
    if (currentMode !== 'flash' || event.target.matches('textarea, input')) return;
    if (event.key === ' ') { event.preventDefault(); document.getElementById('flashCard')?.click(); }
    const rating = { 1: 'again', 2: 'hard', 3: 'good', 4: 'easy' }[event.key];
    if (rating && flipped) document.querySelector('[data-rating="' + rating + '"]')?.click();
  });

  renderFlash();
}());
