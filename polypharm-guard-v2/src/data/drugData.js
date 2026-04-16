// ──────────────────────────────────────────────────────────────
// Drug Interaction Database
// Keys are sorted, lowercase, joined with "+"
// e.g. "aspirin+warfarin"
// ──────────────────────────────────────────────────────────────
export const INTERACTIONS = {
  'aspirin+warfarin': {
    risk: 'High',
    message: 'Serious bleeding risk. Both affect clotting – together the risk is significantly elevated.',
    detail: 'Warfarin anticoagulates blood; Aspirin inhibits platelet aggregation. Combined effect greatly raises hemorrhage risk.',
    recommendation: 'Do not combine without close physician supervision. Immediate medical review required.',
  },
  'atorvastatin+clarithromycin': {
    risk: 'Moderate',
    message: 'Clarithromycin increases atorvastatin levels, raising muscle damage (myopathy) risk.',
    detail: 'Clarithromycin inhibits CYP3A4, the liver enzyme that breaks down atorvastatin, causing drug accumulation.',
    recommendation: 'Inform your doctor. A temporary statin dose adjustment or alternative antibiotic may be needed.',
  },
  'amlodipine+simvastatin': {
    risk: 'Moderate',
    message: 'Amlodipine raises simvastatin blood levels. Limit simvastatin to 20 mg/day.',
    detail: 'This increases myopathy risk. Monitor for unexplained muscle pain or weakness.',
    recommendation: 'Keep simvastatin ≤ 20 mg/day when taking amlodipine. Consult your cardiologist.',
  },
  'alcohol+metformin': {
    risk: 'High',
    message: 'Alcohol significantly increases lactic acidosis risk with Metformin.',
    detail: 'Heavy alcohol impairs liver function, reducing Metformin clearance and dangerously raising lactic acid levels.',
    recommendation: 'Avoid alcohol while on Metformin. This is a serious safety concern.',
  },
  'ibuprofen+paracetamol': {
    risk: 'Safe',
    message: 'No significant interaction. Commonly used together for superior pain control.',
    detail: 'Paracetamol and ibuprofen act via different mechanisms – combining them is safe and often more effective.',
    recommendation: 'Safe to use together as directed. Follow standard dosing guidelines for each.',
  },
  'lisinopril+potassium': {
    risk: 'Moderate',
    message: 'ACE inhibitors raise potassium levels. Avoid extra potassium supplements.',
    detail: 'Lisinopril reduces aldosterone production, causing potassium retention. Adding supplements risks hyperkalemia.',
    recommendation: 'Monitor potassium levels. Avoid salt substitutes containing potassium chloride.',
  },
  'clopidogrel+omeprazole': {
    risk: 'Moderate',
    message: 'Omeprazole may reduce clopidogrel\'s antiplatelet effectiveness.',
    detail: 'Omeprazole inhibits CYP2C19, the enzyme needed to activate clopidogrel (a prodrug).',
    recommendation: 'Discuss switching to pantoprazole with your doctor – it has less CYP2C19 inhibition.',
  },
  'aspirin+ibuprofen': {
    risk: 'Moderate',
    message: 'Ibuprofen may block aspirin\'s heart-protective antiplatelet effect.',
    detail: 'Both compete for the same COX-1 binding site. Ibuprofen taken before aspirin can block its action.',
    recommendation: 'If on low-dose aspirin for heart protection, take aspirin first and wait 2+ hours before ibuprofen.',
  },
  'ibuprofen+warfarin': {
    risk: 'High',
    message: 'Ibuprofen significantly increases bleeding risk with warfarin and can cause GI hemorrhage.',
    detail: 'Ibuprofen (NSAID) inhibits platelets AND irritates the GI lining, massively amplifying warfarin\'s bleed risk.',
    recommendation: 'Avoid ibuprofen with warfarin. Use paracetamol for pain relief instead.',
  },
  'amoxicillin+warfarin': {
    risk: 'Moderate',
    message: 'Amoxicillin may enhance warfarin\'s anticoagulant effect, increasing bleed risk.',
    detail: 'Antibiotics can reduce gut bacteria that produce vitamin K, potentially raising INR unpredictably.',
    recommendation: 'Monitor INR closely when starting or stopping any antibiotic while on warfarin.',
  },
  'metoprolol+verapamil': {
    risk: 'High',
    message: 'Combining two heart-rate-slowing drugs can cause dangerous bradycardia or heart block.',
    detail: 'Both metoprolol (beta-blocker) and verapamil (calcium channel blocker) slow heart rate and conduction.',
    recommendation: 'This combination is generally contraindicated. Seek cardiologist review immediately.',
  },
}

