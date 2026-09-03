/**
 * Server-side copy of the HSC syllabus dot points, used to generate
 * syllabus-aligned flashcards (api/generate.js) - one flashcard per
 * "students learn to" dot point.
 *
 * NOTE: /public/hsc-syllabus-data.js is loaded as a plain <script> in the
 * browser (not an ES module) and holds the source of truth for the UI.
 * This file duplicates the same data as an ES module so serverless
 * functions can import it. If you edit one, edit the other to match.
 */

export const HSC_SYLLABUS = {
  cafs: {
    label: 'CAFS',
    color: '#D6667A',
    topics: {
      'The Individual': [
        'Analyse the factors that contribute to the development of identity',
        'Examine how self-concept influences behaviour',
        'Evaluate the role of self-esteem in personal wellbeing',
        'Analyse the impact of body image on adolescent development'
      ],
      'Groups and Communities': [
        'Analyse the formation and cohesion of groups',
        'Examine the role of group leaders and members',
        'Assess the factors that contribute to group conflict',
        'Evaluate the importance of community organisations and networks'
      ],
      'Social Impact of Technology': [
        'Examine how technology influences social relationships and communication',
        'Analyse the impact of social media on self-esteem and body image',
        'Evaluate the benefits and drawbacks of online networking',
        'Assess the impact of technology on family relationships and socialisation',
        'Analyse the role of technology in cyber bullying and online safety',
        'Examine digital citizenship and online ethics',
        'Evaluate the impact of technology on work-life balance and mental health'
      ],
      'Relationships': [
        'Analyse the features of healthy and unhealthy relationships',
        'Examine the factors that influence relationship satisfaction',
        'Assess communication strategies in relationships',
        'Evaluate conflict resolution techniques',
        'Analyse the impact of separation and divorce on individuals and families'
      ],
      'Families': [
        'Examine different family structures and their characteristics',
        'Analyse the functions of families in society',
        'Assess the factors affecting family dynamics',
        'Evaluate the role of families in socialisation'
      ]
    }
  },
  business: {
    label: 'Business Studies',
    color: '#3E7CB1',
    topics: {
      'External Environment': [
        'Analyse the nature and role of business in the economy',
        'Examine economic factors affecting business',
        'Assess the impact of social factors on business operations',
        'Evaluate the influence of technological change on business',
        'Analyse the effect of government policies on business',
        'Examine legal and ethical responsibilities of business'
      ],
      'Management': [
        'Analyse the functions of management',
        'Examine different management structures',
        'Assess the effectiveness of management strategies',
        'Evaluate leadership styles and their impact on business performance',
        'Analyse human resource management strategies',
        'Examine motivation theories and their application'
      ],
      'Finance': [
        'Analyse financial planning and budgeting',
        'Examine cash flow management',
        'Assess financial performance using ratios',
        'Evaluate sources of finance and their suitability',
        'Analyse investment decisions and risk management'
      ],
      'Operations': [
        'Analyse production and operations management',
        'Examine supply chain management',
        'Assess quality management and control',
        'Evaluate technology and automation in operations',
        'Analyse inventory management strategies'
      ],
      'Marketing': [
        'Examine the role of marketing in business',
        'Analyse market research and segmentation',
        'Assess the marketing mix and its application',
        'Evaluate marketing strategies and campaigns',
        'Analyse consumer behaviour and decision-making'
      ]
    }
  },
  legal: {
    label: 'Legal Studies',
    color: '#5B8C5A',
    topics: {
      'Legal System': [
        'Analyse the role of law in society',
        'Examine the structure and operations of Australian courts',
        'Assess the sources of law in Australia',
        'Evaluate the law-making process and parliamentary procedure',
        'Analyse the role of the judiciary in interpreting law'
      ],
      'Criminal Law': [
        'Analyse the elements of criminal liability (actus reus and mens rea)',
        'Examine different categories of crime',
        'Assess the rights of the accused and fair trial principles',
        'Evaluate defences to criminal charges',
        'Analyse sentencing principles and penalties'
      ],
      'Family Law': [
        'Examine the law relating to marriage and de facto relationships',
        'Analyse the grounds for divorce and property division',
        'Assess the law relating to children and parenting orders',
        'Evaluate support obligations and maintenance',
        'Analyse the principles of family law dispute resolution',
        'Examine domestic violence laws and protection orders',
        'Assess child welfare and custody arrangements'
      ],
      'Indigenous Law': [
        'Examine the historical context of Indigenous Australians and the legal system',
        'Analyse the principles of Native Title',
        'Assess Indigenous customary law and its recognition',
        'Evaluate policies and legislation affecting Indigenous Australians',
        'Analyse the Uluru Statement from the Heart and constitutional reform',
        'Examine Indigenous land rights and land claims',
        'Assess reconciliation and self-determination principles',
        'Analyse the impact of colonial law on Indigenous communities'
      ],
      'Civil Law': [
        'Analyse the law of contract',
        'Examine the law of negligence and tort liability',
        'Assess consumer rights and protections',
        'Evaluate property law principles',
        'Analyse alternative dispute resolution methods'
      ]
    }
  },
  english: {
    label: 'English Studies',
    color: '#B8863B',
    topics: {
      'Communication': [
        'Analyse how language is used to construct meaning',
        'Examine the features of spoken, written and visual communication',
        'Assess the impact of context on communication',
        'Evaluate the effectiveness of different communication strategies'
      ],
      'Text and Audiences': [
        'Analyse how authors construct texts for specific audiences',
        'Examine the relationship between text and context',
        'Assess the use of language devices and their effects',
        'Evaluate how perspective and representation are constructed'
      ],
      'Playing the Game': [
        'Analyse the plot structure, character development and themes in Playing the Game',
        'Examine the use of dramatic techniques in Playing the Game',
        'Assess the representation of competition and achievement',
        'Evaluate the author\'s commentary on society and values',
        'Analyse the dialogue and its effectiveness in revealing character',
        'Examine the setting and its significance to the narrative',
        'Assess the moral and ethical dilemmas presented in the text',
        'Evaluate the relevance of themes to contemporary society'
      ],
      'We Are Australians': [
        'Analyse the representation of Australian identity in texts',
        'Examine how Australian values and culture are portrayed',
        'Assess the use of Australian language and vernacular',
        'Evaluate the treatment of diversity and multiculturalism',
        'Analyse historical and contemporary perspectives on being Australian',
        'Examine the role of Indigenous Australians in Australian identity',
        'Assess stereotypes and their deconstruction in texts',
        'Evaluate personal and national identity formation'
      ],
      'Literature': [
        'Analyse literary techniques and their effects',
        'Examine themes and values in literary texts',
        'Assess character development and motivation',
        'Evaluate historical and cultural contexts of texts',
        'Analyse the relationship between form and content'
      ],
      'Writing': [
        'Examine the conventions of different text types',
        'Analyse purpose and audience in writing',
        'Assess the effectiveness of written expression',
        'Evaluate revision and editing strategies',
        'Analyse the use of language features in persuasive writing'
      ]
    }
  }
};

