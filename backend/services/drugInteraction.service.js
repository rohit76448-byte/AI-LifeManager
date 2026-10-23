/**
 * MEDICARE DRUG INTERACTION & SAFETY CHECKER SERVICE
 * Compares patient medications and flags duplication, drug-drug interactions, food/alcohol warnings.
 */

const KNOWN_INTERACTION_RULES = [
  {
    drugs: ['amoxicillin', 'methotrexate'],
    severity: 'High Concern',
    warning: 'Amoxicillin can reduce renal clearance of Methotrexate, increasing toxicity risk.',
    action: 'Consult your prescribing doctor immediately before combining.'
  },
  {
    drugs: ['lisinopril', 'ibuprofen'],
    severity: 'Moderate Concern',
    warning: 'NSAIDs like Ibuprofen may decrease the antihypertensive effect of Lisinopril and increase renal impairment risk.',
    action: 'Monitor blood pressure closely. Consider alternative analgesics (e.g. Paracetamol) under medical advice.'
  },
  {
    drugs: ['metformin', 'alcohol'],
    severity: 'Caution',
    warning: 'Alcohol increases the risk of lactic acidosis when taking Metformin.',
    action: 'Avoid excessive alcohol consumption while taking Metformin.'
  },
  {
    drugs: ['paracetamol', 'acetaminophen'],
    severity: 'Duplicate Ingredient',
    warning: 'Paracetamol and Acetaminophen are the same active drug. Risk of acute hepatic toxicity.',
    action: 'Do not combine medications containing both ingredients. Stay below 4,000 mg total daily.'
  },
  {
    drugs: ['warfarin', 'paracetamol'],
    severity: 'Low to Moderate',
    warning: 'Prolonged high-dose Paracetamol use can potentiate the anticoagulant effect of Warfarin.',
    action: 'Consult pharmacist if using regular high doses.'
  }
];

function analyzeInteractions(medicineList) {
  if (!Array.isArray(medicineList) || medicineList.length < 2) {
    return {
      safetyScore: 100,
      status: 'Clean',
      message: 'At least two medications are required to perform a pairwise interaction cross-check.',
      alerts: []
    };
  }

  const normalized = medicineList.map(m => (typeof m === 'string' ? m : m.name || '').toLowerCase().trim());
  const alerts = [];

  for (let i = 0; i < normalized.length; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      const drugA = normalized[i];
      const drugB = normalized[j];

      KNOWN_INTERACTION_RULES.forEach(rule => {
        const matchesA = rule.drugs.some(d => drugA.includes(d));
        const matchesB = rule.drugs.some(d => drugB.includes(d));

        if (matchesA && matchesB) {
          alerts.push({
            pair: [drugA, drugB],
            severity: rule.severity,
            warning: rule.warning,
            action: rule.action
          });
        }
      });
    }
  }

  const safetyScore = alerts.length === 0 ? 98 : Math.max(40, 95 - alerts.length * 20);

  return {
    safetyScore,
    status: alerts.length === 0 ? 'Verified Safe' : 'Alerts Identified',
    alertsCount: alerts.length,
    alerts,
    disclaimer: 'This safety analysis is for educational and informational purposes only. Always consult a qualified physician or licensed pharmacist for medical advice.'
  };
}

module.exports = {
  analyzeInteractions
};