// ──────────────────────────────────────────────────────────────
// Drug Information Database
// ──────────────────────────────────────────────────────────────
export const DRUGS = [
  {
    id: 1,
    name: 'Aspirin',
    brand: 'Ecosprin, Disprin, Aspro',
    category: 'NSAID / Antiplatelet',
    uses: 'Pain relief, fever reduction, anti-inflammatory. Prevention of heart attacks and strokes in at-risk patients. Low-dose therapy for cardiovascular protection.',
    dosage: 'Pain / Fever: 325–650 mg every 4–6 hours. Maximum 4 g/day. Heart protection (low dose): 75–100 mg once daily with food. Children: avoid unless specifically prescribed.',
    sideEffects: 'Stomach upset, heartburn, gastrointestinal bleeding, increased bruising, tinnitus at high doses, allergic reactions (rash, breathing difficulty). Reye\'s syndrome risk in children.',
    warnings: 'Avoid in children under 12 (Reye\'s syndrome risk). Always take with food or milk. Caution with other blood thinners, NSAIDs, or alcohol. Not recommended in the last trimester of pregnancy. Stop 7 days before any surgery.',
  },
  {
    id: 2,
    name: 'Metformin',
    brand: 'Glycomet, Glucophage, Obimet',
    category: 'Antidiabetic (Biguanide)',
    uses: 'First-line treatment for type 2 diabetes mellitus. Management of polycystic ovary syndrome (PCOS). Reduction of insulin resistance. Sometimes used for weight management in prediabetes.',
    dosage: '500–1000 mg twice daily with meals. Start at 500 mg once daily and titrate up over 2–4 weeks. Maximum dose: 2550 mg/day. Extended release: 500–2000 mg once daily at dinner.',
    sideEffects: 'Nausea, diarrhea, abdominal discomfort, metallic taste (especially early). Long-term: vitamin B12 deficiency. Rare but serious: lactic acidosis (risk increases with kidney disease, alcohol, or contrast agents).',
    warnings: 'Hold 48 hours before and after iodinated contrast dye imaging procedures. Avoid heavy alcohol. Monitor kidney function (eGFR) every 3–6 months. Contraindicated in severe renal or hepatic impairment.',
  },
  {
    id: 3,
    name: 'Atorvastatin',
    brand: 'Lipitor, Atorva, Storvas',
    category: 'Statin (Cholesterol-lowering)',
    uses: 'Reduce elevated LDL ("bad") cholesterol and triglycerides. Raise HDL ("good") cholesterol. Cardiovascular risk reduction. Prevention of heart attack and stroke in high-risk patients.',
    dosage: '10–80 mg once daily, usually in the evening (peak cholesterol synthesis is nocturnal). Start at 10–20 mg; titrate based on LDL response and tolerance. Take with or without food.',
    sideEffects: 'Muscle pain or weakness (myopathy / rhabdomyolysis at high doses), liver enzyme elevation, headache, nausea, joint pain, memory disturbances (rare), slightly increased diabetes risk.',
    warnings: 'Report unexplained muscle pain, tenderness, or weakness to your doctor immediately (risk of rhabdomyolysis). Avoid large quantities of grapefruit juice. Regular liver function tests recommended. Contraindicated in pregnancy and breastfeeding.',
  },
  {
    id: 4,
    name: 'Amlodipine',
    brand: 'Norvasc, Amlong, Amlip',
    category: 'Calcium Channel Blocker (CCB)',
    uses: 'Treatment of hypertension (high blood pressure). Chronic stable angina. Vasospastic (Prinzmetal\'s) angina. Coronary artery disease risk reduction.',
    dosage: 'Initial: 5 mg once daily. Maintenance: 5–10 mg once daily. Take at the same time each day with or without food. Elderly or hepatic impairment: start at 2.5 mg.',
    sideEffects: 'Ankle and foot swelling (pedal edema – most common), flushing, dizziness, fatigue, palpitations, headache, gingival hyperplasia (gum overgrowth) with long-term use.',
    warnings: 'Do not stop abruptly without doctor advice. Monitor blood pressure regularly. Use caution in severe aortic stenosis or liver disease. Can interact with simvastatin (limit statin to 20 mg). Safe in pregnancy when necessary.',
  },
  {
    id: 5,
    name: 'Omeprazole',
    brand: 'Prilosec, Omez, Omeprol',
    category: 'Proton Pump Inhibitor (PPI)',
    uses: 'Gastroesophageal reflux disease (GERD). Peptic ulcer disease (gastric and duodenal). H. pylori eradication (as part of triple therapy). Zollinger-Ellison syndrome. Prevention of NSAID-induced ulcers.',
    dosage: '20–40 mg once daily, 30 minutes before the first meal. GERD: 20 mg × 4–8 weeks. Ulcer prevention: 20 mg daily. Zollinger-Ellison: up to 120 mg/day in divided doses.',
    sideEffects: 'Headache, diarrhea, nausea, abdominal pain, constipation. Long-term use: low magnesium (hypomagnesemia), vitamin B12 deficiency, reduced bone density, increased C. difficile risk.',
    warnings: 'Long-term use (>1 year) requires periodic clinical review and monitoring of magnesium and B12. May reduce effectiveness of clopidogrel. Avoid self-medicating beyond 2 weeks without assessment. Taper rather than abrupt stop.',
  },
  {
    id: 6,
    name: 'Warfarin',
    brand: 'Coumadin, Warf, Uniwarfin',
    category: 'Anticoagulant (Vitamin K Antagonist)',
    uses: 'Prevention and treatment of deep vein thrombosis (DVT) and pulmonary embolism (PE). Stroke prevention in atrial fibrillation. Mechanical heart valve thromboprophylaxis. Antiphospholipid syndrome.',
    dosage: 'Highly individualized — ALWAYS dose-adjusted by INR blood test. Starting dose: 2–5 mg/day. Maintenance: typically 2–10 mg/day depending on INR. Target INR: 2–3 for most indications; 2.5–3.5 for mechanical valves.',
    sideEffects: 'Bleeding (major risk — any unusual bleeding must be reported immediately), easy bruising, skin necrosis (rare, first few days), purple toe syndrome (very rare), hair loss.',
    warnings: 'CRITICAL: Hundreds of drug and food interactions. Regular INR monitoring is mandatory (weekly initially, then monthly). Keep vitamin K intake (leafy greens) consistent. Carry a medical alert card. Avoid contact sports. Report any unusual bleeding to your doctor immediately.',
  },
  {
    id: 7,
    name: 'Lisinopril',
    brand: 'Zestril, Prinivil, Listril',
    category: 'ACE Inhibitor',
    uses: 'Hypertension treatment. Heart failure management. Post-myocardial infarction cardiac protection. Diabetic nephropathy (slows kidney disease progression). Left ventricular dysfunction.',
    dosage: 'Hypertension: 5–10 mg once daily initially; maintenance 10–40 mg. Heart failure: start 2.5–5 mg; target 20–40 mg. Take with or without food consistently. Renal dosing adjustment required.',
    sideEffects: 'Persistent dry cough (20% of patients – class effect), first-dose hypotension, elevated potassium (hyperkalemia), dizziness, headache. Rare but serious: angioedema (facial/throat swelling — medical emergency).',
    warnings: 'Absolutely contraindicated in pregnancy (causes fetal renal agenesis). Monitor kidney function and serum potassium, especially in elderly. Avoid potassium supplements and potassium-sparing diuretics. If angioedema occurs, stop immediately and seek emergency care.',
  },
  {
    id: 8,
    name: 'Metoprolol',
    brand: 'Lopressor, Betaloc, Seloken',
    category: 'Beta-1 Selective Beta Blocker',
    uses: 'Hypertension. Chronic heart failure (with proven mortality benefit). Stable angina. Arrhythmia management (atrial fibrillation rate control). Secondary prevention after myocardial infarction.',
    dosage: 'Succinate (XL/extended release): 25–200 mg once daily. Tartrate (immediate release): 25–100 mg twice daily. Take with food to improve absorption and reduce side effects. Do not crush or chew extended-release tablets.',
    sideEffects: 'Fatigue, cold extremities (peripheral vasoconstriction), dizziness, bradycardia (slow heart rate), shortness of breath, depression, sexual dysfunction, sleep disturbances, nightmares.',
    warnings: 'NEVER discontinue abruptly — rebound angina, hypertension, or myocardial infarction can occur. Taper dose over 1–2 weeks. Can mask hypoglycemia symptoms in diabetic patients. Use caution in asthma/COPD. Adjust dose in severe hepatic impairment.',
  },
  {
    id: 9,
    name: 'Amoxicillin',
    brand: 'Amoxil, Novamox, Trimox',
    category: 'Antibiotic (Aminopenicillin)',
    uses: 'Bacterial infections of the ear, nose, throat, skin, urinary tract, and lower respiratory tract. H. pylori eradication (in combination). Dental prophylaxis. Lyme disease (early stage).',
    dosage: 'Adults: 250–500 mg every 8 hours or 500–875 mg every 12 hours. Severe infections: up to 3 g/day. Complete the full prescribed course even if you feel better earlier.',
    sideEffects: 'Diarrhea, nausea, vomiting, skin rash, allergic reactions (mild to anaphylaxis). Antibiotic-associated colitis (C. difficile). Yeast overgrowth (oral or vaginal thrush).',
    warnings: 'Inform doctor of any penicillin allergy (cross-reactivity risk with cephalosporins). Never take leftover antibiotics or share with others. Completing the full course is essential to prevent antibiotic resistance. May reduce effectiveness of oral contraceptives (use backup contraception).',
  },
  {
    id: 10,
    name: 'Clopidogrel',
    brand: 'Plavix, Clopivas, Deplatt',
    category: 'Antiplatelet Agent (P2Y12 inhibitor)',
    uses: 'Prevention of blood clots after heart attack, stroke, or peripheral artery disease. Used with aspirin (dual antiplatelet therapy / DAPT) after coronary stent placement. Acute coronary syndrome management.',
    dosage: 'Standard: 75 mg once daily with or without food. Loading dose (acute setting): 300–600 mg single dose. DAPT after stent: 75 mg/day for 6–12 months alongside aspirin 75–100 mg/day.',
    sideEffects: 'Bleeding (major concern), easy bruising, stomach upset, diarrhea, skin rash, itching. Rare: thrombotic thrombocytopenic purpura (TTP — severe, requires immediate care).',
    warnings: 'Do not stop without doctor advice — stopping after coronary stent increases risk of stent thrombosis (life-threatening). PPIs (especially omeprazole) can reduce effectiveness. May interact with warfarin, NSAIDs, and SSRIs. Genetic variation (CYP2C19 poor metabolizers) can affect response.',
  },
]

