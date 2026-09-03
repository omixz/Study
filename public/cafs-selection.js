/**
 * This study plan does not include the CAFS Individuals and Work option.
 * Remove it consistently from every learning mode before the interface renders.
 */
(function removeUnselectedCafsTopic() {
  const cafs = SUBJECTS.cafs;
  if (!cafs) return;

  const excludedTopic = 'Individuals and Work';
  ['cards', 'practice', 'essay', 'mcq', 'notes'].forEach((collection) => {
    if (!Array.isArray(cafs[collection])) return;
    cafs[collection] = cafs[collection].filter((item) => item.t !== excludedTopic);
  });
}());
