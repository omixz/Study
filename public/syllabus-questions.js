/**
 * Offline NESA-style questions for every visible syllabus topic. These remain
 * available when AI generation is unavailable.
 */
(function addStaticSyllabusQuestions() {
  const questionBank = {
    cafs: [
      ['The Individual', 'Explain how self-concept can influence an adolescent’s behaviour in a social setting.', 'A clear explanation of self-concept and a developed link to behaviour, supported by an example.'],
      ['Groups and Communities', 'Analyse ONE factor that contributes to group cohesion and its effect on members.', 'Identifies a relevant factor and makes a clear cause-and-effect link to group cohesion.'],
      ['Social Impact of Technology', 'Assess the impact of social media on adolescent self-esteem.', 'Makes a balanced judgement using positive and/or negative impacts with relevant examples.'],
      ['Relationships', 'Outline TWO communication strategies that can resolve conflict in a relationship.', 'Outlines two appropriate strategies with enough detail to show how each helps resolve conflict.'],
      ['Families', 'Explain how ONE family function contributes to the socialisation of children.', 'Explains a family function and clearly links it to socialisation.']
    ],
    business: [
      ['External Environment', 'Explain how changes in government policy can affect business operations.', 'Explains a relevant policy change and its operational impact on a business.'],
      ['Management', 'Analyse how a participative leadership style can influence employee performance.', 'Makes clear links between participative leadership, motivation and performance.'],
      ['Finance', 'Calculate and interpret the significance of a current ratio of 1.8:1 for a business.', 'Correctly interprets liquidity and explains what the ratio indicates about short-term obligations.'],
      ['Operations', 'Explain how just-in-time inventory management can improve business operations.', 'Explains reduced holding costs and links JIT to efficiency, with a relevant limitation or condition.'],
      ['Marketing', 'Analyse how market segmentation assists a business to meet customer needs.', 'Explains segmentation and links it to targeting and the marketing mix.']
    ],
    legal: [
      ['Legal System', 'Explain how the doctrine of precedent promotes consistency in the legal system.', 'Explains binding precedent and clearly links it to consistent decision-making.'],
      ['Criminal Law', 'Distinguish between actus reus and mens rea using a criminal offence example.', 'Accurately distinguishes the physical and mental elements and applies both to an example.'],
      ['Family Law', 'Explain the role of family dispute resolution in parenting disputes.', 'Explains the mediation process and its role before litigation, including an appropriate limitation or exception.'],
      ['Indigenous Law', 'Assess the significance of the Mabo decision for Indigenous land rights.', 'Makes a supported judgement referring to terra nullius and the recognition of native title.'],
      ['Civil Law', 'Explain how the tort of negligence protects consumers from harm.', 'Explains duty, breach and damage, with a clear connection to consumer protection.']
    ],
    english: [
      ['Communication', 'Explain how context influences the meaning of a spoken or written text.', 'Explains the relationship between context and meaning with an appropriate example.'],
      ['Text and Audiences', 'Analyse how a composer uses language choices to position a specific audience.', 'Identifies language choices and analyses their effect on the intended audience.'],
      ['Playing the Game', 'Explain how dramatic techniques represent competition or power in Playing the Game.', 'Uses a relevant dramatic technique and clearly links it to competition or power.'],
      ['We Are Australians', 'Analyse how ONE text represents an aspect of Australian identity.', 'Uses a relevant textual example and analyses how representation is constructed.'],
      ['Literature', 'Explain how a literary technique contributes to a text’s central theme.', 'Identifies a technique and makes a clear, supported link to theme.'],
      ['Writing', 'Explain how purpose and audience should shape the language choices in a persuasive text.', 'Explains appropriate language choices and links them to both purpose and audience.']
    ]
  };
  const mcqBank = {
    cafs: [
      ['The Individual', 'Which factor is most closely linked to self-concept?', ['A person’s perception of self', 'A family’s income only', 'A group’s legal status', 'A school timetable'], 0, 'Self-concept is the way an individual perceives and evaluates themself.'],
      ['Groups and Communities', 'What is most likely to strengthen group cohesion?', ['A shared goal', 'Unclear roles', 'Persistent conflict', 'Social isolation'], 0, 'Shared goals give members a common purpose and can strengthen cohesion.'],
      ['Social Impact of Technology', 'Which is a potential online-safety risk?', ['Cyberbullying', 'Face-to-face discussion', 'Shared recreation', 'Family support'], 0, 'Cyberbullying is a significant risk associated with online communication.'],
      ['Relationships', 'Which communication strategy best supports conflict resolution?', ['Active listening', 'Interrupting', 'Avoiding all discussion', 'Making assumptions'], 0, 'Active listening helps people understand concerns before responding.'],
      ['Families', 'Which is a key function of families?', ['Socialisation', 'Running courts', 'Setting tax rates', 'Issuing passports'], 0, 'Families help children learn values, roles and social expectations.']
    ],
    business: [
      ['External Environment', 'Which is an external influence on a business?', ['Government regulation', 'Staff roster', 'Internal culture', 'Inventory records'], 0, 'Government regulation comes from outside the business.'],
      ['Management', 'Which leadership style involves employee input?', ['Participative', 'Autocratic', 'Laissez-faire only', 'Bureaucratic only'], 0, 'Participative leaders involve employees in decision-making.'],
      ['Finance', 'What does a current ratio measure?', ['Short-term liquidity', 'Market share', 'Employee turnover', 'Product quality'], 0, 'The current ratio compares current assets with current liabilities.'],
      ['Operations', 'What is a key feature of just-in-time inventory?', ['Stock arrives when needed', 'Large stockpiles', 'No supplier links', 'Higher storage costs'], 0, 'JIT aims to receive inputs close to the time they are needed.'],
      ['Marketing', 'What is market segmentation?', ['Dividing a market into groups', 'Setting one price only', 'Closing a market', 'Removing promotion'], 0, 'Segmentation groups customers with similar characteristics or needs.']
    ],
    legal: [
      ['Legal System', 'What is a binding precedent?', ['A decision lower courts must follow', 'A media report', 'A jury verdict only', 'A non-legal rule'], 0, 'Lower courts must follow relevant decisions of higher courts in the same hierarchy.'],
      ['Criminal Law', 'What is mens rea?', ['The mental element of a crime', 'The physical act only', 'A civil remedy', 'A court hierarchy'], 0, 'Mens rea refers to the guilty mind, such as intent or recklessness.'],
      ['Family Law', 'What is family dispute resolution?', ['A process to resolve family disputes without court', 'A criminal sentence', 'A property tax', 'A police power'], 0, 'FDR commonly uses mediation to help parties resolve family disputes.'],
      ['Indigenous Law', 'What did Mabo reject?', ['Terra nullius', 'Native title', 'The High Court', 'Federalism'], 0, 'Mabo rejected the legal fiction that Australia belonged to no one before colonisation.'],
      ['Civil Law', 'What must a plaintiff prove in negligence?', ['Duty, breach and damage', 'Intent to commit crime', 'A jury trial', 'Parliamentary approval'], 0, 'Negligence requires a duty of care, breach and resulting damage.']
    ],
    english: [
      ['Communication', 'What does context include?', ['The situation and audience', 'Only spelling', 'Only text length', 'Only punctuation'], 0, 'Context includes the circumstances, purpose and audience surrounding communication.'],
      ['Text and Audiences', 'What is positioning in a text?', ['Guiding an audience response', 'Alphabetising paragraphs', 'Counting quotations', 'Changing font size'], 0, 'Composers position audiences through language and representation choices.'],
      ['Playing the Game', 'Which is a dramatic technique?', ['Stage directions', 'A balance sheet', 'A legal precedent', 'A market segment'], 0, 'Stage directions shape how action, character and ideas are presented on stage.'],
      ['We Are Australians', 'What is vernacular?', ['Everyday language of a community', 'A court order', 'A business ratio', 'A scientific formula'], 0, 'Vernacular is the ordinary language or dialect used by a group.'],
      ['Literature', 'What is imagery?', ['Language appealing to the senses', 'A list of sources', 'A legal principle', 'A budget method'], 0, 'Imagery creates sensory pictures or impressions for readers.'],
      ['Writing', 'What should a persuasive text consider first?', ['Purpose and audience', 'Random ideas only', 'An unrelated setting', 'Word count only'], 0, 'Purpose and audience shape the appropriate language and structure.']
    ]
  };

  Object.entries(questionBank).forEach(([subjectKey, questions]) => {
    const subject = SUBJECTS[subjectKey];
    if (!subject) return;
    questions.forEach(([topic, q, criteria]) => {
      const [mcqQuestion, options, correctIndex, explain] = mcqBank[subjectKey]
        .find(([mcqTopic]) => mcqTopic === topic)
        .slice(1);
      subject.practice.push({ topic, type: 'Short answer', marks: 4, q, criteria });
      subject.mcq.push({
        topic,
        q: mcqQuestion,
        options,
        correctIndex,
        explain
      });
    });
  });
}());
