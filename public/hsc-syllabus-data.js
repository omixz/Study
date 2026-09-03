/*
 * Year 12/HSC syllabus tracker data.  The wording and sequence below follow
 * the published NESA Stage 6 course documents (source URLs are kept with the
 * course so an annual audit is straightforward).  An item is deliberately a
 * single assessable syllabus point; it is never a hand-written percentage.
 */
const HSC_SYLLABUS = {
  cafs: course('CAFS', '#D6667A', 'https://curriculum.nsw.edu.au/learning-areas/hsie/community-and-family-studies-11-12-2003/content/year-12', [
    topic('Research Methodology', 'Students learn to', ['identify and explain the purpose of research', 'distinguish primary and secondary research', 'identify quantitative and qualitative research', 'select appropriate research methods', 'develop research questions', 'formulate hypotheses', 'identify variables', 'collect, organise and analyse data', 'evaluate reliability and validity', 'identify ethical considerations', 'draw conclusions from research', 'communicate research findings', 'evaluate research methodologies']),
    topic('Groups in Context', 'Students learn to', ['investigate characteristics of groups', 'examine factors affecting groups', 'investigate needs of specific groups', 'examine resource management', 'analyse inequities experienced by groups', 'investigate community support', 'evaluate strategies addressing group needs']),
    topic('Parenting and Caring', 'Students learn to', ['investigate the nature of parenting and caring', 'examine factors affecting parenting/caring', 'investigate responsibilities associated with parenting', 'examine resources available to parents/carers', 'analyse societal attitudes and expectations', 'investigate the impact of parenting/caring on wellbeing', 'evaluate support available to parents/carers', 'examine strategies for effective parenting/caring']),
    topic('Social Impact of Technology', 'Technology and society', ['The development of technology', 'Access to and acceptance of technology', 'The impact of technology on individuals, families, work and communities'])
  ]),
  business: course('Business Studies', '#3E7CB1', 'https://curriculum.nsw.edu.au/learning-areas/hsie/business-studies-11-12-2009/content/year-12', [
    topic('Operations', 'The role of operations management', ['Strategic role of operations management', 'Goods and/or services in different types of businesses']),
    topic('Operations', 'Influences on operations', ['Globalisation', 'Technology', 'Quality expectations', 'Cost-based competition', 'Government policies', 'Legal regulation', 'Environmental sustainability']),
    topic('Operations', 'Operations processes', ['Inputs', 'Transformation processes', 'Outputs']),
    topic('Operations', 'Operations strategies', ['Performance objectives', 'New product or service design and development', 'Supply chain management', 'Outsourcing', 'Technology', 'Inventory management', 'Quality management', 'Overcoming resistance to change']),
    topic('Operations', 'Students learn to', ['analyse the role of operations management', 'investigate operations processes', 'analyse influences on operations', 'examine operations strategies', 'evaluate operations strategies', 'analyse the impact of operations management on business performance']),
    topic('Marketing', 'The role of marketing', ['Strategic role of marketing goods and services', 'Interdependence with other key business functions']),
    topic('Marketing', 'Influences on marketing', ['Factors influencing customer choice', 'Consumer laws', 'Financial situation', 'Technology', 'Globalisation', 'Social and ethical issues']),
    topic('Marketing', 'Market research process', ['Situational analysis', 'Market research', 'Establishing market objectives', 'Identifying target markets', 'Developing market strategies', 'Implementing, monitoring and controlling']),
    topic('Marketing', 'Marketing strategies', ['Market segmentation', 'Product', 'Price', 'Promotion', 'Place', 'People, processes and physical evidence', 'E-marketing', 'Global marketing']),
    topic('Marketing', 'Students learn to', ['analyse the role of marketing', 'investigate influences on marketing', 'examine marketing strategies', 'analyse the marketing process', 'evaluate marketing strategies', 'analyse the relationship between marketing and other business functions']),
    topic('Finance', 'The role of financial management', ['Strategic role of financial management', 'Interdependence with other key business functions']),
    topic('Finance', 'Influences on financial management', ['Internal sources of finance', 'External sources of finance', 'Influence of globalisation', 'Influence of technology', 'Government influence', 'Institutional influence']),
    topic('Finance', 'Financial management processes', ['Planning and implementing', 'Debt and equity financing', 'Matching the terms and sources of finance to business purpose', 'Monitoring and controlling']),
    topic('Finance', 'Financial management strategies', ['Cash flow management', 'Working capital management', 'Profit management', 'Global market influences', 'Financial planning']),
    topic('Finance', 'Students learn to', ['analyse the role of financial management', 'examine sources of finance', 'investigate financial management processes', 'analyse financial ratios', 'interpret financial statements', 'evaluate financial management strategies', 'analyse the impact of financial management on business performance']),
    topic('Human Resources', 'The role of human resource management', ['Strategic role of human resource management', 'Interdependence with other key business functions']),
    topic('Human Resources', 'Influences on human resource management', ['Stakeholders', 'Legal influences', 'Economic influences', 'Technology', 'Globalisation', 'Social and ethical issues']),
    topic('Human Resources', 'Human resource management processes', ['Acquisition', 'Development', 'Maintenance', 'Separation']),
    topic('Human Resources', 'Human resource management strategies', ['Leadership style', 'Skills', 'Outsourcing', 'Changing work patterns', 'Interdependence with other key business functions'])
    ,topic('Human Resources', 'Students learn to', ['analyse the role of human resource management', 'investigate influences on human resource management', 'examine human resource processes', 'analyse human resource strategies', 'evaluate human resource strategies', 'analyse the relationship between HR and other business functions'])
  ]),
  legal: course('Legal Studies', '#5B8C5A', 'https://curriculum.nsw.edu.au/learning-areas/hsie/legal-studies-11-12-2009/content/year-12', [
    topic('Crime', 'The nature of crime', ['The meaning of crime', 'The elements of crime: actus reus, mens rea', 'Categories of crime', 'The purposes of punishment', 'Factors affecting criminal behaviour']),
    topic('Crime', 'The investigation process', ['Police powers', 'Reporting crime', 'Investigating crime', 'Arrest and charge', 'Search and seizure', 'Bail or remand', 'Detention and interrogation', 'Role of the courts']),
    topic('Crime', 'The criminal trial process', ['Court jurisdiction', 'Legal personnel', 'The adversary system', 'Burden and standard of proof', 'Use of evidence', 'Defences to criminal charges', 'The role of juries']),
    topic('Crime', 'Sentencing and punishment', ['Purposes of punishment', 'Factors affecting a sentencing decision', 'Types of penalties', 'Post-sentencing considerations']),
    topic('Crime', 'Young offenders', ['Age of criminal responsibility', 'The Children’s Court', 'Penalties for children']),
    topic('Crime', 'Students learn to', ['investigate the nature of crime', 'examine criminal responsibility', 'analyse factors affecting criminal behaviour', 'investigate criminal investigation and trial processes', 'evaluate criminal trial processes', 'analyse sentencing and punishment', 'evaluate the effectiveness of sentencing and punishment', 'investigate international crime', 'evaluate the effectiveness of legal and non-legal responses']),
    topic('Human Rights', 'The nature and development of human rights', ['The definition of human rights', 'The origins and development of human rights', 'Universal Declaration of Human Rights', 'The role of state sovereignty']),
    topic('Human Rights', 'Promoting and enforcing human rights', ['The role of the United Nations', 'International instruments', 'The role of courts and tribunals', 'The role of non-government organisations']),
    topic('Human Rights', 'Human rights in Australia', ['The Constitution', 'Statute law', 'Common law', 'Courts and tribunals', 'The Australian Human Rights Commission', 'A Charter of Rights']),
    topic('Human Rights', 'Contemporary issue: refugees and asylum seekers', ['The nature of the issue', 'Legal and non-legal responses', 'Effectiveness of the responses']),
    topic('Human Rights', 'Students learn to', ['investigate the development of human rights', 'examine contemporary human-rights issues', 'analyse the effectiveness of international instruments', 'investigate Australian responses', 'evaluate legal and non-legal responses', 'assess the effectiveness of mechanisms for protecting human rights']),
    topic('Family', 'The nature of family law', ['The concept of family', 'The nature of family law', 'The role of the state']),
    topic('Family', 'Responses to problems in family relationships', ['The roles of courts and dispute resolution', 'The roles of the community', 'The roles of the state']),
    topic('Family', 'Contemporary issue: relationship breakdown', ['The nature of the issue', 'Legal and non-legal responses', 'Effectiveness of the responses']),
    topic('Family', 'Students learn to', ['investigate the legal nature of family relationships', 'examine changing family structures', 'analyse legal issues affecting families', 'investigate dispute-resolution mechanisms', 'evaluate legal and non-legal responses', 'assess the effectiveness of law in achieving justice']),
    topic('Indigenous Peoples', 'The nature of Indigenous peoples’ rights', ['The definition of Indigenous peoples’ rights', 'The development of Indigenous peoples’ rights', 'The role of state sovereignty']),
    topic('Indigenous Peoples', 'Promoting and enforcing Indigenous peoples’ rights', ['The role of the United Nations', 'International instruments', 'The role of courts and tribunals', 'The role of non-government organisations']),
    topic('Indigenous Peoples', 'Contemporary issue: land rights', ['The nature of the issue', 'Legal and non-legal responses', 'Effectiveness of the responses']),
    topic('Indigenous Peoples', 'Students learn to', ['investigate the relationship between Indigenous peoples and Australian law', 'examine customary law', 'analyse issues affecting Indigenous peoples', 'investigate legal and non-legal responses', 'evaluate the effectiveness of those responses', 'assess whether justice has been achieved'])
  ]),
  english: course('English Studies', '#B8863B', 'https://curriculum.nsw.edu.au/learning-areas/english/english-studies-stage-6-2017/content/year-12', [
    topic('Texts and Human Experiences', 'Common module', ['Students deepen their understanding of how texts represent individual and collective human experiences.', 'Students examine how texts represent human qualities and emotions associated with, or arising from, these experiences.', 'Students appreciate, explore, interpret, analyse and evaluate the ways language is used to shape these representations in a range of texts.', 'Students explore how texts may give insight into the anomalies, paradoxes and inconsistencies in human behaviours and motivations.']),
    topic('We Are Australians', 'Elective module', ['Students explore the ways that texts represent Australian identities.', 'Students examine how texts represent individual and collective experiences of being Australian.', 'Students explore how language forms, features and structures shape representations of Australia and Australians.']),
    topic('Playing the Game', 'Elective module', ['Students explore how texts represent games and sport as significant social and cultural practices.', 'Students examine how texts represent the values, attitudes and beliefs associated with games and sport.', 'Students explore how language forms, features and structures shape representations of playing the game.']),
    topic('Craft of Writing', 'Craft of writing', ['Students use processes of planning, drafting, rehearsing, refining and editing to compose for a range of purposes and audiences.', 'Students use language forms and features to shape meaning in imaginative, discursive, persuasive and informative texts.', 'Students reflect on their own composing processes and the ways they make choices for audience, purpose and context.'])
  ])
};
function course(label, color, source, topics) { return { label, color, source, topics }; }
function topic(name, subtopic, points) { return { name, subtopic, points }; }
function syllabusId(subjectKey, topicIndex, pointIndex) { return `${subjectKey}.y12.${String(topicIndex + 1).padStart(2, '0')}.${String(pointIndex + 1).padStart(2, '0')}`; }
function getSyllabusData() { return HSC_SYLLABUS; }
function getSubjectSyllabus(subjectKey) { return HSC_SYLLABUS[subjectKey] || null; }
function getAllDotPoints(subjectKey) { const s = HSC_SYLLABUS[subjectKey]; return s ? s.topics.flatMap((t, ti) => t.points.map((text, pi) => ({ id: syllabusId(subjectKey, ti, pi), topic: t.name, subtopic: t.subtopic, text, order: [ti, pi] }))) : []; }

