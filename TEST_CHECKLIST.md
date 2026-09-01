# HSC Revision Platform - Test Checklist

## Platform Features

### 1. **Main Layout & Navigation**
- [ ] Load page at `localhost:3000`
- [ ] Verify 6 subject buttons visible (CAFS, Business, Legal, English, + Other subject?)
- [ ] Verify all buttons render without overlapping
- [ ] Verify "2024/25 NESA PAPER" link visible for each subject

### 2. **Mode Buttons (7 Total)**
- [ ] Verify all 7 mode buttons render: Cards | Practice | Essay | Quiz | Notes | 📋 Syllabus | 📊 Dashboard
- [ ] Click "Cards" → flashView displays with flashcard
- [ ] Click "Practice" → practiceView displays with practice question
- [ ] Click "Essay" → essayView displays with essay task
- [ ] Click "Quiz" → mcqView displays with multiple choice
- [ ] Click "Notes" → notesView displays with bullet points
- [ ] Click "📋 Syllabus" → syllabusView displays with dot points
- [ ] Click "📊 Dashboard" → dashboardView displays with statistics

### 3. **Flashcard Mode (Cards)**
- [ ] Card displays front text (question)
- [ ] Click card → flips to show back (answer)
- [ ] "Got it" button marks card as complete
- [ ] "Skip" button moves to next card
- [ ] Random button shuffles deck
- [ ] Card count shows position (e.g., "3 of 8")
- [ ] All topics are selectable and load their cards

### 4. **Practice Mode**
- [ ] Question displays with marks value
- [ ] Textarea shows word count
- [ ] "Submit for marking" button functional
- [ ] Marking criteria displays/hides on toggle
- [ ] Feedback appears with score and comments
- [ ] "Next question" button available after marking
- [ ] Works for all subjects

### 5. **Essay Mode**
- [ ] Shows essay task (e.g., "Write the Introduction only")
- [ ] Marks value displayed
- [ ] Textarea for student response
- [ ] Criteria toggle shows marking guidelines
- [ ] Submit works and returns feedback
- [ ] Feedback includes specific band descriptors
- [ ] Next button advances to next essay part

### 6. **Quiz Mode (MCQ)**
- [ ] Question displays with 4 options (A, B, C, D)
- [ ] Click option → immediate feedback
- [ ] Correct option highlighted in green
- [ ] Incorrect option highlighted in red
- [ ] Explanation provided for correct answer
- [ ] Score tracked (e.g., "3/6 correct")
- [ ] Next button advances to next question
- [ ] All MCQs have 4 self-contained short phrases as options

### 7. **Notes Mode**
- [ ] Displays organized by topic
- [ ] Each topic has heading and bullet points
- [ ] Each point has short heading + explanation
- [ ] Multiple subjects have notes available
- [ ] Notes are readable and well-formatted

### 8. **Syllabus Tracker (📋 Syllabus)**
- [ ] Displays all dot points for selected subject
- [ ] Dot points organized by topic
- [ ] Each dot point has 3 status buttons: 🔴 (red/need to learn), 🟠 (orange/sort of know), 🟢 (green/fully know)
- [ ] Click status button → saves progress
- [ ] Progress persists on page reload (localStorage)
- [ ] Red dot point has red left border
- [ ] Orange dot point has orange left border
- [ ] Green dot point has green left border
- [ ] ALL 4 subjects load:
  - **CAFS**: Social Impact of Technology (7 dot points)
  - **Business Studies**: 5 topics with 7-8 dot points each
  - **Legal Studies**: Family Law (7 dot points) + Indigenous Law (8 dot points)
  - **English**: Playing the Game (8 dot points) + We Are Australians (8 dot points)

### 9. **Dashboard (📊 Dashboard)**
- [ ] Displays progress statistics for each subject
- [ ] Shows completion % for each subject as a large number
- [ ] Visual progress bar shows green/orange/red breakdown
- [ ] Badges show counts: "Green: 5" "Orange: 3" "Red: 12"
- [ ] Overall completion % at bottom
- [ ] Overall breakdown shows total counts by status
- [ ] Stats update when dot point status changes
- [ ] Dashboard loads all existing progress