/**
 * Match free-text input against a whole subject (e.g. "CAFS", "Legal Studies")
 * or a single topic within a subject (e.g. "Groups and Communities").
 * Returns { subjectKey, subjectLabel, scopeName, dotPoints: [{ topic, text }] }
 * or null if nothing in the syllabus matches.
 */
export function matchSyllabusScope(input) {
  const q = (input || '').trim().toLowerCase();
  if (!q) return null;

  for (const [subjectKey, subject] of Object.entries(HSC_SYLLABUS)) {
    if (q === subjectKey.toLowerCase() || q === subject.label.toLowerCase()) {
      const dotPoints = [];
      Object.entries(subject.topics).forEach(([topicName, points]) => {
        points.forEach((text) => dotPoints.push({ topic: topicName, text }));
      });
      return { subjectKey, subjectLabel: subject.label, scopeName: subject.label, dotPoints };
    }
  }

  for (const [subjectKey, subject] of Object.entries(HSC_SYLLABUS)) {
    for (const [topicName, points] of Object.entries(subject.topics)) {
      if (q === topicName.toLowerCase()) {
        const dotPoints = points.map((text) => ({ topic: topicName, text }));
        return { subjectKey, subjectLabel: subject.label, scopeName: topicName, dotPoints };
      }
    }
  }

  return null;
}
