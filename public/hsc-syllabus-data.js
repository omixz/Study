/**
 * Real HSC Syllabus Dot Points by Subject
 * Sourced from the official current NESA/Board of Studies syllabus documents for
 * each subject (see notes per subject below), then paraphrased into concise
 * study points. Embedded in repo - all data sent to Vercel.
 *
 * CAFS: HSC-examinable content only (3 core modules + 2 of the 3 real HSC
 * options - Social Impact of Technology and Individuals and Work, both
 * confirmed against the app's own pre-built curated card set, which already
 * used the correct real topic names). Preliminary (Year 11) content is not
 * included since it is not examined in the HSC.
 *
 * Legal Studies: uses the Legal Studies Stage 6 Syllabus (2009), which remains
 * the current syllabus for the HSC through 2027. A new Legal Studies 11-12
 * Syllabus (2025) begins phasing in for Year 11 in 2027, with first HSC exam
 * in 2028 - this file will need updating again around then. Family and
 * Indigenous Peoples are 2 of 7 possible options (Consumers, Family, Global
 * environmental protection, Indigenous peoples, Shelter, Workplace, World
 * order) - schools choose 2, so swap these if your school studies different
 * options. Each topic's official "themes and challenges" (the recurring
 * concepts NESA specifies should be woven throughout that topic - eg the role
 * of discretion, compliance/non-compliance, law reform, effectiveness of
 * legal/non-legal responses) are included as extra dot points, marked
 * "(theme and challenge)". Crime/Human Rights/Family themes and challenges
 * are sourced directly from a published school course outline quoting the
 * syllabus; Indigenous Peoples' were not found verbatim anywhere searched, so
 * they're built by following the same clearly-formulaic pattern NESA uses
 * for every other option - reasonably confident but not directly sourced.
 *
 * English Studies: a real non-ATAR NESA Content Endorsed Course. "Texts and
 * Human Experiences" is the mandatory HSC module; schools then choose 2-4
 * elective modules from a longer list (We Are Australians, Playing the Game,
 * Tell Us About It, On the Road, Discovery and Investigation, etc.) - the 3
 * electives below are common choices but may not match your school's actual
 * selection, in which case tell me which ones you study.
 *
 * Business Studies: HSC-examinable modules are Operations, Marketing, Finance
 * and Human Resources. (External Environment and Management are Preliminary/
 * Year 11 topics, not HSC-examinable, so they've been replaced.)
 */

