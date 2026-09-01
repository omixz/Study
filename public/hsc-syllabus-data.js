/*
 * Year 12/HSC syllabus tracker data.  The wording and sequence below follow
 * the published NESA Stage 6 course documents (source URLs are kept with the
 * course so an annual audit is straightforward).  An item is deliberately a
 * single assessable syllabus point; it is never a hand-written percentage.
 */
const HSC_SYLLABUS = {
  cafs: course('CAFS', '#D6667A', 'https://curriculum.nsw.edu.au/learning-areas/hsie/community-and-family-studies-11-12-2003/content/year-12', [
    topic('Research Methodology', 'Research methodology', ['The nature of research', 'Ethical behaviour in research', 'Research methods', 'Research process', 'Independent Research Project']),
    topic('Groups in Context', 'Group concepts', ['The characteristics of groups', 'The needs of groups', 'The roles individuals adopt within groups']),
    topic('Groups in Context', 'Community groups', ['Youth', 'Rural and remote families', 'The aged', 'People with disabilities', 'Culturally and linguistically diverse communities']),
    topic('Parenting and Caring', 'Parenting and caring roles', ['Preparation for parenting and caring', 'Parenting and caring relationships', 'Parenting and caring styles', 'The impact of parenting and caring on wellbeing']),
    topic('Social Impact of Technology', 'Technology and society', ['The development of technology', 'Access to and acceptance of technology', 'The impact of technology on individuals, families, work and communities'])
  ]),
  business: course('Business Studies', '#3E7CB1', 'https://curriculum.nsw.edu.au/learning-areas/hsie/business-studies-11-12-2009/content/year-12', [
    topic('Operations', 'The role of operations management', ['Strategic role of operations management', 'Goods and/or services in different types of businesses']),
    topic('Operations', 'Influences on operations', ['Globalisation', 'Technology', 'Quality expectations', 'Cost-based competition', 'Government policies', 'Legal regulation', 'Environmental sustainability']),
    topic('Operations', 'Operations processes', ['Inputs', 'Transformation processes', 'Outputs']),
    topic('Operations', 'Operations strategies', ['Performance objectives', 'New product or service design and development', 'Supply chain management', 'Outsourcing', 'Technology', 'Inventory management', 'Quality management', 'Overcoming resistance to change']),
    topic('Marketing', 'The role of marketing', ['Strategic role of marketing goods and services', 'Interdependence with other key business functions']),
    topic('Marketing', 'Influences on marketing', ['Factors influencing customer choice', 'Consumer laws', 'Financial situation', 'Technology', 'Globalisation', 'Social and ethical issues']),
    topic('Marketing', 'Market research process', ['Situational analysis', 'Market research', 'Establishing market objectives', 'Identifying target markets', 'Developing market strategies', 'Implementing, monitoring and controlling']),
    topic('Marketing', 'Marketing strategies', ['Market segmentation', 'Product', 'Price', 'Promotion', 'Place', 'People, processes and physical evidence', 'E-marketing', 'Global marketing']),
    topic('Finance', 'The role of financial management', ['Strategic role of financial management', 'Interdependence with other key business functions']),
    topic('Finance', 'Influences on financial management', ['Internal sources of finance', 'External sources of finance', 'Influence of globalisation', 'Influence of technology', 'Government influence', 'Institutional influence']),
    topic('Finance', 'Financial management processes', ['Planning and implementing', 'Debt and equity financing', 'Matching the terms and sources of finance to business purpose', 'Monitoring and controlling']),
    topic('Finance', 'Financial management strategies', ['Cash flow management', 'Working capital management', 'Profit management', 'Global market influences', 'Financial planning']),
    topic('Human Resources', 'The role of human resource management', ['Strategic role of human resource management', 'Interdependence with other key business functions']),
    topic('Human Resources', 'Influences on human resource management', ['Stakeholders', 'Legal influences', 'Economic influences', 'Technology', 'Globalisation', 'Social and ethical issues']),
    topic('Human Resources', 'Human resource management processes', ['Acquisition', 'Development', 'Maintenance', 'Separation']),
    topic('Human Resources', 'Human resource management strategies', ['Leadership style', 'Skills', 'Outsourcing', 'Changing work patterns', 'Interdependence with other key business functions'])
  ]),
  legal: course('Legal Studies', '#5B8C5A', 'https://curriculum.nsw.edu.au/learning-areas/hsie/legal-studies-11-12-2009/content/year-12', [
    topic('Crime', 'The nature of crime', ['The meaning of crime', 'The elements of crime: actus reus, mens rea', 'Categories of crime', 'The purposes of punishment', 'Factors affecting criminal behaviour']),
    topic('Crime', 'The investigation process', ['Police powers', 'Reporting crime', 'Investigating crime', 'Arrest and charge', 'Search and seizure', 'Bail or remand', 'Detention and interrogation', 'Role of the courts']),
    topic('Crime', 'The criminal trial process', ['Court jurisdiction', 'Legal personnel', 'The adversary system', 'Burden and standard of proof', 'Use of evidence', 'Defences to criminal charges', 'The role of juries']),
    topic('Crime', 'Sentencing and punishment', ['Purposes of punishment', 'Factors affecting a sentencing decision', 'Types of penalties', 'Post-sentencing considerations']),
    topic('Crime', 'Young offenders', ['Age of criminal responsibility', 'The Children’s Court', 'Penalties for children']),
    topic('Human Rights', 'The nature and development of human rights', ['The definition of human rights', 'The origins and development of human rights', 'Universal Declaration of Human Rights', 'The role of state sovereignty']),
    topic('Human Rights', 'Promoting and enforcing human rights', ['The role of the United Nations', 'International instruments', 'The role of courts and tribunals', 'The role of non-government organisations']),
    topic('Human Rights', 'Human rights in Australia', ['The Constitution', 'Statute law', 'Common law', 'Courts and tribunals', 'The Australian Human Rights Commission', 'A Charter of Rights']),
    topic('Human Rights', 'Contemporary issue: refugees and asylum seekers', ['The nature of the issue', 'Legal and non-legal responses', 'Effectiveness of the responses']),
    topic('Family', 'The nature of family law', ['The concept of family', 'The nature of family law', 'The role of the state']),
    topic('Family', 'Responses to problems in family relationships', ['The roles of courts and dispute resolution', 'The roles of the community', 'The roles of the state']),
    topic('Family', 'Contemporary issue: relationship breakdown', ['The nature of the issue', 'Legal and non-legal responses', 'Effectiveness of the responses']),
    topic('Indigenous Peoples', 'The nature of Indigenous peoples’ rights', ['The definition of Indigenous peoples’ rights', 'The development of Indigenous peoples’ rights', 'The role of state sovereignty']),
    topic('Indigenous Peoples', 'Promoting and enforcing Indigenous peoples’ rights', ['The role of the United Nations', 'International instruments', 'The role of courts and tribunals', 'The role of non-government organisations']),
    topic('Indigenous Peoples', 'Contemporary issue: land rights', ['The nature of the issue', 'Legal and non-legal responses', 'Effectiveness of the responses'])
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