// ──────────────────────────────────────────────────────────────
// Recent Checks (Home page demo data)
// ──────────────────────────────────────────────────────────────
export const RECENT_CHECKS = [
  { drugs: 'Warfarin + Aspirin', result: 'High Risk', desc: 'Increased bleeding risk', time: '2 hours ago', risk: 'High' },
  { drugs: 'Atorvastatin + Clarithromycin', result: 'Moderate Risk', desc: 'Risk of muscle damage', time: '1 day ago', risk: 'Moderate' },
  { drugs: 'Paracetamol + Ibuprofen', result: 'No Interaction', desc: 'Safe to use together', time: '2 days ago', risk: 'Safe' },
]

// ──────────────────────────────────────────────────────────────
// Articles
// ──────────────────────────────────────────────────────────────
export const ARTICLES = [
  {
    title: 'Understanding Polypharmacy in Elderly Patients',
    tag: 'Education', time: '5 min read',
    summary: 'Why elderly patients take multiple medications and the serious risks when drugs interact in the aging body. Learn what polypharmacy means and when it becomes dangerous.',
  },
  {
    title: '10 Dangerous Drug Combinations to Avoid',
    tag: 'Safety', time: '7 min read',
    summary: 'A comprehensive guide to common dangerous combinations that patients, caregivers, and families should actively avoid. Includes warfarin, aspirin, NSAIDs, and more.',
  },
  {
    title: 'How to Organize Multiple Medications',
    tag: 'Tips', time: '4 min read',
    summary: 'Step-by-step guidance for organizing multiple medications using pill organizers, smartphone reminders, and consistent daily schedules that work for elderly patients.',
  },
  {
    title: 'When to Call Your Doctor About Side Effects',
    tag: 'Advice', time: '3 min read',
    summary: 'Clear guidance on recognizing concerning side effects and knowing exactly when to contact your healthcare provider urgently versus waiting for a scheduled appointment.',
  },
  {
    title: 'Safe Medication Storage at Home',
    tag: 'Safety', time: '3 min read',
    summary: 'Best practices for storing medications safely at home, especially in households with children or elderly family members. Temperature, humidity, and expiry management.',
  },
  {
    title: 'Reading Drug Labels: A Beginner\'s Guide',
    tag: 'Education', time: '6 min read',
    summary: 'A complete guide to understanding prescription drug labels, dosage instructions, and avoiding the most common medication mistakes made by patients and caregivers.',
  },
]