### 10. **Dark Mode Toggle (🌙/☀️)**
- [ ] Button visible in top-right corner (fixed position)
- [ ] Click button when light mode → switches to dark mode (button becomes ☀️)
- [ ] Click button when dark mode → switches to light mode (button becomes 🌙)
- [ ] Dark mode theme applies to:
  - Background color (#1A1F2E)
  - Card background (#2A2F3E)
  - Text color (#E8EEF5)
  - Secondary text (#A0B0C0)
- [ ] Theme preference persists on page reload (localStorage)
- [ ] All text remains readable in both modes
- [ ] Mode works independently of selected subject/mode

### 11. **Subject Selection**
- [ ] CAFS button → loads CAFS cards/practice/essays/notes
- [ ] Business Studies button → loads Business cards/practice/essays/notes
- [ ] Legal Studies button → loads Legal cards/practice/essays/notes
- [ ] English button → loads English cards/practice/essays/notes
- [ ] "+ Other subject?" → opens modal to generate subject
- [ ] Modal generator works with Groq API

### 12. **Data Accuracy** (Verify all subjects contain specified topics)
- [ ] **CAFS**:
  - Social Impact of Technology (7 dot points) ✓
- [ ] **Legal Studies**:
  - Family Law (7 dot points) ✓
  - Indigenous Law (8 dot points) ✓
- [ ] **English**:
  - Playing the Game (8 dot points) ✓
  - We Are Australians (8 dot points) ✓

### 13. **Responsive Design**
- [ ] Page works on mobile (max-width: 460px)
- [ ] Page works on tablet
- [ ] Page works on desktop
- [ ] Mode buttons stack correctly on narrow screens
- [ ] Topic chips scroll horizontally on small screens
- [ ] No horizontal scrolling on page width

### 14. **Performance**
- [ ] Page loads quickly (< 2 seconds)
- [ ] Switching modes is instant
- [ ] Dashboard calculations complete within 1 second
- [ ] Flashcard flip animation smooth
- [ ] No console errors

### 15. **API Integration**
- [ ] Environment variable `GROQ_API_KEY` required (check vercel.json)
- [ ] Practice mode marking calls `/api/mark`
- [ ] Essay mode marking calls `/api/mark`
- [ ] Generator modal calls `/api/generate`
- [ ] Single question generation calls `/api/question`
- [ ] Progress tracking calls `/api/progress`

### 16. **Error Handling**
- [ ] Missing Groq API key shows clear error message
- [ ] Network errors handled gracefully
- [ ] Invalid JSON from API shows error
- [ ] Marking failure shows retry option
- [ ] Generation timeout shows clear message

## Browser DevTools Checks

### Console
- [ ] No JavaScript errors on page load
- [ ] No 404s for script files or assets
- [ ] theme.js initializes without errors
- [ ] dashboard.js initializes without errors
- [ ] All event listeners attached correctly

### Network
- [ ] All .js files load successfully
- [ ] index.html loads
- [ ] No failed API calls on initial load
- [ ] API calls succeed when testing features

### Storage
- [ ] localStorage contains "hsc-theme" key (if toggled)
- [ ] localStorage contains progress keys like "cafs-{topicName}-{index}"
- [ ] Values are correct after toggling theme/progress

## Final Verification

- [ ] All 7 mode buttons render and function
- [ ] All 4 subjects have complete, accurate syllabus data
- [ ] Red-orange-green tracker works with persistence
- [ ] Dashboard shows accurate statistics
- [ ] Dark mode works with localStorage persistence
- [ ] Theme toggle button accessible (top-right, fixed)
- [ ] No console errors
- [ ] Ready to deploy to Vercel

## Deployment Checklist

- [ ] All files committed to GitHub
- [ ] `.env.example` contains all required vars
- [ ] `vercel.json` declares required env vars
- [ ] `package.json` has correct scripts
- [ ] No secrets in source code
- [ ] No node_modules in repo
- [ ] README.md has setup instructions

---

**Status**: Ready for QA testing ✅
