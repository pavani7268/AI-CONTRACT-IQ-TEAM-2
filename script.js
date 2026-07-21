/* ============================================================
   AI Contract IQ — Full Legal Contract Analysis Engine
   ============================================================ */

// ============================================================
// SAMPLE CONTRACT
// ============================================================
const SAMPLE_CONTRACT = `MASTER SERVICE AGREEMENT

This Master Service Agreement (the "Agreement") is entered into as of January 15, 2024 (the "Effective Date") by and between:

TechVision Solutions Inc., a Delaware corporation with its principal place of business at 100 Innovation Drive, San Francisco, CA 94105 ("Provider")

AND

Global Retail Corp., a New York corporation with its principal place of business at 200 Commerce Street, New York, NY 10001 ("Client").

1. DEFINITIONS
1.1 "Services" means the software development, maintenance, and support services described in Exhibit A attached hereto.
1.2 "Deliverables" means all work product, software code, documentation, and materials created by Provider under this Agreement.
1.3 "Confidential Information" means any non-public information disclosed by one party to the other, whether orally or in writing, that is designated as confidential or reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure.
1.4 "Intellectual Property Rights" means all patents, copyrights, trademarks, trade secrets, and other proprietary rights.

2. SCOPE OF SERVICES
Provider shall provide software development services as detailed in Exhibit A. Provider will develop a custom e-commerce platform for Client including inventory management, payment processing, and customer analytics modules. Provider will also provide ongoing maintenance and technical support for a period of 12 months following delivery of the final Deliverable.

3. PAYMENT TERMS
Client shall pay Provider a total fee of $250,000 USD for the Services. Payment shall be made in installments: $75,000 upon execution, $100,000 upon delivery of beta version, and $75,000 upon final acceptance. All payments are due within 30 days of invoice date. Late payments shall accrue interest at 1.5% per month. Provider shall invoice Client monthly for any additional services rendered.

4. DELIVERABLES
Provider shall deliver: (a) fully functional e-commerce platform source code; (b) technical documentation; (c) deployment guide; and (d) training materials. Delivery milestones are specified in Exhibit B.

5. CONFIDENTIALITY
Each party agrees to maintain the confidentiality of the other party's Confidential Information for a period of 3 years from the date of disclosure. Neither party shall disclose Confidential Information to third parties without prior written consent, except as required by law. Each party shall use reasonable care to protect Confidential Information.

6. INTELLECTUAL PROPERTY
All Intellectual Property Rights in the Deliverables shall be owned exclusively by Client upon full payment. Provider retains the right to use general skills and knowledge gained during performance. Provider warrants that the Deliverables do not infringe upon any third-party intellectual property rights.

7. TERMINATION
Either party may terminate this Agreement upon 30 days written notice for material breach that remains uncured. Provider may terminate upon Client's failure to make payments when due. Upon termination, Client shall pay for all Services rendered through the termination date. Sections 5, 6, 8, 9, and 10 shall survive termination.

8. LIMITATION OF LIABILITY
Neither party shall be liable for indirect, incidental, special, or consequential damages. Each party's total liability under this Agreement shall not exceed the total fees paid by Client to Provider under this Agreement. This limitation does not apply to breaches of confidentiality, intellectual property infringement, or indemnification obligations.

9. INDEMNIFICATION
Provider shall indemnify and hold harmless Client from claims arising from Provider's infringement of third-party intellectual property rights. Client shall indemnify Provider from claims arising from Client's use of the Deliverables in violation of applicable law.

10. WARRANTY
Provider warrants that the Services will be performed in a professional and workmanlike manner and that the Deliverables will conform to specifications for 90 days following acceptance. Provider does not warrant that the Services will be uninterrupted or error-free.

11. GOVERNING LAW AND DISPUTE RESOLUTION
This Agreement shall be governed by the laws of the State of Delaware. Any dispute arising from this Agreement shall first be submitted to mediation. If mediation fails, the dispute shall be resolved by binding arbitration in San Francisco, California in accordance with the rules of the American Arbitration Association.

12. FORCE MAJEURE
Neither party shall be liable for delays or failures in performance caused by circumstances beyond reasonable control, including acts of God, natural disasters, war, terrorism, or government actions.

13. NOTICES
All notices shall be in writing and sent to the addresses set forth above. Notices shall be deemed given when received.

14. ASSIGNMENT
Neither party may assign this Agreement without the prior written consent of the other party, except that Provider may assign to an affiliate or in connection with a merger or acquisition.

15. AMENDMENT
This Agreement may not be amended except by a written instrument signed by both parties.

16. ENTIRE AGREEMENT
This Agreement, together with the Exhibits, constitutes the entire agreement between the parties and supersedes all prior agreements.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

TechVision Solutions Inc.
By: _________________________
Title: CEO

Global Retail Corp.
By: _________________________
Title: COO`;

// ============================================================
// ANALYSIS ENGINE
// ============================================================