// ──────────────────────────────────────────────────────────────
// FAQs
// ──────────────────────────────────────────────────────────────
export const FAQS = [
  {
    q: 'What is a drug interaction?',
    a: 'A drug interaction occurs when one medication changes how another works in the body. This can make a drug less effective, increase side effects, or cause unexpected new symptoms. Interactions can involve prescription drugs, over-the-counter medicines, herbal supplements, or even certain foods like grapefruit.',
  },
  {
    q: 'Is PolyPharm Guard a substitute for medical advice?',
    a: 'No. PolyPharm Guard is an educational information tool only. It is designed to raise awareness and support conversations with healthcare professionals. Always consult your doctor or pharmacist before making any changes to your medications.',
  },
  {
    q: 'How accurate is the drug interaction checker?',
    a: 'Our database is based on established pharmacological research and clinical guidelines. However, it may not cover every possible interaction. The severity of an interaction can also vary by individual factors such as age, kidney function, genetics, and other medications. Always verify with a licensed professional.',
  },
  {
    q: 'Can I use voice search for medicine names?',
    a: 'Yes! The prescription scanner and drug checker both support voice input on supported devices. Click the microphone icon and speak your medicine names clearly. The system will automatically transcribe and process your input.',
  },
  {
    q: 'Is my health information kept private?',
    a: 'Yes. PolyPharm Guard processes information locally on your device and does not transmit or store personally identifiable health information on external servers. We take patient privacy very seriously and comply with applicable data protection standards.',
  },
  {
    q: 'What do the risk levels (High, Moderate, Safe) mean?',
    a: 'High Risk means the combination can cause serious harm and should be avoided or only used under strict medical supervision. Moderate Risk means there is a known interaction that may require dose adjustment or monitoring. Safe means no clinically significant interaction is known in our database — though this does not guarantee safety for all individuals.',
  },
]

// ──────────────────────────────────────────────────────────────
// Safety Tips
// ──────────────────────────────────────────────────────────────
export const SAFETY_TIPS = [
  'Always inform every doctor and specialist about ALL medications you take, including vitamins, herbal products, and supplements.',
  'Never stop or change medication doses without first consulting your prescribing doctor — even if you feel better.',
  'Store medications in a cool, dry place away from direct sunlight, humidity, and children\'s reach.',
  'Check expiration dates regularly and safely dispose of expired medicines at a pharmacy or authorized drop-off.',
  'Use a weekly pill organizer if you take multiple medications — it prevents missed or double doses effectively.',
  'Keep an updated medication list (name, dose, frequency, prescribing doctor) in your wallet or phone for emergencies.',
  'Never share prescription medications with others, even if their symptoms seem identical to yours.',
  'Take medications at the same time each day to establish a consistent, reliable routine that is easy to remember.',
  'Drink a full glass of water with most oral medications unless instructed otherwise by your doctor.',
  'If you experience any new, unusual, or worsening symptoms after starting a medication, contact your doctor promptly.',
]