// Every tracker item has at least one revision prompt. Existing authored cards
// remain untouched; these syllabus-linked cards fill only the coverage gaps.
function ensureSyllabusFlashcards(subjects) {
  Object.keys(subjects || {}).forEach(subjectKey => {
    const subject = subjects[subjectKey];
    if (!HSC_SYLLABUS[subjectKey] || !subject) return;
    subject.cards = subject.cards || [];
    const covered = new Set(subject.cards.map(card => card.syllabusId));
    getAllDotPoints(subjectKey).forEach(point => {
      if (covered.has(point.id)) return;
      subject.cards.push({ t: point.topic, q: `What does the HSC syllabus require you to do for ${point.topic}: ${point.subtopic}?`, a: point.text, syllabusId: point.id });
    });
  });
}

function validateSyllabusData(subjects, progress) {
  const errors = [], allIds = new Set();
  Object.keys(subjects || HSC_SYLLABUS).forEach(key => {
    const syllabus = HSC_SYLLABUS[key];
    if (!syllabus) return errors.push(`${key}: subject has no syllabus data`);
    if (!Array.isArray(syllabus.topics) || !syllabus.topics.length) errors.push(`${key}: empty topics`);
    let previous = ''; const texts = new Set();
    getAllDotPoints(key).forEach(item => {
      if (allIds.has(item.id)) errors.push(`${key}: duplicate syllabus ID ${item.id}`); allIds.add(item.id);
      const textKey = `${item.topic}\u0000${item.subtopic}\u0000${item.text}`; if (texts.has(textKey)) errors.push(`${key}: duplicate dot-point text: ${item.text}`); texts.add(textKey);
      if (!item.text.trim()) errors.push(`${key}: empty dot point ${item.id}`);
      if (previous && item.id <= previous) errors.push(`${key}: incorrect ordering at ${item.id}`); previous = item.id;
    });
  });
  Object.keys(progress || {}).forEach(id => { if (!allIds.has(id)) errors.push(`orphaned tracker progress: ${id}`); });
  return errors;
}
function assertValidSyllabusData(subjects, progress) { const errors = validateSyllabusData(subjects, progress); if (errors.length) throw new Error(`Invalid syllabus data:\n${errors.join('\n')}`); }
function shouldValidateSyllabus() { return typeof location === 'undefined' || location.hostname === 'localhost' || location.hostname === '127.0.0.1' || new URLSearchParams(location.search).has('validateSyllabus'); }
