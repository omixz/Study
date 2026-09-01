// Legal Studies HSC revision data

SUBJECTS.legal = {
  label: 'Legal Studies',
  color: '#5B8C5A',
  paper: 'https://nesa.nsw.edu.au/HSC-support-materials/',
  cards: [
    { topic: 'Legal System', q: 'What are the three branches of government?', a: 'Legislative (Parliament, makes laws), Executive (Government, enforces laws), Judicial (Courts, interprets laws). Separation of powers prevents concentration of power.' },
    { topic: 'Legal System', q: 'What is the hierarchy of Australian courts?', a: 'Local Courts (lowest), District/Supreme Courts (state), Federal Court, High Court (highest). Higher courts can overturn lower court decisions on appeal.' },
    { topic: 'Criminal Law', q: 'What is the difference between actus reus and mens rea?', a: 'Actus reus is the guilty act (physical element); mens rea is the guilty mind (intention). Most crimes require both elements for conviction.' },
    { topic: 'Criminal Law', q: 'What is burden of proof in criminal cases?', a: 'Beyond reasonable doubt - the standard of proof required for criminal conviction. This is much higher than civil law\'s "balance of probabilities".' },
    { topic: 'Family Law', q: 'What are the grounds for divorce in Australia?', a: 'Only ground: irretrievable breakdown of marriage, evidenced by 12 months separation. No need to prove fault; fault-based divorce has been replaced.' },
    { topic: 'Family Law', q: 'What does the Family Court decide regarding children?', a: 'Best interests of the child is paramount. Courts decide custody, access (visitation), and parenting arrangements considering the child\'s physical, emotional, and developmental needs.' },
    { topic: 'Indigenous Law', q: 'What is Native Title?', a: 'Native Title is the legal recognition that Indigenous Australians have rights to land based on their continuous connection and traditional laws prior to European settlement.' },
    { topic: 'Civil Law', q: 'What is the law of contract?', a: 'Contract law governs agreements between parties with mutual obligations. A valid contract requires offer, acceptance, consideration, and intention to create legal relations.' }
  ],
  practice: [
    { topic: 'Criminal Law', type: 'Extended response', marks: 8, q: 'Compare and contrast summary offences and indictable offences in the Australian criminal justice system. Explain how the criminal procedure differs for each type.', criteria: '7-8 marks: Clear comparison with detailed explanation of procedures\n5-6 marks: Good comparison with adequate procedural explanation\n3-4 marks: Basic comparison with some procedural details\n1-2 marks: Limited understanding' },
    { topic: 'Family Law', type: 'Short answer', marks: 6, q: 'Explain why the best interests of the child is the paramount consideration in family law matters. Provide examples of factors courts consider.', criteria: '6 marks: Clear explanation with relevant examples\n4-5 marks: Good explanation with some examples\n2-3 marks: Basic explanation with limited examples\n1 mark: Superficial response' },
    { topic: 'Indigenous Law', type: 'Extended response', marks: 6, q: 'Discuss the significance of the Mabo decision and its impact on Native Title and Indigenous land rights in Australia.', criteria: '6 marks: Sophisticated analysis of Mabo and comprehensive impact discussion\n4-5 marks: Good explanation of significance and impacts\n2-3 marks: Basic explanation of decision and some impacts\n1 mark: Limited response' },
    { topic: 'Civil Law', type: 'Short answer', marks: 4, q: 'What must be present for a valid contract to be formed? Explain each element briefly.', criteria: '4 marks: All elements clearly identified and explained\n3 marks: Most elements with adequate explanation\n2 marks: Some elements with basic explanation\n1 mark: Limited understanding' }
  ],
  essay: [
    { topic: 'Legal System', part: 'Introduction', marks: 4, q: 'Write an introduction for an essay analyzing the role of the High Court of Australia in the legal system and its power to interpret the Constitution.', criteria: '4 marks: Clear context, thesis, and relevant issues identified\n3 marks: Good introduction with thesis\n2 marks: Adequate introduction\n1 mark: Basic introduction' },
    { topic: 'Criminal Law', part: 'Body Paragraph', marks: 5, q: 'Write a body paragraph discussing how the presumption of innocence and burden of proof operate in criminal trials, including its importance for justice.', criteria: '5 marks: Well-developed paragraph with strong analysis\n3-4 marks: Good paragraph with adequate analysis\n2 marks: Basic paragraph with limited analysis\n1 mark: Superficial response' }
  ],
  mcq: [
    { topic: 'Legal System', q: 'Which court has final authority to interpret the Australian Constitution?', options: ['Supreme Court of NSW', 'Federal Court of Australia', 'High Court of Australia', 'District Court'], correctIndex: 2, explain: 'The High Court is the apex of the Australian judicial system and has authority over constitutional interpretation.' },
    { topic: 'Criminal Law', q: 'What must the prosecution prove beyond reasonable doubt in a criminal trial?', options: ['That the defendant had opportunity to commit the crime', 'Both the guilty act (actus reus) and guilty mind (mens rea)', 'That the defendant is of good character', 'Only the guilty act occurred'], correctIndex: 1, explain: 'Most crimes require both the physical act and the intention/knowledge (mens rea) for conviction.' },
    { topic: 'Family Law', q: 'What is the only ground for divorce under Australian law?', options: ['Adultery', 'Cruelty', 'Irretrievable breakdown of marriage after 12 months separation', 'Desertion for more than 2 years'], correctIndex: 2, explain: 'Australia moved to no-fault divorce. The only ground is irretrievable breakdown evidenced by 12 months separation.' },
    { topic: 'Indigenous Law', q: 'What did the Mabo decision establish?', options: ['Indigenous people have no land rights', 'Native Title exists based on continuous connection to land', 'All land belongs to the Crown', 'Only Indigenous nations can own land'], correctIndex: 1, explain: 'Mabo established that Native Title exists based on traditional connection to land prior to colonization, overturning the fiction of terra nullius.' },
    { topic: 'Civil Law', q: 'In contract law, what is consideration?', options: ['A polite gesture', 'Something of value given by each party in exchange', 'A written agreement', 'A promise alone'], correctIndex: 1, explain: 'Consideration is the value exchanged between parties - each must give something of value for a binding contract.' },
    { topic: 'Criminal Law', q: 'What is the purpose of the exclusionary rule in criminal law?', options: ['To make trials longer', 'To exclude evidence obtained illegally, protecting individual rights', 'To exclude expensive evidence', 'To help the prosecution'], correctIndex: 1, explain: 'Exclusionary rules protect individual rights by preventing use of illegally obtained evidence, even if probative.' }
  ],
  notes: [
    { topic: 'Legal System', points: [
      { point: 'Sources of Australian Law', info: 'Common law (judge-made from precedent), statute law (Parliament legislation), constitutional law (Australian Constitution), and equity (fairness principles). Together they form the complete legal framework.' },
      { point: 'Court Hierarchy and Appeals', info: 'Higher courts can overrule lower courts. Appeal courts review legal errors (not facts). The High Court has final authority and can hear constitutional matters.' },
      { point: 'Role of Parliament', info: 'Parliament makes statute law reflecting community values and policy. Laws go through multiple readings and review. Government drafts bills; Parliament debates and votes.' },
      { point: 'Judicial Independence', info: 'Judges are independent from political pressure to ensure fair trials. Separation of powers prevents any branch from dominating. Judicial review ensures laws comply with Constitution.' }
    ]},
    { topic: 'Criminal Law', points: [
      { point: 'Elements of Crime', info: 'Actus reus (guilty act - physical element), mens rea (guilty mind - intention/knowledge), and often circumstantial elements. Defenses may negate any element.' },
      { point: 'Categories of Crime', info: 'Indictable offences (serious, e.g., murder, assault), summary offences (minor, e.g., parking violations). Procedure differs significantly - indictable involve jury trials.' },
      { point: 'Criminal Procedure', info: 'Arrest, charge, bail decision, preliminary examination, committal, trial/verdict, sentencing. Accused has right to silence, legal representation, fair trial.' },
      { point: 'Defenses and Sentencing', info: 'Common defenses: self-defense, duress, insanity, automatism. Sentencing considers severity, offender history, rehabilitation potential, and community protection.' }
    ]},
    { topic: 'Family Law', points: [
      { point: 'Marriage and Dissolution', info: 'Marriage requires consent, legal age, single status. No-fault divorce based on 12 months separation. Family Court handles matrimonial causes and child-related matters.' },
      { point: 'Property Division', info: 'Property is divided according to contributions and needs after divorce. Courts consider financial and non-financial contributions, future needs, and children\'s interests.' },
      { point: 'Parenting and Children\'s Rights', info: 'Best interests of child is paramount consideration. Courts decide custody, care arrangements, and access. Children have rights to relationship with both parents and their own voice.' },
      { point: 'Support Obligations', info: 'Spouse support and child support may be ordered if needed. Factors considered include income, earning capacity, time caring for children, and standard of living.' }
    ]},
    { topic: 'Indigenous Law', points: [
      { point: 'Native Title Doctrine', info: 'Native Title recognizes Indigenous ownership based on continuous cultural connection and traditional law prior to colonization. Mabo (1992) overturned terra nullius doctrine.' },
      { point: 'Native Title Act 1993', info: 'Provides framework for claims, recognition, and protection of Native Title. Land councils represent Indigenous groups. Negotiations occur over mining, land use, and co-management.' },
      { point: 'Indigenous Land Rights', info: 'ABSTUDY provides land grants; Native Title claims continue; land trusts manage community lands; Stolen Generations compensation addresses past injustices.' },
      { point: 'Reconciliation Approaches', info: 'Uluru Statement from the Heart calls for constitutional reform and treaty; co-design of laws affecting Indigenous peoples; self-determination in policy and service delivery.' }
    ]},
    { topic: 'Civil Law', points: [
      { point: 'Contract Law Principles', info: 'Offer + Acceptance + Consideration + Intention to create legal relations = valid contract. Breached contracts can be remedied by damages or specific performance.' },
      { point: 'Law of Negligence', info: 'Duty of care + Breach + Causation + Damage. Applies when one person\'s failure to exercise reasonable care harms another. Defenses include contributory negligence.' },
      { point: 'Consumer Protection', info: 'ACL provides consumer guarantees on goods/services, protection from misleading conduct, and rights to refund/remedy. Small business exceptions apply.' },
      { point: 'Alternative Dispute Resolution', info: 'Mediation, negotiation, and arbitration offer faster, cheaper alternatives to court. ADR preserves relationships and allows flexible outcomes.' }
    ]}
  ]
};