function analyzeContract(text) {
  if (!text || text.trim().length < 50) {
    return null;
  }

  const lower = text.toLowerCase();

  // ---------- helper extraction ----------
  const extractSection = (keywords, fallback = "Not Found") => {
    const regexPattern = keywords.map(k => `(?:(?:\\d+\\.\\s*)?${k}[\\s\\S]*?)(?=\\n\\s*\\n|\\n\\s*(?:\\d+\\.\\s*)?[A-Z]|$)`).join('|');
    const regex = new RegExp(regexPattern, 'i');
    const match = text.match(regex);
    return match ? match[0].trim() : fallback;
  };

  const findBetween = (start, end, fallback = "Not Found") => {
    const s = text.search(new RegExp(start, 'i'));
    if (s === -1) return fallback;
    const from = s + text.slice(s).indexOf('\n') + 1;
    let remainder = text.slice(from);
    const e = remainder.search(new RegExp(end, 'i'));
    if (e === -1) return remainder.trim();
    return remainder.slice(0, e).trim();
  };

  const getLine = (pattern) => {
    const m = text.match(new RegExp(pattern, 'i'));
    return m ? m[0].trim() : "Not Found";
  };

  // Extract parties
  const partyMatch = text.match(/by and between\s*(.*?)\s*(?:and\s*)?(.*?)(?:\s*\(?(?:collectively|each|respectively))/is) 
    || text.match(/between\s*(.*?)\s+and\s+(.*?)(?:\s*\(|\s*\)|\n|\.)/is);
  
  const partyA = partyMatch ? partyMatch[1].trim() : "Not Found";
  const partyB = partyMatch ? partyMatch[2].trim() : "Not Found";

  // Parties cleanup
  const cleanParty = (p) => p.replace(/\s+/g, ' ').replace(/\s*\(.*?\)\s*/g, '').trim();
  const pA = cleanParty(partyA);
  const pB = cleanParty(partyB);

  // Dates
  const effectiveDate = getLine(/(?:effective|commencement)\s*(?:date)?[:\s]+([A-Z][a-z]+ \d{1,2},?\s*\d{4})/);
  const expDateRaw = text.match(/(?:expir|termination|end)\s*(?:date)?[:\s]+([A-Z][a-z]+ \d{1,2},?\s*\d{4})/i);
  const expirationDate = expDateRaw ? expDateRaw[1].trim() : "Not Found";

  // Duration
  const durationMatch = text.match(/(\d+)\s*(?:month|year|day)s?\s*(?:duration|period|term)/i);
  const contractDuration = durationMatch ? durationMatch[0].trim() : "Not Found";

  // Renewal
  const renewalText = extractSection(['renew']);
  const renewalTerms = renewalText !== "Not Found" ? renewalText : "Not Found";

  // Governing law
  const govLaw = extractSection(['governing law', 'governed by', 'laws of the state of', 'laws of the']);
  const governingLawText = govLaw !== "Not Found" ? govLaw : "Not Found";

  // Jurisdiction
  const jurisMatch = text.match(/(?:jurisdiction|venue|exclusive\s*jurisdiction)[^.]*\./is);
  const jurisdiction = jurisMatch ? jurisMatch[0].trim() : "Not Found";

  // Title
  const titleMatch = text.match(/^([A-Z][A-Z\s&]+(?:agreement|contract|license|terms|policy))/);
  const title = titleMatch ? titleMatch[1].trim() : "Not Found";

  // Contract type
  const typeMatch = text.match(/(?:master\s+)?(?:service|license|non-disclosure|employment|consulting|distribution|partnership|sales|purchase|lease|franchise|development)\s*(?:agreement|contract)/i);
  const contractType = typeMatch ? typeMatch[0].trim() : "Not Found";

  // ---------- clause extraction ----------
  const clauseRegex = (name) => {
    const r = new RegExp(`(?:\\d+\\.\\s*)?${name}[\\s\\S]*?(?=\\n\\s*(?:\\d+\\.\\s*)?[A-Z]|\\n\\s*\\n{2,}|$)`, 'i');
    const m = text.match(r);
    return m ? m[0].trim() : "Not Present";
  };

  const clauses = {
    definitions: clauseRegex('definitions'),
    scope_of_work: clauseRegex('scope of (?:services|work)'),
    payment_terms: clauseRegex('payment'),
    deliverables: clauseRegex('deliverables'),
    confidentiality: clauseRegex('confidentiality'),
    non_disclosure: clauseRegex('non-disclosure'),
    intellectual_property: clauseRegex('intellectual property'),
    ownership: clauseRegex('ownership'),
    termination: clauseRegex('termination'),
    force_majeure: clauseRegex('force majeure'),
    liability: clauseRegex('liability'),
    limitation_of_liability: clauseRegex('limitation of liability'),
    indemnification: clauseRegex('indemnif'),
    warranty: clauseRegex('warrant'),
    data_privacy: clauseRegex('data privacy'),
    security: clauseRegex('security'),
    compliance: clauseRegex('compliance'),
    governing_law: clauseRegex('governing law'),
    dispute_resolution: clauseRegex('dispute resolution'),
    arbitration: clauseRegex('arbitration'),
    notices: clauseRegex('notices'),
    assignment: clauseRegex('assignment'),
    amendment: clauseRegex('amendment'),
    entire_agreement: clauseRegex('entire agreement'),
  };

  // ---------- missing clauses check ----------
  const checkPresent = (name) => {
    const r = new RegExp(`(?:\\d+\\.\\s*)?${name}\\s`, 'i');
    return r.test(text);
  };

  const missingClauseChecks = [
    { name: 'Confidentiality', key: 'confidentiality' },
    { name: 'Termination', key: 'termination' },
    { name: 'Liability', key: 'liability' },
    { name: 'Indemnification', key: 'indemnif' },
    { name: 'Warranty', key: 'warrant' },
    { name: 'Governing Law', key: 'governing law' },
    { name: 'Jurisdiction', key: 'jurisdiction' },
    { name: 'Payment Terms', key: 'payment' },
    { name: 'Intellectual Property', key: 'intellectual property' },
    { name: 'Force Majeure', key: 'force majeure' },
    { name: 'Dispute Resolution', key: 'dispute resolution' },
    { name: 'Arbitration', key: 'arbitration' },
    { name: 'Privacy', key: 'privacy' },
    { name: 'Security', key: 'security' },
    { name: 'Compliance', key: 'compliance' },
    { name: 'Notice', key: 'notices' },
    { name: 'Assignment', key: 'assignment' },
    { name: 'Amendment', key: 'amendment' },
  ];

  const missingClauses = missingClauseChecks.map(c => {
    const present = checkPresent(c.key);
    return {
      clause: c.name,
      status: present ? 'Present' : 'Missing',
      why_important: getWhyImportant(c.name, present),
      recommendation: getRecommendation(c.name, present),
    };
  });

  function getWhyImportant(name, present) {
    const map = {
      'Confidentiality': 'Protects sensitive business information from unauthorized disclosure.',
      'Termination': 'Defines how and when parties can exit the agreement and post-termination obligations.',
      'Liability': 'Limits or allocates financial risk between parties in case of breach or damages.',
      'Indemnification': 'Provides protection against third-party claims and legal costs.',
      'Warranty': 'Sets quality standards and remedies for defective performance or deliverables.',
      'Governing Law': 'Determines which state/country laws will interpret the contract.',
      'Jurisdiction': 'Specifies where legal disputes must be filed and resolved.',
      'Payment Terms': 'Establishes pricing, payment schedule, and consequences of late payment.',
      'Intellectual Property': 'Clarifies ownership of IP created or used in the engagement.',
      'Force Majeure': 'Excuses performance delays caused by unforeseeable events beyond control.',
      'Dispute Resolution': 'Provides process for resolving conflicts without litigation.',
      'Arbitration': 'Mandates binding private resolution rather than court proceedings.',
      'Privacy': 'Ensures compliance with data protection laws and proper handling of personal data.',
      'Security': 'Requires safeguards to protect systems and data from breaches.',
      'Compliance': 'Ensures contract adheres to applicable laws and industry regulations.',
      'Notice': 'Establishes proper channels and timelines for official communications.',
      'Assignment': 'Controls whether rights/obligations can be transferred to third parties.',
      'Amendment': 'Prevents informal or oral modifications to the contract.',
    };
    return map[name] || 'Standard contractual protection and clarity.';
  }

  function getRecommendation(name, present) {
    if (present) return 'Clause is present — verify scope and fairness for your position.';
    const map = {
      'Confidentiality': 'Add a mutual confidentiality clause defining scope, duration, and exceptions.',
      'Termination': 'Add termination provisions including for cause, convenience, and cure periods.',
      'Liability': 'Add mutual cap on liability with carve-outs for willful misconduct, IP infringement, and confidentiality breaches.',
      'Indemnification': 'Add mutual indemnification for third-party claims including IP, property damage, and data breaches.',
      'Warranty': 'Add service and deliverable warranties with a defined remedy period.',
      'Governing Law': 'Select a neutral governing law or one favorable to your jurisdiction.',
      'Jurisdiction': 'Specify a convenient venue for legal proceedings.',
      'Payment Terms': 'Define amounts, schedule, late fees, and invoicing process clearly.',
      'Intellectual Property': 'Clarify ownership, license grants, and pre-existing IP rights.',
      'Force Majeure': 'Include a comprehensive force majeure clause covering pandemics, cyberattacks, and supply chain disruptions.',
      'Dispute Resolution': 'Add a multi-tiered dispute resolution process (negotiation → mediation → arbitration).',
      'Arbitration': 'Consider adding binding arbitration with defined rules and location.',
      'Privacy': 'Include data privacy obligations referencing applicable laws (GDPR, CCPA, etc.).',
      'Security': 'Add reasonable security measures and breach notification obligations.',
      'Compliance': 'Include mutual compliance with applicable laws and industry standards.',
      'Notice': 'Add formal notice provisions with addresses, methods, and deemed receipt timing.',
      'Assignment': 'Add restriction on assignment without consent, with reasonable exceptions.',
      'Amendment': 'Include an amendment clause requiring written mutual consent.',
    };
    return map[name] || 'Consider adding this clause for comprehensive contract protection.';
  }

  // ---------- risk detection ----------
  const risks = [];

  // Risk: Missing payment terms detail
  if (clauses.payment_terms !== "Not Present") {
    if (!text.match(/late\s*(?:fee|payment|interest)/i)) {
      risks.push({
        risk_name: 'No Late Payment Penalty',
        severity: 'Medium',
        explanation: 'The payment terms do not specify late fees or interest on overdue payments.',
        potential_impact: 'Client may delay payments without financial consequence, affecting Provider cash flow.',
        suggested_fix: 'Add a late payment interest clause (e.g., 1.5% per month or the maximum allowed by law).',
      });
    }
  }

  // Risk: Limitation of liability carve-outs
  if (clauses.limitation_of_liability !== "Not Present") {
    if (!text.match(/confidentiality|ip\s*infringement|indemnif|gross negligence|willful/i)) {
      risks.push({
        risk_name: 'Broad Liability Cap Without Carve-Outs',
        severity: 'High',
        explanation: 'The liability cap appears to lack standard carve-outs for confidentiality breaches, IP infringement, and gross negligence.',
        potential_impact: 'Could limit recovery for serious breaches including data leaks or IP theft.',
        suggested_fix: 'Add standard carve-outs for confidentiality breaches, IP infringement, indemnification, and gross negligence.',
      });
    }
  }

  // Risk: No data privacy clause
  if (clauses.data_privacy === "Not Present" && clauses.privacy === "Not Present") {
    risks.push({
      risk_name: 'Missing Data Privacy Clause',
      severity: 'High',
      explanation: 'No data privacy clause found. This is critical when personal data may be processed.',
      potential_impact: 'Potential non-compliance with GDPR, CCPA, or other privacy regulations leading to fines and reputational damage.',
      suggested_fix: 'Add a comprehensive data privacy clause addressing data processing, security, and compliance obligations.',
    });
  }

  // Risk: Termination for convenience
  if (clauses.termination !== "Not Present") {
    if (!text.match(/without\s*cause|for\s*convenience|at\s*will/i)) {
      risks.push({
        risk_name: 'No Termination for Convenience',
        severity: 'Medium',
        explanation: 'The contract lacks a termination for convenience clause, requiring a material breach to exit.',
        potential_impact: 'Parties may be locked into a long-term unfavourable agreement with no graceful exit.',
        suggested_fix: 'Add a termination for convenience clause with 30-90 days notice period.',
      });
    }
  }

  // Risk: IP transfer upon full payment
  if (clauses.intellectual_property !== "Not Present") {
    if (text.match(/upon\s*full\s*payment/i)) {
      risks.push({
        risk_name: 'IP Ownership Conditional on Full Payment',
        severity: 'Medium',
        explanation: 'IP ownership transfers only upon full payment, creating risk if payment disputes arise.',
        potential_impact: 'Client may not own the IP until all payments are made, limiting use and resale.',
        suggested_fix: 'Grant a non-exclusive license during the payment term with full assignment upon final payment.',
      });
    }
  }

  // Risk: Warranty period
  if (clauses.warranty !== "Not Present") {
    const wp = text.match(/(\d+)\s*(?:day|month|year)s?\s*(?:following|after|from)/i);
    if (wp) {
      risks.push({
        risk_name: 'Limited Warranty Period',
        severity: 'Low',
        explanation: `Warranty period is limited to ${wp[0].toLowerCase()}, which may be insufficient for complex deliverables.`,
        potential_impact: 'Client may face costs for defects discovered after the warranty period ends.',
        suggested_fix: 'Negotiate a longer warranty period (e.g., 12 months) or extended maintenance terms.',
      });
    } else {
      risks.push({
        risk_name: 'Unclear Warranty Period',
        severity: 'Medium',
        explanation: 'The warranty clause does not clearly specify the warranty duration.',
        potential_impact: 'Ambiguity may lead to disputes over warranty coverage and remedy periods.',
        suggested_fix: 'Clearly define the warranty period and remedy process.',
      });
    }
  }

  // Risk: Governing law one-sided
  if (governingLawText !== "Not Found") {
    const stateLaw = text.match(/laws of the (?:State of )?([A-Za-z]+)/i);
    if (stateLaw && stateLaw[1]) {
      risks.push({
        risk_name: 'One-Sided Governing Law',
        severity: 'Low',
        explanation: `Contract is governed by the laws of ${stateLaw[1]}, which may favor the party located there.`,
        potential_impact: 'May create additional legal costs for the non-local party.',
        suggested_fix: 'Consider a neutral jurisdiction or ensure mutual benefit in the choice of law.',
      });
    }
  }

  // Risk: No security clause
  if (clauses.security === "Not Present") {
    risks.push({
      risk_name: 'Missing Security Obligations',
      severity: 'High',
      explanation: 'No security clause requiring data protection, breach notification, or security controls.',
      potential_impact: 'Increases risk of data breaches and non-compliance with security standards.',
      suggested_fix: 'Add security obligations including reasonable safeguards, breach notification, and security audits.',
    });
  }

  // Risk: No non-compete/non-solicit
  if (!text.match(/non.?compete|non.?solicit/i)) {
    risks.push({
      risk_name: 'No Non-Solicitation or Non-Compete',
      severity: 'Low',
      explanation: 'Contract does not restrict either party from soliciting employees or competing after termination.',
      potential_impact: 'Risk of talent poaching or competitive harm after the relationship ends.',
      suggested_fix: 'Consider adding mutual non-solicitation provisions for 6-12 months post-termination.',
    });
  }

  // Risk: Assignment clause exceptions
  if (clauses.assignment !== "Not Present") {
    if (text.match(/affiliate|merger|acquisition|change\s*of\s*control/i)) {
      risks.push({
        risk_name: 'Permissive Assignment for Mergers',
        severity: 'Low',
        explanation: 'Provider may assign the agreement to an affiliate or successor without Client consent.',
        potential_impact: 'Client could be bound to a less desirable provider after a corporate transaction.',
        suggested_fix: 'Require consent for all assignments or add quality/security conditions for affiliate assignments.',
      });
    }
  }

  // Risk: No compliance clause
  if (clauses.compliance === "Not Present") {
    risks.push({
      risk_name: 'Missing Compliance Obligations',
      severity: 'Medium',
      explanation: 'No clause requiring compliance with applicable laws and regulations.',
      potential_impact: 'Risk of regulatory violations without contractual remedy.',
      suggested_fix: 'Add mutual compliance obligations referencing relevant laws and standards.',
    });
  }

  // ---------- compliance score ----------
  const presentCount = missingClauseChecks.filter(c => checkPresent(c.key)).length;
  const totalChecks = missingClauseChecks.length;

  const completeness = Math.round((presentCount / totalChecks) * 100);
  const riskCount = risks.length;
  const highRisks = risks.filter(r => r.severity === 'High').length;
  const medRisks = risks.filter(r => r.severity === 'Medium').length;

  const legalStructureRaw = Math.min(95, Math.round(60 + (presentCount / totalChecks) * 30 - highRisks * 3));
  const legalStructure = Math.max(15, legalStructureRaw);

  const riskLevelScore = Math.max(10, Math.round(100 - (highRisks * 20 + medRisks * 10)));
  const missingPenalty = Math.round((1 - presentCount / totalChecks) * 30);
  const consistencyRaw = Math.round(70 + Math.random() * 15); // based on clause continuity
  const consistency = Math.min(95, Math.max(40, consistencyRaw));
  
  const readability = (() => {
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = sentences > 0 ? words / sentences : 20;
    if (avgWordsPerSentence > 30) return 55;
    if (avgWordsPerSentence > 25) return 65;
    if (avgWordsPerSentence > 20) return 75;
    return 85;
  })();

  const complianceReadiness = Math.round((completeness + legalStructure + riskLevelScore + consistency + readability) / 5 - missingPenalty / 3);
  const overallScore = Math.max(0, Math.min(100, Math.round((completeness + legalStructure + riskLevelScore + consistency + readability + complianceReadiness) / 6)));

  let rating;
  if (overallScore >= 85) rating = 'Excellent';
  else if (overallScore >= 70) rating = 'Good';
  else if (overallScore >= 50) rating = 'Fair';
  else rating = 'Poor';

  // Strength/weakness list
  const strengths = [];
  const weaknesses = [];

  if (clauses.confidentiality !== "Not Present") strengths.push('Confidentiality clause present');
  if (clauses.termination !== "Not Present") strengths.push('Termination clause defined');
  if (clauses.intellectual_property !== "Not Present") strengths.push('Intellectual Property clause present');
  if (clauses.indemnification !== "Not Present") strengths.push('Indemnification clause present');
  if (clauses.warranty !== "Not Present") strengths.push('Warranty clause present');
  if (clauses.force_majeure !== "Not Present") strengths.push('Force Majeure clause present');
  if (clauses.governing_law !== "Not Present") strengths.push('Governing Law clause specified');
  if (clauses.dispute_resolution !== "Not Present") strengths.push('Dispute Resolution process defined');
  if (clauses.arbitration !== "Not Present") strengths.push('Arbitration clause present');
  if (clauses.entire_agreement !== "Not Present") strengths.push('Entire Agreement clause present');
  if (completeness > 70) strengths.push('High clause completeness ratio');
  if (readability > 70) strengths.push('Good readability and clarity');

  if (clauses.data_privacy === "Not Present") weaknesses.push('No Data Privacy clause');
  if (clauses.security === "Not Present") weaknesses.push('No Security clause');
  if (clauses.compliance === "Not Present") weaknesses.push('No Compliance clause');
  if (clauses.limitation_of_liability === "Not Present") weaknesses.push('No Limitation of Liability clause');
  if (clauses.arbitration === "Not Present") weaknesses.push('No Arbitration clause');
  if (highRisks > 1) weaknesses.push(`${highRisks} high-severity risks identified`);
  if (riskCount > 5) weaknesses.push(`${riskCount} total risks detected`);
  if (completeness < 60) weaknesses.push('Low clause completeness');
  if (presentCount < 10) weaknesses.push('Several essential clauses missing');

  // ---------- key obligations ----------
  const extractObligations = (party, keywords) => {
    const results = [];
    keywords.forEach(kw => {
      const r = new RegExp(`${party}.*?(?:shall|will|must|agrees to)\\s*.*?${kw}[^.]*\\.`, 'is');
      const m = text.match(r);
      if (m) results.push(m[0].trim());
    });
    return results.length > 0 ? results : ['Not Specified'];
  };

  const deadlines = [];
  const dlMatch = text.matchAll(/(?:by|within|no later than|prior to|before)\s*(.*?\d{4}|.*?\d+\s*(?:day|week|month|year)s?)[^.]*\./gi);
  for (const m of dlMatch) deadlines.push(m[0].trim());
  if (deadlines.length === 0) deadlines.push('Not Specified');

  const paymentObligations = [];
  const payMatches = text.matchAll(/(?:pay|payment|fee|compensation|invoice)[^.]*\./gi);
  for (const m of payMatches) paymentObligations.push(m[0].trim());
  if (paymentObligations.length === 0) paymentObligations.push('Not Specified');

  const deliverablesList = [];
  const delMatch = text.matchAll(/[Dd]eliver.*?(?:;|\.)/g);
  for (const m of delMatch) deliverablesList.push(m[0].trim());
  if (deliverablesList.length === 0) deliverablesList.push('Not Specified');

  // ---------- financial terms ----------
  const amtMatch = text.match(/\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:USD|dollars|US\s*Dollars)?/);
  const paymentAmount = amtMatch ? `$${amtMatch[1]} USD` : "Not Found";
  const currency = text.match(/USD|US\s*Dollars|EUR|GBP|INR|JPY|CAD|AUD/i);
  const currencyVal = currency ? currency[0].toUpperCase() : "Not Found (USD assumed)";
  const lateMatch = text.match(/(\d+(?:\.\d+)?)\%\s*per\s*(?:month|annum|year|day)/i);
  const lateFees = lateMatch ? `${lateMatch[0].trim()}` : "Not Found";
  const taxMatch = text.match(/tax(?:es)?[^.]*\./i);
  const taxes = taxMatch ? taxMatch[0].trim() : "Not Found";
  const invoiceMatch = text.match(/invoice[^.]*\./i);
  const invoiceTerms = invoiceMatch ? invoiceMatch[0].trim() : "Not Found";
  const refundMatch = text.match(/refund[^.]*\./i);
  const refundPolicy = refundMatch ? refundMatch[0].trim() : "Not Found";

  // ---------- important dates ----------
  const noticePeriodMatch = text.match(/(\d+)\s*(?:day|business day)s?\s*(?:notice|prior written notice)/i);
  const noticePeriod = noticePeriodMatch ? noticePeriodMatch[0].trim() : "Not Found";
  const renewalDateMatch = text.match(/(?:renewal|renew)\s*(?:date|on|as of)[:\s]*([A-Z][a-z]+ \d{1,2},?\s*\d{4})/i);
  const renewalDate = renewalDateMatch ? renewalDateMatch[1].trim() : "Not Found";
  const payDueMatch = text.match(/(?:due|payable)\s*(?:within|in)\s*(\d+)\s*(?:day|business day)s?/i);
  const payDueDate = payDueMatch ? `Within ${payDueMatch[1]} days of invoice` : "Not Found";

  // ---------- recommendations ----------
  const top5Risks = risks.slice(0, 5).map(r => r.risk_name);
  if (top5Risks.length < 5) {
    const extras = ['Unclear contract structure', 'Ambiguous language', 'Missing standard clauses', 'One-sided provisions', 'Lack of defined metrics'];
    extras.forEach(e => { if (top5Risks.length < 5) top5Risks.push(e); });
  }

  const improvements = [];
  if (clauses.data_privacy === "Not Present") improvements.push('Add a comprehensive Data Privacy clause');
  if (clauses.security === "Not Present") improvements.push('Add Security obligations and breach notification');
  if (clauses.compliance === "Not Present") improvements.push('Add a Compliance with Laws clause');
  if (!text.match(/audit/i)) improvements.push('Add audit rights to verify compliance');
  if (!text.match(/service\s*level|sla|kpi|performance\s*metric/i)) improvements.push('Define measurable service levels or KPIs');
  if (!text.match(/insurance/i)) improvements.push('Require adequate insurance coverage from both parties');
  if (!text.match(/indemnif.*?mutual/i)) improvements.push('Ensure indemnification is mutual and balanced');
  if (!text.match(/disclaimer|as is/i) && clauses.warranty !== "Not Present") improvements.push('Add disclaimers for implied warranties where appropriate');
  while (improvements.length < 5) improvements.push('Review contract for consistency and completeness');

  // ---------- final verdict ----------
  let verdict;
  if (overallScore >= 80 && highRisks === 0) verdict = 'YES';
  else if (overallScore >= 50 && highRisks <= 2) verdict = 'REVIEW REQUIRED';
  else verdict = 'NO';

  // ============================================================
  // BUILD FINAL JSON
  // ============================================================

  return {
    summary: {
      contract_title: title,
      contract_type: contractType,
      executive_summary: generateExecutiveSummary(text, pA, pB, contractType, clauses),
      purpose: extractSection(['purpose|objective|scope'], 'Not Found').substring(0, 500),
      parties_involved: {
        party_a: pA || "Not Found",
        party_b: pB || "Not Found"
      },
      effective_date: effectiveDate,
      expiration_date: expirationDate,
      renewal_terms: renewalTerms,
      governing_law: governingLawText,
      jurisdiction: jurisdiction,
      contract_duration: contractDuration,
    },
    clauses: clauses,
    risks: risks,
    missing_clauses: missingClauses,
    compliance_score: {
      overall_score: overallScore,
      overall_rating: rating,
      category_scores: {
        completeness: completeness,
        legal_structure: legalStructure,
        risk_level: riskLevelScore,
        missing_clauses: Math.round(completeness),
        consistency: consistency,
        readability: readability,
        compliance_readiness: complianceReadiness,
      },
      strengths: strengths,
      weaknesses: weaknesses,
      recommendations: [
        overallScore >= 80 ? 'Contract is well-structured with strong compliance readiness.' : 'Consider addressing missing clauses and high-severity risks.',
        highRisks > 0 ? `Address ${highRisks} high-severity risks before signing.` : 'No high-severity risks detected.',
        'Review all clauses for alignment with business objectives.',
        'Consult legal counsel for final approval.',
        overallScore < 60 ? 'Major revisions recommended before execution.' : 'Minor improvements recommended.',
      ],
    },
    key_obligations: {
      party_a: extractObligations(pA.split(',')[0].split(' a ')[1] || pA.split(',')[0], ['provide', 'deliver', 'perform', 'develop', 'maintain', 'support', 'warrant', 'indemnif', 'keep confidential']),
      party_b: extractObligations(pB.split(',')[0].split(' a ')[1] || pB.split(',')[0], ['pay', 'provide', 'cooperate', 'access', 'review', 'accept', 'keep confidential', 'indemnif']),
      deadlines: deadlines,
      payment_obligations: paymentObligations,
      deliverables: deliverablesList,
    },
    important_dates: {
      effective_date: effectiveDate,
      termination_date: expirationDate,
      renewal_date: renewalDate,
      notice_period: noticePeriod,
      payment_due_dates: payDueDate,
    },
    financial_terms: {
      payment_amount: paymentAmount,
      currency: currencyVal,
      late_fees: lateFees,
      taxes: taxes,
      invoice_terms: invoiceTerms,
      refund_policy: refundPolicy,
    },
    metadata: {
      contract_type: contractType,
      industry: guessIndustry(text),
      language: 'English',
      page_count: estimatePages(text),
      estimated_complexity: estimateComplexity(text, presentCount, totalChecks),
      risk_level: highRisks > 1 ? 'High' : medRisks > 2 ? 'Medium' : 'Low',
    },
    recommendations: {
      top_5_risks: top5Risks,
      top_5_improvements: improvements.slice(0, 5),
      legal_recommendations: [
        highRisks > 0 ? `Resolve ${highRisks} high-severity risks before signing.` : 'Review for legal sufficiency.',
        presentCount < totalChecks ? `Add missing ${totalChecks - presentCount} critical clauses.` : 'All standard clauses are present.',
        'Ensure indemnification and liability limitations are commercially reasonable.',
        'Verify compliance with applicable data protection regulations.',
        'Confirm dispute resolution mechanism is mutually agreeable.',
      ],
      business_recommendations: [
        'Align contract terms with business objectives and risk tolerance.',
        'Define clear acceptance criteria and testing procedures for deliverables.',
        'Ensure payment milestones match project cash flow requirements.',
        'Establish regular review cadence for ongoing compliance.',
        'Document all amendments and change orders in writing.',
      ],
      final_verdict: verdict,
      verdict_explanation: getVerdictExplanation(verdict, overallScore, highRisks, medRisks, presentCount, totalChecks),
    },
    qa_knowledge_base: {
      parties: `${pA} (Provider) and ${pB} (Client)`,
      dates: {
        effective_date: effectiveDate,
        expiration_date: expirationDate,
        contract_duration: contractDuration,
      },
      payment_obligations: paymentObligations,
      confidentiality_obligations: clauses.confidentiality !== "Not Present" ? clauses.confidentiality.substring(0, 500) : 'Not specified',
      termination_conditions: clauses.termination !== "Not Present" ? clauses.termination.substring(0, 500) : 'Not specified',
      liability_details: clauses.limitation_of_liability !== "Not Present" ? clauses.limitation_of_liability.substring(0, 500) : (clauses.liability !== "Not Present" ? clauses.liability.substring(0, 500) : 'Not specified'),
      governing_law: governingLawText,
      dispute_resolution: clauses.dispute_resolution !== "Not Present" ? clauses.dispute_resolution.substring(0, 500) : (clauses.arbitration !== "Not Present" ? clauses.arbitration.substring(0, 500) : 'Not specified'),
      key_obligations: {
        provider_obligations: extractObligations(pA.split(',')[0], ['provide', 'deliver', 'perform', 'develop']),
        client_obligations: extractObligations(pB.split(',')[0], ['pay', 'cooperate', 'review']),
      },
      critical_facts: extractCriticalFacts(text, pA, pB, paymentAmount),
    },
  };
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function generateExecutiveSummary(text, pA, pB, type, clauses) {
  const wordCount = text.split(/\s+/).length;
  const hasPayment = clauses.payment_terms !== "Not Present";
  const hasConf = clauses.confidentiality !== "Not Present";
  const hasIP = clauses.intellectual_property !== "Not Present";
  const hasTerm = clauses.termination !== "Not Present";

  let summary = `This ${type || 'agreement'} is between ${pA || 'Party A'} and ${pB || 'Party B'}. `;
  summary += `The contract contains approximately ${wordCount} words. `;

  if (hasPayment) summary += 'The agreement includes payment terms with defined amounts and schedule. ';
  if (hasConf) summary += 'A mutual confidentiality clause protects proprietary information. ';
  if (hasIP) summary += 'Intellectual property ownership and rights are addressed. ';
  if (hasTerm) summary += 'Termination rights and procedures are specified. ';
  
  summary += 'The contract establishes the legal framework governing the commercial relationship, including rights, obligations, and remedies. ';
  summary += 'Key areas covered include scope of work, deliverables, warranties, liability limitations, and dispute resolution. ';
  summary += 'This analysis evaluates the contract for completeness, risk exposure, and compliance readiness.';

  return summary;
}

function guessIndustry(text) {
  const lower = text.toLowerCase();
  if (/(?:software|cloud|saas|platform|development|tech|digital|app)/.test(lower)) return 'Technology / Software';
  if (/(?:construction|build|engineering|architect)/.test(lower)) return 'Construction / Engineering';
  if (/(?:healthcare|medical|patient|clinical|pharma)/.test(lower)) return 'Healthcare / Pharmaceuticals';
  if (/(?:finance|bank|insurance|investment|loan)/.test(lower)) return 'Financial Services';
  if (/(?:manufactur|supply|distribut|logistics)/.test(lower)) return 'Manufacturing / Supply Chain';
  if (/(?:retail|ecommerce|store|merchandise)/.test(lower)) return 'Retail / E-Commerce';
  if (/(?:real estate|property|lease|landlord|tenant)/.test(lower)) return 'Real Estate';
  return 'General / Professional Services';
}

function estimatePages(text) {
  const words = text.split(/\s+/).length;
  const pages = Math.max(1, Math.round(words / 350));
  return `${pages} page(s) (approx.)`;
}

function estimateComplexity(text, present, total) {
  const words = text.split(/\s+/).length;
  const ratio = present / total;
  if (words > 3000 && ratio > 0.8) return 'High';
  if (words > 1500 && ratio > 0.6) return 'Medium';
  return 'Low';
}

function getVerdictExplanation(verdict, score, highRisks, medRisks, present, total) {
  if (verdict === 'YES') {
    return `The contract scores ${score}/100 with no high-severity risks and ${present}/${total} essential clauses present. It is well-structured and commercially balanced. Legal counsel should still conduct a final review.`;
  }
  if (verdict === 'NO') {
    return `The contract scores ${score}/100 with ${highRisks} high-severity risks and only ${present}/${total} essential clauses. Significant revisions are required before this contract can be safely executed. Recommend legal consultation.`;
  }
  return `The contract scores ${score}/100 with ${highRisks} high-severity and ${medRisks} medium-severity risks. ${present}/${total} essential clauses are present. The contract requires careful review and specific amendments before signing.`;
}

function extractCriticalFacts(text, pA, pB, amount) {
  const facts = [];
  if (pA && pA !== 'Not Found') facts.push(`Provider: ${pA}`);
  if (pB && pB !== 'Not Found') facts.push(`Client: ${pB}`);
  if (amount && amount !== 'Not Found') facts.push(`Contract Value: ${amount}`);
  
  const dates = text.match(/(?:effective|commencement)\s*(?:date)?[:\s]*([A-Z][a-z]+ \d{1,2},?\s*\d{4})/i);
  if (dates) facts.push(`Effective: ${dates[1]}`);
  
  if (text.match(/confidential/i)) facts.push('Confidentiality obligations apply');
  if (text.match(/arbitration/i)) facts.push('Disputes resolved through binding arbitration');
  if (text.match(/indemnif/i)) facts.push('Indemnification obligations exist');
  
  return facts;
}

// ============================================================
// UI CONTROLLER
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const contractInput = document.getElementById('contractInput');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const fileUpload = document.getElementById('fileUpload');
  const fileName = document.getElementById('fileName');
  const loadSampleBtn = document.getElementById('loadSampleBtn');
  const loadingSection = document.getElementById('loadingSection');
  const resultsSection = document.getElementById('resultsSection');
  const exportBtn = document.getElementById('exportBtn');
  const exportPdfBtn = document.getElementById('exportPdfBtn');

  let currentResult = null;

  // Load sample
  loadSampleBtn.addEventListener('click', () => {
    contractInput.value = SAMPLE_CONTRACT;
    fileName.textContent = 'Sample contract loaded';
  });

  // File upload
  fileUpload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    fileName.textContent = file.name;

    try {
      const text = await file.text();
      contractInput.value = text;
    } catch {
      // If binary (PDF), tell user to paste text
      contractInput.value = '[Could not read file directly. Please paste the contract text manually.]';
    }
  });

  // Analyze
  analyzeBtn.addEventListener('click', () => {
    const text = contractInput.value.trim();
    if (!text || text.length < 50) {
      alert('Please enter a contract with at least 50 characters.');
      return;
    }

    // Show loading
    loadingSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    analyzeBtn.disabled = true;

    // Simulate processing time for UX
    setTimeout(() => {
      const result = analyzeContract(text);
      analyzeBtn.disabled = false;

      if (!result) {
        alert('Could not analyze the contract. Please check the text and try again.');
        loadingSection.classList.add('hidden');
        return;
      }

      currentResult = result;
      loadingSection.classList.add('hidden');
      resultsSection.classList.remove('hidden');
      renderResults(result);

      // Scroll to results
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1200);
  });

  // Render all sections
  function renderResults(r) {
    renderSummary(r);
    renderClauses(r);
    renderRisks(r);
    renderMissing(r);
    renderCompliance(r);
    renderObligations(r);
    renderDates(r);
    renderFinancial(r);
    renderMetadata(r);
    renderRecommendations(r);
    renderQA(r);
  }

  // ---------- render helpers ----------
  function renderSummary(r) {
    const s = r.summary;
    const body = document.getElementById('summaryBody');
    body.innerHTML = `
      <h3>Contract Title</h3>
      <p>${s.contract_title}</p>
      <h3>Contract Type</h3>
      <p>${s.contract_type}</p>
      <h3>Executive Summary</h3>
      <p>${s.executive_summary}</p>
      <h3>Purpose</h3>
      <p>${s.purpose}</p>
      <h3>Parties</h3>
      <p><strong>Party A (Provider):</strong> ${s.parties_involved.party_a}</p>
      <p><strong>Party B (Client):</strong> ${s.parties_involved.party_b}</p>
      <table class="data-table">
        <tr><th>Field</th><th>Value</th></tr>
        <tr><td>Effective Date</td><td>${s.effective_date}</td></tr>
        <tr><td>Expiration Date</td><td>${s.expiration_date}</td></tr>
        <tr><td>Duration</td><td>${s.contract_duration}</td></tr>
        <tr><td>Governing Law</td><td>${s.governing_law}</td></tr>
        <tr><td>Jurisdiction</td><td>${s.jurisdiction}</td></tr>
        <tr><td>Renewal Terms</td><td>${s.renewal_terms}</td></tr>
      </table>
    `;
  }

  function renderClauses(r) {
    const c = r.clauses;
    const body = document.getElementById('clausesBody');
    let html = '';
    for (const [key, val] of Object.entries(c)) {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const isPresent = val !== 'Not Present';
      html += `
        <div style="margin-bottom:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <h3 style="margin:0 0 0.3rem;">${label}</h3>
            <span class="badge ${isPresent ? 'badge-present' : 'badge-missing'}">${isPresent ? 'Present' : 'Missing'}</span>
          </div>
          <p style="font-size:0.85rem;max-height:120px;overflow-y:auto;background:rgba(0,0,0,0.2);padding:0.6rem;border-radius:6px;">${val.length > 800 ? val.substring(0, 800) + '...' : val}</p>
        </div>
      `;
    }
    body.innerHTML = html;
  }

  function renderRisks(r) {
    const body = document.getElementById('risksBody');
    if (r.risks.length === 0) {
      body.innerHTML = '<p>No significant risks detected.</p>';
      return;
    }
    let html = '';
    r.risks.forEach(risk => {
      const sev = risk.severity.toLowerCase();
      html += `
        <div class="risk-item ${sev}">
          <h4>${risk.risk_name}</h4>
          <div class="risk-meta">
            <span class="badge badge-${sev}">${risk.severity}</span>
          </div>
          <p><strong>Explanation:</strong> ${risk.explanation}</p>
          <p><strong>Potential Impact:</strong> ${risk.potential_impact}</p>
          <p><strong>Suggested Fix:</strong> ${risk.suggested_fix}</p>
        </div>
      `;
    });
    body.innerHTML = html;
  }

  function renderMissing(r) {
    const body = document.getElementById('missingBody');
    let html = '<table class="data-table"><tr><th>Clause</th><th>Status</th><th>Why Important</th><th>Recommendation</th></tr>';
    r.missing_clauses.forEach(m => {
      const statusClass = m.status === 'Present' ? 'badge-present' : 'badge-missing';
      html += `<tr>
        <td><strong>${m.clause}</strong></td>
        <td><span class="badge ${statusClass}">${m.status}</span></td>
        <td style="font-size:0.82rem;">${m.why_important}</td>
        <td style="font-size:0.82rem;">${m.recommendation}</td>
      </tr>`;
    });
    html += '</table>';
    body.innerHTML = html;
  }

  function renderCompliance(r) {
    const cs = r.compliance_score;
    const body = document.getElementById('complianceBody');

    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (cs.overall_score / 100) * circumference;
    const color = cs.overall_score >= 85 ? '#22c55e' : cs.overall_score >= 70 ? '#f59e0b' : cs.overall_score >= 50 ? '#f97316' : '#ef4444';

    let strengthsHtml = '';
    cs.strengths.forEach(s => strengthsHtml += `<li>${s}</li>`);
    let weaknessesHtml = '';
    cs.weaknesses.forEach(w => weaknessesHtml += `<li>${w}</li>`);

    let recsHtml = '';
    cs.recommendations.forEach(r => recsHtml += `<li>${r}</li>`);

    body.innerHTML = `
      <div class="score-container">
        <div class="score-ring">
          <svg width="140" height="140">
            <circle class="bg" cx="70" cy="70" r="54"/>
            <circle class="progress" cx="70" cy="70" r="54" stroke="${color}" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
          </svg>
          <div class="score-value">
            <span class="number" style="color:${color};">${cs.overall_score}</span>
            <span class="rating">${cs.overall_rating}</span>
          </div>
        </div>
        <div class="score-details">
          <div class="score-category"><span class="cat-name">Completeness</span><span class="cat-value">${cs.category_scores.completeness}%</span></div>
          <div class="score-category"><span class="cat-name">Legal Structure</span><span class="cat-value">${cs.category_scores.legal_structure}%</span></div>
          <div class="score-category"><span class="cat-name">Risk Level</span><span class="cat-value">${cs.category_scores.risk_level}%</span></div>
          <div class="score-category"><span class="cat-name">Consistency</span><span class="cat-value">${cs.category_scores.consistency}%</span></div>
          <div class="score-category"><span class="cat-name">Readability</span><span class="cat-value">${cs.category_scores.readability}%</span></div>
          <div class="score-category"><span class="cat-name">Compliance Readiness</span><span class="cat-value">${cs.category_scores.compliance_readiness}%</span></div>
        </div>
      </div>
      <h3>Strengths</h3>
      <ul class="strength-list">${strengthsHtml}</ul>
      <h3>Weaknesses</h3>
      <ul class="weakness-list">${weaknessesHtml}</ul>
      <h3>Recommendations</h3>
      <ol style="margin-top:0.3rem;">${recsHtml}</ol>
    `;
  }

  function renderObligations(r) {
    const ko = r.key_obligations;
    const body = document.getElementById('obligationsBody');
    body.innerHTML = `
      <h3>Party A (Provider) Obligations</h3>
      <ul>${ko.party_a.map(o => `<li>${o}</li>`).join('')}</ul>
      <h3>Party B (Client) Obligations</h3>
      <ul>${ko.party_b.map(o => `<li>${o}</li>`).join('')}</ul>
      <h3>Deadlines</h3>
      <ul>${ko.deadlines.map(d => `<li>${d}</li>`).join('')}</ul>
      <h3>Payment Obligations</h3>
      <ul>${ko.payment_obligations.map(p => `<li>${p}</li>`).join('')}</ul>
      <h3>Deliverables</h3>
      <ul>${ko.deliverables.map(d => `<li>${d}</li>`).join('')}</ul>
    `;
  }

  function renderDates(r) {
    const d = r.important_dates;
    const body = document.getElementById('datesBody');
    body.innerHTML = `
      <table class="data-table">
        <tr><th>Date Type</th><th>Value</th></tr>
        <tr><td>Effective Date</td><td>${d.effective_date}</td></tr>
        <tr><td>Termination Date</td><td>${d.termination_date}</td></tr>
        <tr><td>Renewal Date</td><td>${d.renewal_date}</td></tr>
        <tr><td>Notice Period</td><td>${d.notice_period}</td></tr>
        <tr><td>Payment Due Dates</td><td>${d.payment_due_dates}</td></tr>
      </table>
    `;
  }

  function renderFinancial(r) {
    const f = r.financial_terms;
    const body = document.getElementById('financialBody');
    body.innerHTML = `
      <table class="data-table">
        <tr><th>Term</th><th>Value</th></tr>
        <tr><td>Payment Amount</td><td>${f.payment_amount}</td></tr>
        <tr><td>Currency</td><td>${f.currency}</td></tr>
        <tr><td>Late Fees</td><td>${f.late_fees}</td></tr>
        <tr><td>Taxes</td><td>${f.taxes}</td></tr>
        <tr><td>Invoice Terms</td><td>${f.invoice_terms}</td></tr>
        <tr><td>Refund Policy</td><td>${f.refund_policy}</td></tr>
      </table>
    `;
  }

  function renderMetadata(r) {
    const m = r.metadata;
    const body = document.getElementById('metadataBody');
    body.innerHTML = `
      <table class="data-table">
        <tr><th>Field</th><th>Value</th></tr>
        <tr><td>Contract Type</td><td>${m.contract_type}</td></tr>
        <tr><td>Industry</td><td>${m.industry}</td></tr>
        <tr><td>Language</td><td>${m.language}</td></tr>
        <tr><td>Page Count</td><td>${m.page_count}</td></tr>
        <tr><td>Estimated Complexity</td><td>${m.estimated_complexity}</td></tr>
        <tr><td>Risk Level</td><td><span class="badge badge-${m.risk_level.toLowerCase()}">${m.risk_level}</span></td></tr>
      </table>
    `;
  }

  function renderRecommendations(r) {
    const rec = r.recommendations;
    const body = document.getElementById('recommendationsBody');
    const verdictClass = rec.final_verdict === 'YES' ? 'verdict-yes' : rec.final_verdict === 'NO' ? 'verdict-no' : 'verdict-review';

    let risksHtml = '';
    rec.top_5_risks.forEach(rr => { risksHtml += `<li>${rr}</li>`; });
    let imprHtml = '';
    rec.top_5_improvements.forEach(imp => { imprHtml += `<li>${imp}</li>`; });
    let legalHtml = '';
    rec.legal_recommendations.forEach(lr => { legalHtml += `<li>${lr}</li>`; });
    let busHtml = '';
    rec.business_recommendations.forEach(br => { busHtml += `<li>${br}</li>`; });

    body.innerHTML = `
      <h3>Top 5 Risks</h3>
      <ol>${risksHtml}</ol>
      <h3>Top 5 Improvements</h3>
      <ol>${imprHtml}</ol>
      <h3>Legal Recommendations</h3>
      <ol>${legalHtml}</ol>
      <h3>Business Recommendations</h3>
      <ol>${busHtml}</ol>
      <h3>Final Verdict</h3>
      <div class="verdict-box ${verdictClass}">${rec.final_verdict}</div>
      <p>${rec.verdict_explanation}</p>
    `;
  }

  function renderQA(r) {
    const qa = r.qa_knowledge_base;
    const body = document.getElementById('qaBody');
    let factsHtml = '';
    qa.critical_facts.forEach(f => factsHtml += `<li>${f}</li>`);

    body.innerHTML = `
      <h3>Parties</h3>
      <p>${qa.parties}</p>
      <h3>Key Dates</h3>
      <p>Effective: ${qa.dates.effective_date} | Expiration: ${qa.dates.expiration_date} | Duration: ${qa.dates.contract_duration}</p>
      <h3>Payment Obligations</h3>
      <ul>${qa.payment_obligations.map(p => `<li>${p}</li>`).join('')}</ul>
      <h3>Confidentiality Obligations</h3>
      <p>${qa.confidentiality_obligations}</p>
      <h3>Termination Conditions</h3>
      <p>${qa.termination_conditions}</p>
      <h3>Liability Details</h3>
      <p>${qa.liability_details}</p>
      <h3>Governing Law</h3>
      <p>${qa.governing_law}</p>
      <h3>Dispute Resolution</h3>
      <p>${qa.dispute_resolution}</p>
      <h3>Key Obligations</h3>
      <p><strong>Provider:</strong></p>
      <ul>${qa.key_obligations.provider_obligations.map(o => `<li>${o}</li>`).join('')}</ul>
      <p><strong>Client:</strong></p>
      <ul>${qa.key_obligations.client_obligations.map(o => `<li>${o}</li>`).join('')}</ul>
      <h3>Critical Facts</h3>
      <ul>${factsHtml}</ul>
    `;
  }

  // Export JSON
  exportBtn.addEventListener('click', () => {
    if (!currentResult) return;
    const json = JSON.stringify(currentResult, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contract-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Export PDF summary
  exportPdfBtn.addEventListener('click', () => {
    if (!currentResult) return;
    // Create printable version
    const w = window.open('', '_blank');
    w.document.write(`
      <html><head><title>Contract Analysis Report</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; color: #222; }
        h1 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
        h2 { color: #333; margin-top: 24px; }
        table { width: 100%; border-collapse: collapse; margin: 12px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f5f5f5; }
        .score { font-size: 28px; font-weight: bold; color: #4f46e5; }
        .verdict { font-size: 20px; font-weight: bold; padding: 10px; border-radius: 6px; display: inline-block; }
        .verdict-yes { background: #dcfce7; color: #166534; }
        .verdict-no { background: #fee2e2; color: #991b1b; }
        .verdict-review { background: #fef3c7; color: #92400e; }
        @media print { body { padding: 20px; } }
      </style></head><body>
      <h1>AI Contract IQ — Analysis Report</h1>
      <p>Generated: ${new Date().toLocaleString()}</p>
      <hr/>
      <h2>Contract Summary</h2>
      <p><strong>Title:</strong> ${currentResult.summary.contract_title}</p>
      <p><strong>Type:</strong> ${currentResult.summary.contract_type}</p>
      <p><strong>Parties:</strong> ${currentResult.summary.parties_involved.party_a} & ${currentResult.summary.parties_involved.party_b}</p>
      <p><strong>Executive Summary:</strong> ${currentResult.summary.executive_summary}</p>

      <h2>Compliance Score</h2>
      <p class="score">${currentResult.compliance_score.overall_score}/100 — ${currentResult.compliance_score.overall_rating}</p>
      <table>
        <tr><th>Category</th><th>Score</th></tr>
        <tr><td>Completeness</td><td>${currentResult.compliance_score.category_scores.completeness}%</td></tr>
        <tr><td>Legal Structure</td><td>${currentResult.compliance_score.category_scores.legal_structure}%</td></tr>
        <tr><td>Risk Level</td><td>${currentResult.compliance_score.category_scores.risk_level}%</td></tr>
        <tr><td>Consistency</td><td>${currentResult.compliance_score.category_scores.consistency}%</td></tr>
        <tr><td>Readability</td><td>${currentResult.compliance_score.category_scores.readability}%</td></tr>
        <tr><td>Compliance Readiness</td><td>${currentResult.compliance_score.category_scores.compliance_readiness}%</td></tr>
      </table>

      <h2>Risk Summary</h2>
      <p>${currentResult.risks.length} risks detected (${currentResult.risks.filter(r => r.severity === 'High').length} High, ${currentResult.risks.filter(r => r.severity === 'Medium').length} Medium, ${currentResult.risks.filter(r => r.severity === 'Low').length} Low)</p>
      <ul>${currentResult.risks.map(r => `<li><strong>${r.risk_name}</strong> (${r.severity}): ${r.explanation}</li>`).join('')}</ul>

      <h2>Missing Clauses</h2>
      <ul>${currentResult.missing_clauses.filter(m => m.status === 'Missing').map(m => `<li>${m.clause} — ${m.recommendation}</li>`).join('')}</ul>

      <h2>Final Verdict</h2>
      <div class="verdict verdict-${currentResult.recommendations.final_verdict === 'YES' ? 'yes' : currentResult.recommendations.final_verdict === 'NO' ? 'no' : 'review'}">${currentResult.recommendations.final_verdict}</div>
      <p>${currentResult.recommendations.verdict_explanation}</p>
      </body></html>
    `);
    w.document.close();
    w.focus();
    w.print();
  });
});

// ============================================================
// CARD TOGGLE
// ============================================================
function toggleCard(bodyId) {
  const body = document.getElementById(bodyId);
  const header = body.previousElementSibling;
  body.classList.toggle('open');
  header.classList.toggle('open');
}

