/** Static, offline syllabus-coverage cards for every checked-in dot point. */
(function addSyllabusCoverageCards() {
  Object.entries(HSC_SYLLABUS).forEach(([subjectKey, syllabus]) => {
    const subject = SUBJECTS[subjectKey];
    if (!subject) return;

    const coverageCards = [];
    Object.entries(syllabus.topics).forEach(([topic, dotPoints]) => {
      dotPoints.forEach((dotPoint, index) => {
        coverageCards.push({
          id: `syllabus-${subjectKey}-${topic}-${index}`,
          topic,
          q: `What do you need to be able to do for this syllabus dot point?\n\n${dotPoint}`,
          a: `${dotPoint}.\n\nExplain the relevant concepts, apply them to an example, and make a judgement where the directive verb requires one.`,
          syllabusCard: true
        });
      });
    });

    subject.cards = [...coverageCards, ...subject.cards];
  });
}());