const HSC_SYLLABUS = {
  cafs: {
    label: 'CAFS',
    color: '#D6667A',
    topics: {
      'Research Methodology': [
        'Compare primary and secondary, and qualitative and quantitative, types of research data',
        'Evaluate how sampling methods and sample size affect the reliability and validity of research',
        'Analyse ethical considerations in research, including privacy, consent and bias',
        'Compare the strengths and limitations of questionnaires, interviews, case studies, observations and literature reviews',
        "Apply the stages of the research process, from formulating a research question to presenting findings and drawing conclusions"
      ],
      'Groups in Context': [
        'Examine the prevalence and diversity of individuals within specific community groups such as youth and rural and remote families',
        'Assess the specific needs (health, education, safety, standard of living) of greatest concern to a studied community group',
        "Analyse the factors that affect a group's access to services, including cost, location and individual characteristics",
        'Evaluate the role of government policy and legislation in addressing equity issues for a specific community group',
        'Assess how community organisations and advocacy can influence public attitudes toward a specific community group'
      ],
      'Parenting and Caring': [
        'Compare biological parents, social parents (adoption, fostering, step-parenting, surrogacy) and carers',
        'Analyse how the age and specific needs of a dependant affect the parenting or caring role',
        'Evaluate authoritarian, democratic, permissive and negligent approaches to parenting or caring',
        'Assess the legal rights and responsibilities of parents, carers and dependants',
        'Examine how informal and formal support helps parents and carers manage their roles and responsibilities'
      ],
      'Social Impact of Technology': [
        'Explain how the Digital Revolution and Information Age have changed the use of technology in everyday life',
        'Analyse the factors, such as age, cost and location, that affect access to and acceptance of technology',
        'Evaluate the impact of technology on family relationships, community wellbeing and the workplace',
        'Examine issues related to technology use, including privacy, security and copyright',
        'Assess the potential positive and negative impact of an emerging technology on individuals and society'
      ],
      'Individuals and Work': [
        'Compare paid and unpaid work, and full-time, part-time, casual and self-employment work options',
        "Analyse the personal, social and economic factors that influence an individual's work choices",
        'Evaluate how patterns of work have changed due to technology, globalisation and economic conditions',
        'Assess the impact of unemployment and underemployment on individuals, families and communities',
        'Examine strategies individuals use to balance work with family and personal commitments'
      ]
    }
  },
  business: {
    label: 'Business Studies',
    color: '#3E7CB1',
    topics: {
      'Operations': [
        'Distinguish between the strategic and operational role of operations management',
        'Analyse how globalisation, technology and government regulations influence business operations',
        'Explain the stages of the transformation process that converts inputs into outputs',
        'Evaluate operations strategies such as quality management, technology and supply chain management',
        "Assess how outsourcing and inventory management decisions affect a business's cost and flexibility"
      ],
      'Marketing': [
        'Explain the role of marketing in identifying and satisfying customer needs',
        'Analyse how internal and external influences, such as consumer laws and technology, affect marketing decisions',
        'Evaluate the stages of the marketing process, including situational analysis and market research',
        'Assess the effectiveness of the marketing mix (product, price, promotion, place) in a marketing strategy',
        'Analyse how businesses use market segmentation and product differentiation to gain a competitive advantage'
      ],
      'Finance': [
        'Explain the objectives and role of financial management in a business',
        "Analyse the influence of internal and external sources of finance on a business's financial structure",
        'Evaluate the financial planning process, including cash flow statements and budgets',
        "Use financial ratios to assess a business's liquidity, profitability and financial stability",
        'Assess financial management strategies such as cash flow management and global finance strategies'
      ],
      'Human Resources': [
        'Explain the interdependence between human resource management and other key business functions',
        "Analyse how the process of staffing, including recruitment, selection and training, meets a business's needs",
        'Evaluate leadership styles and their impact on employee motivation and performance',
        'Assess the effectiveness of performance management and reward systems in a business',
        'Examine strategies used to resolve workplace disputes, including negotiation, mediation and the involvement of tribunals'
      ]
    }
  },
  legal: {
    label: 'Legal Studies',
    color: '#5B8C5A',
    topics: {
      'Crime': [
        'Distinguish between the elements of a crime, including actus reus and mens rea',
        'Examine the stages of the criminal investigation process, including the powers of police',
        'Analyse the purposes and processes of the criminal trial, including the roles of key personnel',
        'Evaluate the factors considered in sentencing and the range of penalties available to courts',
        'Assess how the criminal justice system responds differently to young offenders',
        'Evaluate the role discretion plays throughout the criminal justice system (theme and challenge)',
        'Analyse issues of compliance and non-compliance with criminal law (theme and challenge)',
        'Assess the extent to which criminal law reflects moral and ethical standards (theme and challenge)',
        'Examine the role of law reform in the criminal justice system (theme and challenge)',
        'Evaluate how the law balances the rights of victims, offenders and society (theme and challenge)',
        'Assess the effectiveness of legal and non-legal measures in achieving justice for crime (theme and challenge)'
      ],
      'Human Rights': [
        'Explain the nature and origins of universal human rights',
        'Analyse the role of the United Nations and other international instruments in promoting human rights',
        'Evaluate the effectiveness of domestic and international mechanisms in enforcing human rights',
        'Assess a contemporary human rights issue and the extent to which it is being addressed by law',
        'Examine the changing relationship between state sovereignty and human rights (theme and challenge)',
        'Analyse issues of compliance and non-compliance with human rights law (theme and challenge)',
        'Assess how human rights have developed in response to changing values and ethical standards (theme and challenge)',
        'Evaluate the role of law reform in protecting human rights (theme and challenge)',
        'Assess the effectiveness of legal and non-legal measures in protecting human rights (theme and challenge)'
      ],
      'Family': [
        'Examine the legal requirements for a valid marriage and the recognition of de facto relationships',
        'Analyse the legal processes and consequences involved in divorce and separation',
        'Evaluate how the law responds to the care and protection of children in changing family relationships',
        'Assess the effectiveness of the law in responding to domestic violence and family conflict',
        'Evaluate how the law encourages cooperation and resolves conflict regarding family (theme and challenge)',
        'Analyse issues of compliance and non-compliance with family law (theme and challenge)',
        'Assess how family law has changed in response to changing community values (theme and challenge)',
        'Examine the role of law reform in achieving just outcomes for family members (theme and challenge)',
        'Evaluate the effectiveness of legal and non-legal responses in achieving just outcomes for family members (theme and challenge)'
      ],
      'Indigenous Peoples': [
        'Examine the impact of the historical dispossession of Aboriginal and Torres Strait Islander peoples on their legal rights',
        'Analyse the significance of Native Title and land rights legislation for Indigenous Australians',
        'Evaluate the effectiveness of the law in achieving justice for Indigenous peoples within the criminal justice system',
        'Assess current issues affecting Indigenous Australians, such as constitutional recognition and self-determination',
        'Evaluate how the law recognises and protects the rights of Indigenous peoples (theme and challenge)',
        'Analyse issues of compliance and non-compliance with laws affecting Indigenous peoples (theme and challenge)',
        'Assess changing values and ethical standards around self-determination and reconciliation (theme and challenge)',
        'Examine the role of law reform in achieving just outcomes for Indigenous peoples (theme and challenge)',
        'Evaluate the effectiveness of legal and non-legal responses in achieving just outcomes for Indigenous peoples (theme and challenge)'
      ]
    }
  },
  english: {
    label: 'English Studies',
    color: '#B8863B',
    topics: {
      'Texts and Human Experiences': [
        'Analyse how a prescribed text represents aspects of human experience',
        'Examine how language forms and features shape meaning in a range of texts',
        'Compare how different texts represent similar human experiences in different ways',
        'Evaluate how context influences the way composers represent human experiences in their texts'
      ],
      'We Are Australians': [
        'Analyse how texts represent aspects of Australian identity and belonging',
        'Examine how texts explore multiculturalism and diverse cultural perspectives in Australia',
        'Evaluate how Australian texts represent the experiences of Aboriginal and/or Torres Strait Islander peoples',
        'Assess how language choices shape representations of citizenship and community in Australian texts'
      ],
      'Playing the Game': [
        'Analyse how texts represent the role of sport in individual and community life',
        'Examine how language and structural features are used in different forms of sports writing and commentary',
        'Evaluate how texts represent values such as teamwork, fairness and achievement through sport',
        'Assess how sporting texts are shaped for different audiences and purposes'
      ],
      'Tell Us About It': [
        'Analyse how media texts are structured to inform, persuade or entertain an audience',
        'Examine how language and visual features are used to construct meaning in news and current affairs texts',
        'Evaluate the reliability and bias of different media sources reporting on the same event',
        'Assess how digital and social media have changed the way news and information are produced and consumed'
      ]
    }
  }
};

// Export function to get all syllabus data
function getSyllabusData() {
  return HSC_SYLLABUS;
}

// Export function to get specific subject
function getSubjectSyllabus(subjectKey) {
  return HSC_SYLLABUS[subjectKey] || null;
}

// Export function to get all dot points for a subject
function getAllDotPoints(subjectKey) {
  const subject = HSC_SYLLABUS[subjectKey];
  if (!subject) return [];

  const allPoints = [];
  Object.entries(subject.topics).forEach(([topicName, dotPoints]) => {
    dotPoints.forEach((point, idx) => {
      allPoints.push({
        id: `${subjectKey}-${topicName}-${idx}`,
        topic: topicName,
        text: point
      });
    });
  });
  return allPoints;
}
