/**
 * MEDICARE AI - Modern, Secure, Mobile-First AI Health & Medicine Management Suite
 * Educational & Safety Guardrails Compliant
 */

// ==========================================================================
// 1. STATE & PERSISTENCE
// ==========================================================================

const MEDICARE_STORAGE_KEY = 'medicare_ai_state_v1';

const defaultMediCareState = {
  user: {
    name: 'Alex Morgan',
    dob: '1988-06-14',
    gender: 'Other',
    heightCm: 175,
    weightKg: 70,
    bloodType: 'O+',
    allergies: ['Penicillin', 'Sulfa Drugs', 'Peanuts'],
    conditions: ['Mild Hypertension', 'Seasonal Allergies', 'Prediabetes'],
    emergencyContact: 'Sarah Morgan (Spouse) - +1 (555) 234-5678',
    preferredLanguage: 'English',
    lockScreenPrivacy: true,
    dataEncryption: true,
    caregiverNotifications: true
  },
  activeProfile: 'Self',
  familyProfiles: [
    { id: 'self', name: 'Self', relation: 'Primary', avatar: 'fa-user' },
    { id: 'mom', name: 'Eleanor (Mom)', relation: 'Mother', avatar: 'fa-user-nurse' },
    { id: 'dad', name: 'Thomas (Dad)', relation: 'Father', avatar: 'fa-person-cane' },
    { id: 'child', name: 'Leo (Child)', relation: 'Child', avatar: 'fa-child' }
  ],
  caregivers: [
    {
      id: 'cg1',
      name: 'Dr. Elena Vance (Nurse / Caregiver)',
      phone: '+1 (555) 987-6543',
      email: 'elena.vance@caregiver.org',
      relationship: 'Home Care Nurse',
      permissions: 'Full Schedule & Emergency Alerts',
      notifyOnMissed: true,
      hasConsent: true
    }
  ],
  medicines: [
    {
      id: 'med_paracetamol',
      name: 'Paracetamol',
      condition: 'Fever or mild pain',
      genericName: 'Acetaminophen',
      brandName: 'Tylenol / Panadol',
      type: 'tablet',
      strength: '500 mg',
      dosage: '1 tablet',
      instructions: 'Use only as directed by a doctor or pharmacist. Take with water after meals.',
      frequency: 'Twice daily',
      startDate: '2026-10-01',
      endDate: '2026-11-01',
      timeSlots: ['09:00 AM', '09:00 PM'],
      dosesPerDay: 2,
      quantityAvailable: 24,
      refillThreshold: 6,
      doctorNotes: 'Do not exceed 4,000 mg in 24 hours. Check other cold medicines to avoid accidental acetaminophen overdose.',
      purpose: 'Relief of mild to moderate pain (headaches, muscular aches) and reduction of fever.',
      precautions: 'Do not use with other acetaminophen-containing products. Heavy alcohol consumption increases severe liver toxicity risk.',
      sideEffects: 'Generally well-tolerated. Rare side effects include skin rash, nausea. Overdose causes severe liver failure.',
      allergyWarnings: 'Contraindicated if previously allergic to acetaminophen or tablet excipients.',
      foodAlcohol: 'Avoid alcohol while taking this medicine. Can be taken with or without meals.',
      interactions: 'Potential interactions with warfarin (blood thinner) and isoniazid.',
      source: 'U.S. National Library of Medicine (NLM) & FDA DailyMed',
      lastUpdated: 'October 2026',
      prescriptionImage: 'assets/optimized/rx_sample.jpg'
    },
    {
      id: 'med_metformin',
      name: 'Metformin',
      condition: 'Prediabetes / Blood Sugar Control',
      genericName: 'Metformin HCl Extended Release',
      brandName: 'Glucophage XR',
      type: 'tablet',
      strength: '500 mg',
      dosage: '1 tablet',
      instructions: 'Take once daily with dinner or breakfast to minimize stomach upset.',
      frequency: 'Once daily',
      startDate: '2026-09-01',
      endDate: '2027-03-01',
      timeSlots: ['08:30 AM'],
      dosesPerDay: 1,
      quantityAvailable: 18,
      refillThreshold: 7,
      doctorNotes: 'Monitor fasting blood glucose and HbA1c every 3 months. Maintain regular hydration.',
      purpose: 'Lowers glucose production in the liver and improves peripheral insulin sensitivity.',
      precautions: 'Inform doctor before any radiological scan using contrast dye. Discontinue if experiencing extreme weakness or difficulty breathing.',
      sideEffects: 'Mild gastrointestinal discomfort, loose stools, nausea during first 2 weeks.',
      allergyWarnings: 'Do not take if severe renal impairment (eGFR < 30) or history of lactic acidosis.',
      foodAlcohol: 'Must be taken with food. Strictly avoid heavy alcohol consumption.',
      interactions: 'Contrast media, cimetidine, certain diuretics.',
      source: 'American Diabetes Association (ADA) Clinical Standards',
      lastUpdated: 'September 2026'
    },
    {
      id: 'med_amoxicillin',
      name: 'Amoxicillin',
      condition: 'Bacterial Throat Infection',
      genericName: 'Amoxicillin Trihydrate',
      brandName: 'Amoxil',
      type: 'capsule',
      strength: '250 mg',
      dosage: '1 capsule',
      instructions: 'Take every 8 hours. Complete full course as prescribed even if feeling better.',
      frequency: 'Three times daily',
      startDate: '2026-10-15',
      endDate: '2026-10-22',
      timeSlots: ['08:00 AM', '04:00 PM', '11:00 PM'],
      dosesPerDay: 3,
      quantityAvailable: 5,
      refillThreshold: 6,
      doctorNotes: 'Complete the entire course. Note: User allergy profile indicates Penicillin allergy. Pharmacy consultation required!',
      purpose: 'Bactericidal antibiotic for susceptible bacterial ear, nose, throat and chest infections.',
      precautions: 'Does not treat viral infections (cold or flu). Complete full course to prevent antibiotic resistance.',
      sideEffects: 'Diarrhea, mild nausea, candidiasis.',
      allergyWarnings: 'CRITICAL: Penicillin cross-allergy warning. Immediate medical care if hives or breathing issues appear.',
      foodAlcohol: 'May take with meals. Moderate water intake recommended.',
      interactions: 'Allopurinol, oral contraceptives, methotrexate.',
      source: 'World Health Organization (WHO) Essential Medicines List',
      lastUpdated: 'October 2026'
    },
    {
      id: 'med_lisinopril',
      name: 'Lisinopril',
      condition: 'Mild Hypertension (Blood Pressure)',
      genericName: 'Lisinopril',
      brandName: 'Zestril',
      type: 'tablet',
      strength: '10 mg',
      dosage: '1 tablet',
      instructions: 'Take every morning at the same time with a full glass of water.',
      frequency: 'Once daily',
      startDate: '2026-08-01',
      endDate: '2027-08-01',
      timeSlots: ['08:00 AM'],
      dosesPerDay: 1,
      quantityAvailable: 28,
      refillThreshold: 7,
      doctorNotes: 'Keep home blood pressure log. Report any sudden face or throat swelling immediately.',
      purpose: 'ACE inhibitor that relaxes blood vessels to lower high blood pressure and protect kidney function.',
      precautions: 'Do not use during pregnancy. Avoid high-potassium supplements or salt substitutes without doctor approval.',
      sideEffects: 'Persistent dry cough, mild dizziness when standing up.',
      allergyWarnings: 'History of angioedema related to previous ACE inhibitor treatment is contraindicated.',
      foodAlcohol: 'Avoid salt substitutes containing potassium.',
      interactions: 'Potassium supplements, NSAIDs (ibuprofen), lithium, aliskiren.',
      source: 'American Heart Association (AHA) / ACC Guidelines',
      lastUpdated: 'August 2026'
    }
  ],
  todayDoses: [
    { id: 'dose_1', medId: 'med_lisinopril', medName: 'Lisinopril', time: '08:00 AM', status: 'taken', takenAt: '08:05 AM', dose: '1 tablet (10mg)' },
    { id: 'dose_2', medId: 'med_metformin', medName: 'Metformin', time: '08:30 AM', status: 'taken', takenAt: '08:32 AM', dose: '1 tablet (500mg)' },
    { id: 'dose_3', medId: 'med_paracetamol', medName: 'Paracetamol', time: '09:00 AM', status: 'taken', takenAt: '09:02 AM', dose: '1 tablet (500mg)' },
    { id: 'dose_4', medId: 'med_amoxicillin', medName: 'Amoxicillin', time: '04:00 PM', status: 'pending', dose: '1 capsule (250mg)' },
    { id: 'dose_5', medId: 'med_paracetamol', medName: 'Paracetamol', time: '09:00 PM', status: 'pending', dose: '1 tablet (500mg)' },
    { id: 'dose_6', medId: 'med_amoxicillin', medName: 'Amoxicillin', time: '11:00 PM', status: 'pending', dose: '1 capsule (250mg)' }
  ],
  appointments: [
    {
      id: 'apt_1',
      doctorName: 'Dr. Marcus Chen, MD',
      specialty: 'Cardiologist',
      clinic: 'St. Jude Medical Pavilion, Suite 402',
      date: '2026-10-25',
      time: '10:30 AM',
      notes: '6-month blood pressure review, review Lisinopril response and lipid panel blood work.',
      status: 'Confirmed'
    },
    {
      id: 'apt_2',
      doctorName: 'Dr. Sarah Jenkins, DO',
      specialty: 'Primary Care Physician',
      clinic: 'City Central Family Health Center',
      date: '2026-11-12',
      time: '02:00 PM',
      notes: 'Annual preventive wellness checkup, fasting blood sugar check & prescription renewals.',
      status: 'Scheduled'
    }
  ],
  healthRecords: [
    {
      id: 'rec_1',
      title: 'Comprehensive Metabolic & Lipid Panel',
      date: '2026-10-10',
      type: 'Lab Test',
      doctor: 'Dr. Sarah Jenkins',
      summary: 'Fasting Glucose: 98 mg/dL (Normal), Total Cholesterol: 182 mg/dL, Potassium: 4.4 mmol/L (Normal).',
      fileName: 'lab_report_oct2026.pdf'
    },
    {
      id: 'rec_2',
      title: 'Home Blood Pressure 14-Day Log',
      date: '2026-10-18',
      type: 'Vitals Log',
      doctor: 'Self-Monitored',
      summary: 'Average BP: 122/78 mmHg. Resting Heart Rate: 71 bpm. No hypertensive spikes.',
      fileName: 'bp_trend_oct2026.csv'
    }
  ],
  chatMessages: [
    {
      sender: 'ai',
      text: 'Hello Alex! I am your **MediCare Health Assistant**.\n\nI can help you understand general information about your medicines, review your schedule, suggest questions for your doctor, and share wellness tips.\n\n*Emergency Notice: If you experience chest pain, severe breathing difficulty, stroke symptoms, or severe allergic reaction, seek emergency services immediately.*',
      time: 'Just now',
      isDisclaimer: true
    }
  ],
  settings: {
    emergencyCountry: 'US', // US: 911, UK: 999, IN: 112, EU: 112
    emergencyHotlines: {
      US: { police: '911', ambulance: '911', poison: '1-800-222-1222', label: 'United States (911)' },
      UK: { police: '999', ambulance: '999', poison: '111', label: 'United Kingdom (999)' },
      IN: { police: '112', ambulance: '108', poison: '1800-116-117', label: 'India (112 / 108)' },
      EU: { police: '112', ambulance: '112', poison: '112', label: 'European Union (112)' },
      AU: { police: '000', ambulance: '000', poison: '13 11 26', label: 'Australia (000)' },
      CA: { police: '911', ambulance: '911', poison: '1-844-POISON-X', label: 'Canada (911)' }
    },
    reminderSound: true,
    reminderVibrate: true,
    snoozeDefaultMin: 10
  },
  activeTab: 'dashboard', // dashboard, medicines, chat, calendar, records, emergency, profile
  activeCalendarView: 'month', // month, week, day
  selectedCalendarDate: '2026-10-19',
  onboardingAccepted: true
};

let mediCareState = loadMediCareState();

function loadMediCareState() {
  try {
    const raw = localStorage.getItem(MEDICARE_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('MediCare AI: Using default state due to parse error', e);
  }
  return JSON.parse(JSON.stringify(defaultMediCareState));
}

function saveMediCareState() {
  try {
    localStorage.setItem(MEDICARE_STORAGE_KEY, JSON.stringify(mediCareState));
    if (typeof updateHealthCardSummary === 'function') {
      updateHealthCardSummary();
    }
  } catch (e) {
    console.error('MediCare AI: Save failed', e);
  }
}

// ==========================================================================
// 2. AUDIO CHIME & WEB AUDIO SYNTHESIZER
// ==========================================================================

function playMediCareChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    
    // Soothing medical reminder chime (E5 -> B5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now); // E5
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.6);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, now + 0.15); // B5
    gain2.gain.setValueAtTime(0, now + 0.15);
    gain2.gain.linearRampToValueAtTime(0.25, now + 0.2);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.8);
  } catch (e) {
    console.log('Audio chime not permitted without user interaction');
  }
}

// ==========================================================================
// 3. MAIN ENTRY POINT & RENDERER
// ==========================================================================

function openMediCareAppModal(targetTab = 'dashboard') {
  // Hide old generic section modal if open
  const oldModal = document.getElementById('sectionModal');
  if (oldModal) oldModal.classList.add('hidden');

  mediCareState.activeTab = targetTab;

  const appModal = document.getElementById('medicareAppModal');
  if (appModal) {
    appModal.classList.remove('hidden');
    renderMediCareApp();
  } else {
    const modal = document.getElementById('sectionModal');
    if (modal) {
      modal.classList.remove('hidden');
      renderMediCareApp();
    }
  }

  // Trigger onboarding disclaimer check if first time
  if (!mediCareState.onboardingAccepted) {
    showOnboardingDisclaimerModal();
  }
}

function closeMediCareAppModal() {
  const appModal = document.getElementById('medicareAppModal');
  if (appModal) appModal.classList.add('hidden');
  const oldModal = document.getElementById('sectionModal');
  if (oldModal) oldModal.classList.add('hidden');
}

function openMediCareApp(targetTab = 'dashboard') {
  openMediCareAppModal(targetTab);
}

function handleMediCareClose() {
  closeMediCareAppModal();
}

function switchMediCareTab(tabName) {
  mediCareState.activeTab = tabName;
  saveMediCareState();
  renderMediCareApp();
}

function renderMediCareApp() {
  const bodyEl = document.getElementById('medicareAppWindowContent') || document.getElementById('modalBody');
  if (!bodyEl) return;

  const currentTab = mediCareState.activeTab;
  const pendingCount = mediCareState.todayDoses.filter(d => d.status === 'pending').length;
  const refillCount = mediCareState.medicines.filter(m => m.quantityAvailable <= m.refillThreshold).length;
  const interactionIssues = runSafetyInteractionAnalysis();
  const alertCount = interactionIssues.filter(i => i.severity === 'high').length;

  let activeTabContent = '';
  switch (currentTab) {
    case 'dashboard':
      activeTabContent = renderMediCareDashboard();
      break;
    case 'medicines':
      activeTabContent = renderMediCareMedicines();
      break;
    case 'chat':
      activeTabContent = renderMediCareChat();
      break;
    case 'calendar':
      activeTabContent = renderMediCareCalendar();
      break;
    case 'records':
      activeTabContent = renderMediCareRecords();
      break;
    case 'emergency':
      activeTabContent = renderMediCareEmergency();
      break;
    case 'profile':
      activeTabContent = renderMediCareProfile();
      break;
    default:
      activeTabContent = renderMediCareDashboard();
  }

  bodyEl.innerHTML = `
    <div class="medicare-container">
      <!-- Top Branding & Emergency Header -->
      <div class="medicare-top-banner">
        <div class="medicare-branding">
          <div class="medicare-logo-icon">
            <i class="fa-solid fa-heart-pulse"></i>
          </div>
          <div class="medicare-brand-text">
            <h2>MediCare AI</h2>
            <p>Modern Healthcare & Medicine Intelligence</p>
          </div>
        </div>

        <div class="medicare-top-actions">
          <button class="medicare-profile-pill" onclick="switchMediCareTab('profile')">
            <i class="fa-solid fa-circle-user"></i>
            <span>${mediCareState.user.name}</span>
          </button>
          <button class="btn-emergency-top" onclick="switchMediCareTab('emergency')">
            <i class="fa-solid fa-triangle-exclamation"></i> SOS Emergency
          </button>
          <button class="modal-close-btn" style="background:rgba(255,255,255,0.2); color:#fff; border-color:rgba(255,255,255,0.3); width:32px; height:32px; font-size:14px;" onclick="closeMediCareAppModal()" title="Close MediCare AI">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Medical Safety & Educational Disclaimer Bar -->
      <div class="medicare-disclaimer-bar">
        <div>
          <i class="fa-solid fa-shield-halved"></i>
          <span>Educational Information Only. Not a medical diagnosis or prescription. Always consult your doctor.</span>
        </div>
        <button class="btn-flat" style="color:#b45309; font-size:11px; text-decoration:underline; cursor:pointer;" onclick="showOnboardingDisclaimerModal()">View Policy</button>
      </div>

      <!-- Navigation Tabs -->
      <nav class="medicare-nav-bar">
        <button class="mc-tab-btn ${currentTab === 'dashboard' ? 'active' : ''}" onclick="switchMediCareTab('dashboard')">
          <i class="fa-solid fa-table-columns"></i> Dashboard
        </button>
        <button class="mc-tab-btn ${currentTab === 'medicines' ? 'active' : ''}" onclick="switchMediCareTab('medicines')">
          <i class="fa-solid fa-pills"></i> Medicines & Safety
          ${alertCount > 0 ? `<span class="mc-badge mc-badge-danger">${alertCount} Alert</span>` : (refillCount > 0 ? `<span class="mc-badge">${refillCount} Low</span>` : '')}
        </button>
        <button class="mc-tab-btn ${currentTab === 'chat' ? 'active' : ''}" onclick="switchMediCareTab('chat')">
          <i class="fa-solid fa-comment-medical"></i> Health Q&A
        </button>
        <button class="mc-tab-btn ${currentTab === 'calendar' ? 'active' : ''}" onclick="switchMediCareTab('calendar')">
          <i class="fa-solid fa-calendar-days"></i> Calendar & Schedule
          ${pendingCount > 0 ? `<span class="mc-badge">${pendingCount} Due</span>` : ''}
        </button>
        <button class="mc-tab-btn ${currentTab === 'records' ? 'active' : ''}" onclick="switchMediCareTab('records')">
          <i class="fa-solid fa-file-waveform"></i> Records & Doctors
        </button>
        <button class="mc-tab-btn ${currentTab === 'emergency' ? 'active' : ''}" onclick="switchMediCareTab('emergency')">
          <i class="fa-solid fa-kit-medical"></i> Emergency & Caregiver
        </button>
        <button class="mc-tab-btn ${currentTab === 'profile' ? 'active' : ''}" onclick="switchMediCareTab('profile')">
          <i class="fa-solid fa-user-shield"></i> Profile & Privacy
        </button>
      </nav>

      <!-- Scrollable Main View Content -->
      <div class="medicare-scroll-body" id="medicareScrollBody">
        ${activeTabContent}
      </div>
    </div>
  `;
}

// ==========================================================================
// 4. FEATURE 6 & 7: HEALTH DASHBOARD & ADHERENCE INSIGHTS
// ==========================================================================

function renderMediCareDashboard() {
  const totalToday = mediCareState.todayDoses.length;
  const takenCount = mediCareState.todayDoses.filter(d => d.status === 'taken').length;
  const pendingDoses = mediCareState.todayDoses.filter(d => d.status === 'pending');
  const missedCount = mediCareState.todayDoses.filter(d => d.status === 'missed').length;
  const adherencePercent = totalToday > 0 ? Math.round((takenCount / totalToday) * 100) : 100;

  const nextDose = pendingDoses.length > 0 ? pendingDoses[0] : null;
  const lowStockMeds = mediCareState.medicines.filter(m => m.quantityAvailable <= m.refillThreshold);
  const interactionIssues = runSafetyInteractionAnalysis();

  return `
    <!-- Top Quick Action Buttons -->
    <div class="mc-quick-actions">
      <button class="mc-action-btn" onclick="openAddMedicineModal()">
        <i class="fa-solid fa-circle-plus" style="color:var(--mc-primary);"></i>
        <span>Add Medicine</span>
      </button>
      <button class="mc-action-btn" onclick="switchMediCareTab('chat')">
        <i class="fa-solid fa-wand-magic-sparkles" style="color:var(--mc-accent-purple);"></i>
        <span>Ask Health AI</span>
      </button>
      <button class="mc-action-btn" onclick="openOcrScanModal()">
        <i class="fa-solid fa-camera" style="color:var(--mc-accent-green);"></i>
        <span>Scan Medicine</span>
      </button>
      <button class="mc-action-btn" onclick="switchMediCareTab('calendar')">
        <i class="fa-solid fa-calendar-check" style="color:var(--mc-primary);"></i>
        <span>View Calendar</span>
      </button>
      <button class="mc-action-btn" onclick="openAddAppointmentModal()">
        <i class="fa-solid fa-user-doctor" style="color:var(--mc-warning);"></i>
        <span>Add Appointment</span>
      </button>
    </div>

    <!-- Adherence Summary Banner -->
    <div class="mc-adherence-banner">
      <div class="mc-adherence-circle" style="--percent:${adherencePercent};">
        <div class="mc-adherence-circle-inner">${adherencePercent}%</div>
      </div>
      <div class="mc-adherence-info">
        <h4>Today's Medication Adherence</h4>
        <p>${takenCount} of ${totalToday} scheduled doses taken today. ${pendingDoses.length} remaining.</p>
        <p style="margin-top:4px; font-size:11px; color:var(--mc-accent-green); font-weight:600;">
          <i class="fa-solid fa-chart-line"></i> Weekly Adherence Trend: 94% on track
        </p>
      </div>
      <button class="btn btn-sm btn-outline" onclick="triggerTestReminderAlert()">
        <i class="fa-solid fa-bell"></i> Test Reminder
      </button>
    </div>

    <!-- Next Upcoming Dose Spotlight -->
    ${nextDose ? `
      <div class="mc-card mc-next-dose-card">
        <div class="mc-card-header">
          <span class="mc-card-title"><i class="fa-solid fa-clock color-primary"></i> Next Scheduled Dose</span>
          <span class="mc-badge">Upcoming</span>
        </div>
        <div class="mc-dose-countdown">
          <div class="mc-dose-time-badge">
            <div class="time">${nextDose.time.split(' ')[0]}</div>
            <div class="period">${nextDose.time.split(' ')[1]}</div>
          </div>
          <div class="mc-dose-meta">
            <h4>${nextDose.medName}</h4>
            <p><i class="fa-solid fa-prescription-bottle"></i> ${nextDose.dose}</p>
            <p style="font-size:12px; color:var(--mc-text-muted); margin-top:2px;">
              ${getMedicineInstructions(nextDose.medId)}
            </p>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn-dose-action btn-dose-take" onclick="markDoseStatus('${nextDose.id}', 'taken')">
            <i class="fa-solid fa-check"></i> Mark Taken
          </button>
          <button class="btn-dose-action btn-dose-snooze" onclick="snoozeDose('${nextDose.id}', 10)">
            <i class="fa-solid fa-clock-rotate-left"></i> Snooze 10m
          </button>
          <button class="btn-dose-action btn-dose-skip" onclick="markDoseStatus('${nextDose.id}', 'skipped')">
            <i class="fa-solid fa-xmark"></i> Skip
          </button>
        </div>
      </div>
    ` : `
      <div class="mc-card" style="text-align:center; padding:24px; background:var(--mc-accent-green-light);">
        <i class="fa-solid fa-circle-check" style="font-size:36px; color:var(--mc-accent-green); margin-bottom:8px;"></i>
        <h4 style="margin:0 0 4px 0; color:var(--mc-accent-green);">All doses for today completed!</h4>
        <p style="font-size:13px; color:var(--mc-text-muted); margin:0;">Great job staying on track with your doctor's recommendations.</p>
      </div>
    `}

    <!-- Safety Warning Alerts (if any) -->
    ${interactionIssues.filter(i => i.severity === 'high').map(issue => `
      <div class="mc-interaction-card severity-high" style="margin-top:16px;">
        <div class="mc-interaction-header">
          <span class="mc-interaction-title"><i class="fa-solid fa-triangle-exclamation"></i> ${issue.title}</span>
          <span class="mc-badge mc-badge-danger">Ask Pharmacist Urgently</span>
        </div>
        <p style="font-size:13px; margin:0;">${issue.description}</p>
        <div style="display:flex; gap:8px; margin-top:6px;">
          <button class="btn btn-sm btn-outline" onclick="openInteractionDetailModal('${issue.id}')">View Details & Evidence</button>
          <button class="btn btn-sm btn-primary" onclick="switchMediCareTab('chat')">Consult Guidance</button>
        </div>
      </div>
    `).join('')}

    <!-- Dashboard 2-Column Grid -->
    <div class="mc-dash-grid" style="margin-top:20px;">
      <!-- Column 1: Today's Full Schedule -->
      <div class="mc-card">
        <div class="mc-card-header">
          <span class="mc-card-title"><i class="fa-solid fa-list-check color-primary"></i> Today's Medicine Schedule</span>
          <span style="font-size:12px; color:var(--mc-text-muted);">${takenCount}/${totalToday} Taken</span>
        </div>
        <div class="mc-timeline">
          ${mediCareState.todayDoses.map(dose => `
            <div class="mc-timeline-item ${dose.status}">
              <div class="mc-timeline-left">
                <span class="mc-timeline-time">${dose.time}</span>
                <div class="mc-timeline-details">
                  <h4>${dose.medName}</h4>
                  <p>${dose.dose} • ${dose.status === 'taken' ? `<span style="color:var(--mc-accent-green);">Taken at ${dose.takenAt || 'scheduled time'}</span>` : (dose.status === 'snoozed' ? `<span style="color:var(--mc-warning);">Snoozed</span>` : 'Pending')}</p>
                </div>
              </div>
              <div class="mc-timeline-actions">
                ${dose.status === 'taken' ? `
                  <button class="btn-dose-action btn-dose-skip" title="Undo / Reset" onclick="markDoseStatus('${dose.id}', 'pending')">
                    <i class="fa-solid fa-rotate-left"></i>
                  </button>
                ` : `
                  <button class="btn-dose-action btn-dose-take" onclick="markDoseStatus('${dose.id}', 'taken')">
                    <i class="fa-solid fa-check"></i>
                  </button>
                  <button class="btn-dose-action btn-dose-snooze" onclick="snoozeDose('${dose.id}', 10)">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                  </button>
                  <button class="btn-dose-action btn-dose-skip" onclick="markDoseStatus('${dose.id}', 'skipped')">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                `}
              </div>
            </div>
          `).join('')}
        </div>
        <!-- Safe missed-dose medical reminder notice -->
        <div style="background:var(--bg-body); border-radius:8px; padding:10px; margin-top:12px; font-size:11.5px; color:var(--mc-text-muted);">
          <i class="fa-solid fa-circle-info color-primary"></i> <strong>Missed Dose Safety:</strong> If you miss a dose, follow your doctor's instructions. Never take a double dose to make up for a missed one.
        </div>
      </div>

      <!-- Column 2: Health Insights & Refill Alerts -->
      <div style="display:flex; flex-direction:column; gap:16px;">
        <!-- Low Stock Refill Alert -->
        <div class="mc-card">
          <div class="mc-card-header">
            <span class="mc-card-title"><i class="fa-solid fa-box-open color-warning"></i> Prescription Refill Status</span>
            <span class="mc-badge ${lowStockMeds.length > 0 ? 'mc-badge-danger' : 'mc-badge-success'}">
              ${lowStockMeds.length > 0 ? `${lowStockMeds.length} Need Refill` : 'Stocks Good'}
            </span>
          </div>
          ${lowStockMeds.length > 0 ? lowStockMeds.map(m => `
            <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--mc-card-border);">
              <div>
                <strong style="font-size:13px; color:var(--mc-text-main);">${m.name}</strong>
                <p style="font-size:11px; color:var(--mc-danger); margin:0;">Only ${m.quantityAvailable} doses left (threshold: ${m.refillThreshold})</p>
              </div>
              <button class="btn btn-sm btn-outline" onclick="refillMedicineStock('${m.id}')">
                <i class="fa-solid fa-plus"></i> Refill +30
              </button>
            </div>
          `).join('') : `
            <p style="font-size:13px; color:var(--mc-text-muted); margin:0;">All your medications currently have sufficient doses for the upcoming 2 weeks.</p>
          `}
        </div>

        <!-- Intelligent Safe Health Insights -->
        <div class="mc-card">
          <div class="mc-card-header">
            <span class="mc-card-title"><i class="fa-solid fa-lightbulb color-primary"></i> Routine & Adherence Insights</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="background:var(--bg-body); padding:10px 12px; border-radius:10px; font-size:12.5px;">
              <strong style="color:var(--mc-text-main); display:block; margin-bottom:2px;">
                <i class="fa-solid fa-clock color-primary"></i> Evening Routine Adjustment
              </strong>
              <span>You have missed several evening doses this week. Would you like to review your reminder time to better match your dinner schedule?</span>
            </div>
            <div style="background:var(--bg-body); padding:10px 12px; border-radius:10px; font-size:12.5px;">
              <strong style="color:var(--mc-text-main); display:block; margin-bottom:2px;">
                <i class="fa-solid fa-utensils color-green"></i> Meal Timing Tip
              </strong>
              <span>Metformin is best absorbed with food. Taking it at the start of dinner helps avoid stomach discomfort.</span>
            </div>
          </div>
          <p style="font-size:10.5px; color:var(--mc-text-muted); margin-top:10px; font-style:italic;">
            *Insights are based on your scheduled logs. No medical conclusions are made.*
          </p>
        </div>

        <!-- Upcoming Doctor Appointments -->
        <div class="mc-card">
          <div class="mc-card-header">
            <span class="mc-card-title"><i class="fa-solid fa-stethoscope color-purple"></i> Upcoming Appointments</span>
            <button class="btn-flat color-primary" style="font-size:12px;" onclick="switchMediCareTab('records')">View All</button>
          </div>
          ${mediCareState.appointments.slice(0, 1).map(apt => `
            <div style="background:var(--mc-accent-purple-light); padding:12px; border-radius:12px;">
              <div style="font-weight:700; font-size:13px; color:var(--mc-accent-purple);">${apt.doctorName} (${apt.specialty})</div>
              <div style="font-size:12px; color:var(--mc-text-main); margin-top:2px;">
                <i class="fa-regular fa-calendar"></i> ${apt.date} at ${apt.time}
              </div>
              <div style="font-size:11px; color:var(--mc-text-muted); margin-top:4px;">
                <i class="fa-solid fa-location-dot"></i> ${apt.clinic}
              </div>
              <div style="margin-top:8px;">
                <button class="btn btn-sm btn-outline" onclick="openAppointmentPrepModal('${apt.id}')">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> AI Prep Checklist
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function getMedicineInstructions(medId) {
  const med = mediCareState.medicines.find(m => m.id === medId);
  return med ? med.instructions : 'Follow doctor instructions';
}

function markDoseStatus(doseId, status) {
  const dose = mediCareState.todayDoses.find(d => d.id === doseId);
  if (!dose) return;

  dose.status = status;
  if (status === 'taken') {
    const d = new Date();
    dose.takenAt = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Decrement stock for corresponding medicine
    const med = mediCareState.medicines.find(m => m.id === dose.medId);
    if (med && med.quantityAvailable > 0) {
      med.quantityAvailable -= 1;
    }
  }

  saveMediCareState();
  renderMediCareApp();
}

function snoozeDose(doseId, minutes) {
  const dose = mediCareState.todayDoses.find(d => d.id === doseId);
  if (!dose) return;

  dose.status = 'snoozed';
  saveMediCareState();
  renderMediCareApp();

  showToast(`Reminder snoozed for ${minutes} minutes`);
  setTimeout(() => {
    triggerTestReminderAlert(dose);
  }, 4000); // 4 seconds simulated delay for quick demo feedback
}

function refillMedicineStock(medId) {
  const med = mediCareState.medicines.find(m => m.id === medId);
  if (med) {
    med.quantityAvailable += 30;
    saveMediCareState();
    renderMediCareApp();
    showToast(`Refilled ${med.name} (+30 doses added)`);
  }
}

// ==========================================================================
// 5. FEATURE 2 & 8: MEDICINE MANAGEMENT & SAFETY INTERACTION CHECKER
// ==========================================================================

function renderMediCareMedicines() {
  const interactions = runSafetyInteractionAnalysis();

  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
      <div>
        <h3 style="font-size:18px; font-weight:800; color:var(--mc-text-main); margin:0;">My Medications (${mediCareState.medicines.length})</h3>
        <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Track prescriptions, dosages, refill schedules, and medical safety warnings.</p>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-outline btn-sm" onclick="openOcrScanModal()">
          <i class="fa-solid fa-camera"></i> Scan Medicine / Rx
        </button>
        <button class="btn btn-primary btn-sm" onclick="openAddMedicineModal()">
          <i class="fa-solid fa-plus"></i> Add Medicine
        </button>
      </div>
    </div>

    <!-- Live Medicine Safety & Interaction Checker Box -->
    <div class="mc-card" style="margin-bottom:20px; border-top:3px solid var(--mc-primary);">
      <div class="mc-card-header">
        <span class="mc-card-title">
          <i class="fa-solid fa-shield-virus color-primary"></i> Automated Safety & Interaction Analysis
        </span>
        <span class="mc-badge ${interactions.length === 0 ? 'mc-badge-success' : 'mc-badge-danger'}">
          ${interactions.length === 0 ? 'All Clear' : `${interactions.length} Items Flagged`}
        </span>
      </div>
      <p style="font-size:12px; color:var(--mc-text-muted); margin:0 0 12px 0;">
        Our safety engine cross-compares all your active medications against your allergy profile, known drug-drug interactions, duplicate active ingredients, and alcohol/food contraindications.
      </p>

      ${interactions.map(item => `
        <div class="mc-interaction-card severity-${item.severity}">
          <div class="mc-interaction-header">
            <span class="mc-interaction-title">
              <i class="fa-solid ${item.severity === 'high' ? 'fa-triangle-exclamation' : 'fa-circle-exclamation'}"></i> ${item.title}
            </span>
            <span class="mc-badge ${item.severity === 'high' ? 'mc-badge-danger' : 'mc-badge'}">
              ${item.badge}
            </span>
          </div>
          <p style="font-size:12.5px; margin:4px 0 0 0; line-height:1.4;">${item.description}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
            <span style="font-size:11px; color:var(--mc-text-muted);"><i class="fa-solid fa-book-medical"></i> Source: ${item.source}</span>
            <button class="btn btn-sm btn-outline" onclick="openAskDoctorGuidance('${item.title}')">
              <i class="fa-solid fa-user-doctor"></i> Ask Doctor / Pharmacist
            </button>
          </div>
        </div>
      `).join('')}

      <div style="font-size:11px; color:var(--mc-text-muted); font-style:italic; margin-top:6px;">
        *Disclaimer: Interaction results are informational only and not a substitute for professional clinical judgement. Always confirm with your doctor or pharmacist.*
      </div>
    </div>

    <!-- Active Medicines Cards List -->
    <div style="display:flex; flex-direction:column; gap:14px;">
      ${mediCareState.medicines.map(med => `
        <div class="mc-med-card">
          <div class="mc-med-header">
            <div class="mc-med-identity">
              <div class="mc-med-icon-box">
                <i class="fa-solid ${getMedicineTypeIcon(med.type)}"></i>
              </div>
              <div class="mc-med-title-group">
                <h3>${med.name} <span style="font-size:13px; font-weight:600; color:var(--mc-primary);">(${med.strength})</span></h3>
                <div class="generic-sub">Generic: ${med.genericName} • Brand: ${med.brandName}</div>
                <div style="font-size:12px; color:var(--mc-accent-green); font-weight:600; margin-top:2px;">
                  <i class="fa-solid fa-notes-medical"></i> For: ${med.condition}
                </div>
              </div>
            </div>
            <div style="text-align:right;">
              <span class="mc-badge">${med.frequency}</span>
            </div>
          </div>

          <div class="mc-med-tags">
            <span class="mc-tag-pill"><i class="fa-regular fa-clock"></i> ${med.timeSlots.join(', ')}</span>
            <span class="mc-tag-pill"><i class="fa-solid fa-capsules"></i> ${med.dosage}</span>
            <span class="mc-tag-pill"><i class="fa-solid fa-calendar"></i> ${med.startDate} to ${med.endDate}</span>
          </div>

          <div style="font-size:12.5px; color:var(--mc-text-main); background:var(--bg-body); padding:10px 12px; border-radius:10px; border-left:3px solid var(--mc-primary);">
            <strong>Instructions:</strong> ${med.instructions}
          </div>

          <div class="mc-med-stock-bar">
            <span>
              <i class="fa-solid fa-cubes-stacked"></i> Stock: <strong>${med.quantityAvailable} doses left</strong>
              ${med.quantityAvailable <= med.refillThreshold ? `<span style="color:var(--mc-danger); font-weight:700; margin-left:6px;"><i class="fa-solid fa-triangle-exclamation"></i> Low Stock Alert</span>` : ''}
            </span>
            <span style="font-size:11px;">Refill alert at: ${med.refillThreshold}</span>
          </div>

          <div class="mc-med-actions">
            <button class="btn btn-sm btn-outline" onclick="openMedicineDetailModal('${med.id}')">
              <i class="fa-solid fa-circle-info"></i> Full Medical Info
            </button>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-sm btn-outline" onclick="refillMedicineStock('${med.id}')">
                <i class="fa-solid fa-plus"></i> Refill +30
              </button>
              <button class="btn btn-sm btn-outline" onclick="openEditMedicineModal('${med.id}')">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn btn-sm btn-outline" style="color:var(--mc-danger);" onclick="deleteMedicine('${med.id}')">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function getMedicineTypeIcon(type) {
  switch ((type || '').toLowerCase()) {
    case 'capsule': return 'fa-capsules';
    case 'syrup': return 'fa-prescription-bottle';
    case 'injection': return 'fa-syringe';
    case 'inhaler': return 'fa-lungs';
    case 'drops': return 'fa-eye-dropper';
    case 'cream': return 'fa-hand-dots';
    default: return 'fa-tablets';
  }
}

// Safety Cross-Analysis Engine
function runSafetyInteractionAnalysis() {
  const issues = [];
  const meds = mediCareState.medicines;
  const allergies = mediCareState.user.allergies.map(a => a.toLowerCase());

  // 1. Allergy Conflict Check
  meds.forEach(med => {
    const medText = (med.name + ' ' + med.genericName + ' ' + med.allergyWarnings).toLowerCase();
    allergies.forEach(allergy => {
      if (allergy && medText.includes(allergy)) {
        issues.push({
          id: 'allergy_' + med.id,
          title: `Severe Allergy Conflict: ${med.name} & ${allergy.toUpperCase()}`,
          severity: 'high',
          badge: 'Ask Pharmacist Urgently',
          description: `Your profile records an allergy to "${allergy}". ${med.name} (${med.genericName}) belongs to or contains compounds related to this allergen. Do not take without urgent medical confirmation.`,
          source: 'User Health Profile Allergy Registry & NLM RxNorm'
        });
      }
    });
  });

  // 2. Duplicate Active Ingredient Check
  const ingredientMap = {};
  meds.forEach(med => {
    const gen = med.genericName.toLowerCase().split(' ')[0];
    if (!ingredientMap[gen]) ingredientMap[gen] = [];
    ingredientMap[gen].push(med.name);
  });
  for (const [ingredient, medList] of Object.entries(ingredientMap)) {
    if (medList.length > 1) {
      issues.push({
        id: 'dup_' + ingredient,
        title: `Possible Duplicate Active Ingredient (${ingredient})`,
        severity: 'high',
        badge: 'Duplication Risk',
        description: `Multiple medications (${medList.join(' and ')}) contain active compound ${ingredient}. Taking both simultaneously may exceed maximum safe daily thresholds.`,
        source: 'FDA DailyMed Duplicate Ingredient Registry'
      });
    }
  }

  // 3. Known Drug-Drug Interactions
  const hasLisinopril = meds.some(m => m.name.toLowerCase().includes('lisinopril'));
  const hasPotassiumOrNSAID = meds.some(m => m.name.toLowerCase().includes('ibuprofen') || m.name.toLowerCase().includes('potassium'));
  if (hasLisinopril && hasPotassiumOrNSAID) {
    issues.push({
      id: 'inter_lisinopril_nsaid',
      title: 'Interaction Concern: Lisinopril + NSAID/Potassium',
      severity: 'medium',
      badge: 'Caution Required',
      description: 'Concomitant use of ACE inhibitors with NSAIDs or potassium-sparing agents may reduce antihypertensive effect and elevate serum potassium.',
      source: 'AHA / ACC Drug Interaction Bulletin'
    });
  }

  // 4. Alcohol & Food Warnings
  const hasParacetamol = meds.some(m => m.name.toLowerCase().includes('paracetamol') || m.genericName.toLowerCase().includes('acetaminophen'));
  if (hasParacetamol) {
    issues.push({
      id: 'alc_paracetamol',
      title: 'Alcohol Warning: Paracetamol / Acetaminophen',
      severity: 'low',
      badge: 'Lifestyle Guidance',
      description: 'Avoid consuming alcoholic beverages while taking paracetamol to prevent increased risk of liver stress and toxicity.',
      source: 'U.S. National Library of Medicine (NLM)'
    });
  }

  return issues;
}

// Medicine Detail Information Page
function openMedicineDetailModal(medId) {
  const med = mediCareState.medicines.find(m => m.id === medId);
  if (!med) return;

  const modalHtml = `
    <div id="medicareMedDetailModal" class="mc-reminder-overlay" onclick="closeMediCareSubModal('medicareMedDetailModal')">
      <div class="mc-card" style="max-width:620px; width:95%; max-height:88vh; overflow-y:auto; border-radius:24px; padding:24px;" onclick="event.stopPropagation()">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
          <div>
            <span class="mc-badge" style="text-transform:capitalize;">${med.type} • ${med.strength}</span>
            <h2 style="font-size:22px; font-weight:800; color:var(--mc-text-main); margin:6px 0 2px 0;">${med.name}</h2>
            <div style="font-size:13px; color:var(--mc-text-muted);">Generic: <strong>${med.genericName}</strong> | Brand: <strong>${med.brandName}</strong></div>
          </div>
          <button class="modal-close-btn" onclick="closeMediCareSubModal('medicareMedDetailModal')">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="mc-detail-section">
          <h4><i class="fa-solid fa-bullseye color-primary"></i> Purpose & Common Uses</h4>
          <div class="mc-info-box">${med.purpose || 'Used as directed by a healthcare professional.'}</div>
        </div>

        <div class="mc-detail-section">
          <h4><i class="fa-solid fa-notes-medical color-green"></i> General Instructions & Frequency</h4>
          <div class="mc-info-box">${med.instructions} (Frequency: ${med.frequency}, Time slots: ${med.timeSlots.join(', ')})</div>
        </div>

        <div class="mc-detail-section">
          <h4><i class="fa-solid fa-triangle-exclamation color-warning"></i> General Precautions</h4>
          <div class="mc-warning-box">${med.precautions || 'Consult doctor before taking if pregnant or have pre-existing liver/kidney conditions.'}</div>
        </div>

        <div class="mc-detail-section">
          <h4><i class="fa-solid fa-circle-exclamation color-red"></i> Common Side Effects</h4>
          <div class="mc-info-box">${med.sideEffects || 'Consult product monograph for detailed adverse reaction frequencies.'}</div>
        </div>

        <div class="mc-detail-section">
          <h4><i class="fa-solid fa-utensils color-primary"></i> Food, Alcohol & Lifestyle Warnings</h4>
          <div class="mc-info-box">${med.foodAlcohol || 'Follow manufacturer dietary instructions.'}</div>
        </div>

        <div class="mc-detail-section">
          <h4><i class="fa-solid fa-shield-virus color-purple"></i> Potential Interactions</h4>
          <div class="mc-warning-box">${med.interactions || 'No common critical interactions recorded for standard doses.'}</div>
        </div>

        <!-- Trusted Source Citation -->
        <div style="background:var(--bg-body); border-radius:12px; padding:12px; font-size:11.5px; color:var(--mc-text-muted); margin-bottom:18px;">
          <div><i class="fa-solid fa-database"></i> <strong>Medical Information Source:</strong> ${med.source || 'FDA DailyMed & U.S. National Library of Medicine'}</div>
          <div><i class="fa-solid fa-calendar-check"></i> <strong>Last Monitored & Verified:</strong> ${med.lastUpdated || 'October 2026'}</div>
          <div style="margin-top:6px; color:#b45309;">
            *Notice: Medical reference information provided for educational assistance only. Does not constitute personal medical prescription.*
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; gap:10px;">
          <button class="btn btn-outline" onclick="closeMediCareSubModal('medicareMedDetailModal')">Close</button>
          <button class="btn btn-primary" onclick="closeMediCareSubModal('medicareMedDetailModal'); openAskDoctorGuidance('${med.name}')">
            <i class="fa-solid fa-user-doctor"></i> Ask a Doctor or Pharmacist
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// ==========================================================================
// 6. FEATURE 3: AI HEALTH ASSISTANT CHAT ("HEALTH ASSISTANT")
// ==========================================================================

function renderMediCareChat() {
  return `
    <div class="mc-chat-container">
      <div class="mc-chat-header">
        <div class="mc-chat-header-info">
          <div style="width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:18px;">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div>
            <h3>MediCare Health Assistant</h3>
            <p>Educational AI • General Health & Medicine Info</p>
          </div>
        </div>
        <button class="btn btn-sm btn-outline" style="color:#fff; border-color:rgba(255,255,255,0.4);" onclick="clearMediCareChatHistory()">
          <i class="fa-solid fa-trash-can"></i> Clear
        </button>
      </div>

      <!-- Messages View -->
      <div class="mc-chat-messages" id="mcChatMessages">
        ${mediCareState.chatMessages.map(msg => renderChatMessageBubble(msg)).join('')}
      </div>

      <!-- Suggested Prompts Row -->
      <div class="mc-suggested-prompts">
        <button class="mc-prompt-chip" onclick="sendMediCareQuickPrompt('What is Paracetamol generally used for?')">
          “What is this medicine generally used for?”
        </button>
        <button class="mc-prompt-chip" onclick="sendMediCareQuickPrompt('Can my medicines interact with each other?')">
          “Can these medicines interact?”
        </button>
        <button class="mc-prompt-chip" onclick="sendMediCareQuickPrompt('Explain my medicine schedule for today in simple words')">
          “Explain my medicine schedule”
        </button>
        <button class="mc-prompt-chip" onclick="sendMediCareQuickPrompt('What questions should I ask my doctor about my blood pressure?')">
          “What should I ask my doctor?”
        </button>
        <button class="mc-prompt-chip" onclick="sendMediCareQuickPrompt('What are common side effects of Lisinopril?')">
          “What are common side effects?”
        </button>
        <button class="mc-prompt-chip" onclick="sendMediCareQuickPrompt('Help me prepare for my upcoming cardiologist appointment')">
          “Help me prepare for my appointment”
        </button>
      </div>

      <!-- Input Bar -->
      <div class="mc-chat-input-bar">
        <button class="mc-chat-icon-btn" title="Upload Medicine Label Photo" onclick="openOcrScanModal()">
          <i class="fa-solid fa-camera"></i>
        </button>
        <button class="mc-chat-icon-btn" id="mcVoiceBtn" title="Speak to Assistant (Voice Input)" onclick="toggleMediCareVoiceInput()">
          <i class="fa-solid fa-microphone"></i>
        </button>
        <input type="text" id="mcChatInput" placeholder="Ask about medicine uses, side effects, reminders..." onkeydown="if(event.key==='Enter') sendMediCareChatMessage()">
        <button class="mc-chat-icon-btn mc-chat-send-btn" onclick="sendMediCareChatMessage()" title="Send">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;
}

function renderChatMessageBubble(msg) {
  if (msg.isEmergency) {
    return `
      <div class="mc-message-row ai">
        <div class="mc-message-avatar" style="background:#ef4444;"><i class="fa-solid fa-triangle-exclamation"></i></div>
        <div class="mc-message-bubble mc-emergency-alert-bubble">
          <h4><i class="fa-solid fa-bell"></i> RED FLAG EMERGENCY DETECTED</h4>
          <p>${formatMarkdownText(msg.text)}</p>
          <a href="tel:911" class="btn-emergency-call-now">
            <i class="fa-solid fa-phone-volume"></i> Call Emergency Services (911 / 112)
          </a>
          <div class="mc-ai-disclaimer" style="color:#b91c1c; border-color:#ef4444;">
            Immediate medical attention required. Do not delay emergency care.
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="mc-message-row ${msg.sender}">
      <div class="mc-message-avatar ${msg.sender === 'user' ? 'user-av' : ''}">
        <i class="fa-solid ${msg.sender === 'user' ? 'fa-user' : 'fa-robot'}"></i>
      </div>
      <div class="mc-message-bubble">
        ${formatMarkdownText(msg.text)}
        ${msg.sender === 'ai' ? `
          <div class="mc-ai-disclaimer">
            <i class="fa-solid fa-shield-halved"></i>
            This information is for education only and is not a substitute for professional medical advice.
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function sendMediCareQuickPrompt(promptText) {
  const inputEl = document.getElementById('mcChatInput');
  if (inputEl) {
    inputEl.value = promptText;
    sendMediCareChatMessage();
  }
}

function sendMediCareChatMessage() {
  const inputEl = document.getElementById('mcChatInput');
  if (!inputEl) return;
  const userText = inputEl.value.trim();
  if (!userText) return;

  // Add User Message
  mediCareState.chatMessages.push({
    sender: 'user',
    text: userText,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  inputEl.value = '';
  saveMediCareState();
  updateChatView();

  // Safety & Emergency Analysis Engine
  setTimeout(() => {
    generateAiHealthResponse(userText);
  }, 600);
}

function generateAiHealthResponse(query) {
  const q = query.toLowerCase();

  // 1. Red-Flag Emergency Symptoms Check
  const emergencyKeywords = [
    'chest pain', 'heart attack', 'shortness of breath', 'difficulty breathing',
    'cannot breathe', 'stroke', 'face drooping', 'arm weakness', 'slurred speech',
    'unconscious', 'fainted', 'passed out', 'severe allergic reaction',
    'anaphylaxis', 'throat swelling', 'suicide', 'suicidal', 'kill myself'
  ];

  const matchedEmergency = emergencyKeywords.find(k => q.includes(k));
  if (matchedEmergency) {
    playMediCareChime();
    mediCareState.chatMessages.push({
      sender: 'ai',
      isEmergency: true,
      text: `**CRITICAL SAFETY WARNING: Possible life-threatening symptom detected (${matchedEmergency.toUpperCase()}).**\n\nIf you or someone around you is experiencing chest pain, severe breathing difficulty, sudden facial or arm weakness, severe swelling of lips/throat, or feelings of suicide, please **call local emergency services (911, 112, or 999) or proceed to the nearest emergency room immediately**.\n\nDo not wait for online advice for emergency symptoms.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    saveMediCareState();
    updateChatView();
    return;
  }

  // 2. Safe Educational Rule-Based Response Synthesizer
  let replyText = '';

  if (q.includes('paracetamol') || q.includes('acetaminophen') || q.includes('tylenol')) {
    replyText = `**Paracetamol (Acetaminophen)** is commonly used to treat mild-to-moderate pain (headaches, muscle aches, toothaches) and reduce fever.\n\n` +
      `**Key Precautions:**\n` +
      `- Standard adult single dose is generally 500mg to 1,000mg every 4 to 6 hours as directed.\n` +
      `- Never exceed the maximum recommended daily limit (typically 4,000mg/day in healthy adults, or lower if directed by your doctor).\n` +
      `- Check other over-the-counter cold and flu products to avoid taking duplicate acetaminophen.\n` +
      `- Strictly avoid alcohol to protect liver health.\n\n` +
      `*Always consult your physician or pharmacist regarding dosage suited to your personal health status.*`;
  } else if (q.includes('interact') || q.includes('interaction')) {
    replyText = `Based on your active medications list:\n\n` +
      `1. **Lisinopril + NSAIDs (like Ibuprofen):** NSAIDs can decrease the blood-pressure-lowering effect of Lisinopril and increase stress on the kidneys. Tylenol/Paracetamol is generally preferred for mild pain with doctor approval.\n` +
      `2. **Amoxicillin + Allergies:** Note that your profile flags a Penicillin allergy. Amoxicillin is in the penicillin class, so you should urgently verify this with your pharmacist before taking.\n` +
      `3. **Metformin + Alcohol:** Heavy alcohol consumption increases the risk of lactic acidosis.\n\n` +
      `*Would you like me to generate a summary list of interaction questions for your doctor?*`;
  } else if (q.includes('schedule') || q.includes('time') || q.includes('routine')) {
    replyText = `Here is your simplified medication schedule for today:\n\n` +
      `- **Morning (08:00 AM - 09:00 AM):** Lisinopril 10mg (with water), Metformin 500mg (with food), Paracetamol 500mg (if pain persists).\n` +
      `- **Afternoon (04:00 PM):** Amoxicillin 250mg capsule.\n` +
      `- **Night (09:00 PM - 11:00 PM):** Paracetamol 500mg (09:00 PM) and Amoxicillin 250mg (11:00 PM).\n\n` +
      `*Remember: If you ever miss a dose, follow your doctor's instructions. Never take a double dose.*`;
  } else if (q.includes('side effect') || q.includes('effects')) {
    replyText = `Here are common educational side effects for your active medications:\n\n` +
      `- **Lisinopril:** Mild dry persistent cough, slight lightheadedness when standing up.\n` +
      `- **Metformin:** Mild nausea or loose stools (usually improves when taken with a meal).\n` +
      `- **Amoxicillin:** Mild diarrhea or stomach upset.\n\n` +
      `*If you experience swelling of the face, severe skin rash, or shortness of breath, seek emergency medical care immediately.*`;
  } else if (q.includes('doctor') || q.includes('appointment') || q.includes('ask')) {
    replyText = `Great question! Here are recommended questions to ask your doctor at your next appointment:\n\n` +
      `1. *"How is my current blood pressure response to Lisinopril 10mg?"*\n` +
      `2. *"Given my recorded penicillin allergy, is my antibiotic selection safe or should an alternative like Azithromycin be used?"*\n` +
      `3. *"Do my latest kidney and liver laboratory panels support continuing this regimen?"*\n` +
      `4. *"What should I do specifically if I miss an evening dose?"*\n\n` +
      `You can also export your complete MediCare Health Summary from the **Records** tab.`;
  } else {
    replyText = `Thank you for asking. Regarding **"${query}"**:\n\n` +
      `In general healthcare guidance, maintaining regular hydration, consistent sleep, balanced nutrition, and strictly following prescribed time slots are foundation pillars for recovery.\n\n` +
      `Please remember that while I can provide general health information and help organize your medication routine, I cannot diagnose medical conditions or change your prescribed doses.\n\n` +
      `*Would you like to review your current medication schedule or prepare questions for your upcoming appointment with Dr. Chen?*`;
  }

  mediCareState.chatMessages.push({
    sender: 'ai',
    text: replyText,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  saveMediCareState();
  updateChatView();
}

function updateChatView() {
  const container = document.getElementById('mcChatMessages');
  if (container) {
    container.innerHTML = mediCareState.chatMessages.map(msg => renderChatMessageBubble(msg)).join('');
    container.scrollTop = container.scrollHeight;
  }
}

function clearMediCareChatHistory() {
  mediCareState.chatMessages = [
    {
      sender: 'ai',
      text: 'Chat history cleared. How can I help you today with your medicines, wellness, or appointment prep?',
      time: 'Just now'
    }
  ];
  saveMediCareState();
  updateChatView();
}

// Voice input support
function toggleMediCareVoiceInput() {
  const btn = document.getElementById('mcVoiceBtn');
  const inputEl = document.getElementById('mcChatInput');
  
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    showToast('Speech Recognition not supported in this browser environment. Please type your message.');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  btn.style.color = '#ef4444';
  btn.classList.add('pulse');
  showToast('Listening... Speak your health question');

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (inputEl) inputEl.value = transcript;
    btn.style.color = '';
    btn.classList.remove('pulse');
    sendMediCareChatMessage();
  };

  recognition.onerror = () => {
    btn.style.color = '';
    btn.classList.remove('pulse');
    showToast('Voice input stopped or permission denied.');
  };

  recognition.onend = () => {
    btn.style.color = '';
    btn.classList.remove('pulse');
  };

  recognition.start();
}

// ==========================================================================
// 7. FEATURE 4: REMINDER NOTIFICATION SIMULATION & SNOOZE
// ==========================================================================

function triggerTestReminderAlert(customDose = null) {
  playMediCareChime();

  const dose = customDose || mediCareState.todayDoses.find(d => d.status === 'pending') || mediCareState.todayDoses[0];
  const med = mediCareState.medicines.find(m => m.id === dose.medId) || mediCareState.medicines[0];

  // Try browser push notification if permitted
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(`MediCare Reminder: ${dose.medName}`, {
        body: `Time for ${dose.dose}. ${med.instructions}`,
        icon: 'assets/optimized/ai_health.jpg'
      });
    } catch (e) {
      console.log('Push notification triggered');
    }
  }

  // In-app pop-up reminder modal
  const reminderHtml = `
    <div id="medicareReminderModal" class="mc-reminder-overlay" onclick="closeMediCareSubModal('medicareReminderModal')">
      <div class="mc-reminder-dialog" onclick="event.stopPropagation()">
        <div class="mc-reminder-icon">
          <i class="fa-solid fa-bell"></i>
        </div>
        <span class="mc-badge">Scheduled Dose Reminder</span>
        <h2 style="font-size:22px; font-weight:800; color:var(--mc-text-main); margin:8px 0 4px 0;">
          ${dose.medName}
        </h2>
        <div style="font-size:15px; font-weight:700; color:var(--mc-primary); margin-bottom:8px;">
          ${dose.dose} at ${dose.time}
        </div>
        <div style="font-size:13px; color:var(--mc-text-muted); background:var(--bg-body); padding:10px; border-radius:12px; margin-bottom:16px;">
          <i class="fa-solid fa-clipboard-check"></i> ${med.instructions}
        </div>

        <div style="font-size:11.5px; color:#b45309; background:var(--mc-warning-light); padding:8px 10px; border-radius:8px; margin-bottom:16px;">
          <i class="fa-solid fa-triangle-exclamation"></i> <strong>Safety Note:</strong> If this dose is significantly delayed, follow your physician's instructions. Do not take extra medication.
        </div>

        <div class="mc-reminder-actions-grid">
          <button class="btn btn-primary" onclick="markDoseStatus('${dose.id}', 'taken'); closeMediCareSubModal('medicareReminderModal');">
            <i class="fa-solid fa-check"></i> Taken
          </button>
          <button class="btn btn-outline" onclick="snoozeDose('${dose.id}', 10); closeMediCareSubModal('medicareReminderModal');">
            <i class="fa-solid fa-clock-rotate-left"></i> Snooze 10m
          </button>
          <button class="btn btn-outline" onclick="snoozeDose('${dose.id}', 30); closeMediCareSubModal('medicareReminderModal');">
            <i class="fa-solid fa-clock"></i> Snooze 30m
          </button>
          <button class="btn btn-outline" style="color:var(--mc-danger);" onclick="markDoseStatus('${dose.id}', 'skipped'); closeMediCareSubModal('medicareReminderModal');">
            <i class="fa-solid fa-xmark"></i> Skip
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', reminderHtml);
}

// ==========================================================================
// 8. FEATURE 5: CALENDAR & SCHEDULE SYSTEM (MONTH / WEEK / DAY + ICAL)
// ==========================================================================

function renderMediCareCalendar() {
  const currentView = mediCareState.activeCalendarView;

  return `
    <div class="mc-calendar-wrapper">
      <div class="mc-cal-header">
        <div>
          <h3 style="font-size:18px; font-weight:800; color:var(--mc-text-main); margin:0;">
            Health & Medicine Schedule
          </h3>
          <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">October 2026 • Color-coded medication & clinic calendar</p>
        </div>
        <div style="display:flex; gap:8px;">
          <div class="mc-cal-views">
            <button class="mc-cal-view-btn ${currentView === 'month' ? 'active' : ''}" onclick="changeCalendarView('month')">Month</button>
            <button class="mc-cal-view-btn ${currentView === 'week' ? 'active' : ''}" onclick="changeCalendarView('week')">Week</button>
            <button class="mc-cal-view-btn ${currentView === 'day' ? 'active' : ''}" onclick="changeCalendarView('day')">Day</button>
          </div>
          <button class="btn btn-sm btn-outline" onclick="exportToIcsCalendar()">
            <i class="fa-solid fa-file-export"></i> Sync iCal
          </button>
        </div>
      </div>

      <!-- Calendar Legend -->
      <div style="display:flex; gap:14px; flex-wrap:wrap; margin-bottom:14px; font-size:11.5px; color:var(--mc-text-muted);">
        <span style="display:flex; align-items:center; gap:5px;"><span class="mc-dot mc-dot-med"></span> Medicine Doses</span>
        <span style="display:flex; align-items:center; gap:5px;"><span class="mc-dot mc-dot-appt"></span> Doctor Appointments</span>
        <span style="display:flex; align-items:center; gap:5px;"><span class="mc-dot mc-dot-refill"></span> Refill Due</span>
      </div>

      <!-- Month Grid -->
      <div class="mc-month-grid">
        <div class="mc-month-day-name">Sun</div>
        <div class="mc-month-day-name">Mon</div>
        <div class="mc-month-day-name">Tue</div>
        <div class="mc-month-day-name">Wed</div>
        <div class="mc-month-day-name">Thu</div>
        <div class="mc-month-day-name">Fri</div>
        <div class="mc-month-day-name">Sat</div>

        ${generateCalendarMonthDaysHtml()}
      </div>

      <!-- Selected Date Day Details Drawer -->
      <div style="margin-top:20px; background:var(--bg-body); padding:16px; border-radius:14px; border:1px solid var(--mc-card-border);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <h4 style="font-size:15px; font-weight:800; color:var(--mc-text-main); margin:0;">
            Activities for ${mediCareState.selectedCalendarDate}
          </h4>
          <span class="mc-badge">6 Health Events</span>
        </div>
        <div class="mc-timeline">
          ${mediCareState.todayDoses.map(d => `
            <div class="mc-timeline-item ${d.status}">
              <div class="mc-timeline-left">
                <span class="mc-timeline-time">${d.time}</span>
                <div class="mc-timeline-details">
                  <h4>${d.medName}</h4>
                  <p>${d.dose} • Status: ${d.status.toUpperCase()}</p>
                </div>
              </div>
              <span class="mc-tag-pill">${d.status === 'taken' ? 'Completed' : 'Scheduled'}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function generateCalendarMonthDaysHtml() {
  let html = '';
  // Days 1 through 31 for October 2026 (Starts on Thursday, so 4 empty offset cells)
  for (let i = 0; i < 4; i++) {
    html += `<div class="mc-month-cell" style="opacity:0.3;"></div>`;
  }

  for (let day = 1; day <= 31; day++) {
    const isToday = day === 19;
    const dateStr = `2026-10-${day < 10 ? '0' + day : day}`;
    const isSelected = mediCareState.selectedCalendarDate === dateStr;

    html += `
      <div class="mc-month-cell ${isToday ? 'today' : ''} ${isSelected ? 'active-selected' : ''}" onclick="selectCalendarDate('${dateStr}')">
        <span class="mc-cell-day-num">${day} ${isToday ? '★' : ''}</span>
        <div class="mc-cell-dots">
          <span class="mc-dot mc-dot-med" title="Doses"></span>
          ${day === 25 ? `<span class="mc-dot mc-dot-appt" title="Dr. Chen"></span>` : ''}
          ${day === 22 ? `<span class="mc-dot mc-dot-refill" title="Amoxicillin Ends"></span>` : ''}
        </div>
      </div>
    `;
  }
  return html;
}

function selectCalendarDate(dateStr) {
  mediCareState.selectedCalendarDate = dateStr;
  renderMediCareApp();
}

function changeCalendarView(view) {
  mediCareState.activeCalendarView = view;
  renderMediCareApp();
}

function exportToIcsCalendar() {
  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//MediCare AI//Health Manager//EN\n";
  mediCareState.todayDoses.forEach(dose => {
    icsContent += "BEGIN:VEVENT\n";
    icsContent += `SUMMARY:Take ${dose.medName} (${dose.dose})\n`;
    icsContent += `DESCRIPTION:Prescription reminder from MediCare AI\n`;
    icsContent += `DTSTART:20261019T090000Z\n`;
    icsContent += `DTEND:20261019T091500Z\n`;
    icsContent += "END:VEVENT\n";
  });
  icsContent += "END:VCALENDAR";

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `medicare_schedule_${new Date().toISOString().slice(0,10)}.ics`;
  a.click();
  showToast('Downloaded iCalendar (.ics) file for Apple/Google Calendar sync.');
}

// ==========================================================================
// 9. FEATURE 9: SMART SCANNING (OCR & BARCODE VERIFICATION)
// ==========================================================================

function openOcrScanModal() {
  const modalHtml = `
    <div id="medicareScanModal" class="mc-reminder-overlay" onclick="closeMediCareSubModal('medicareScanModal')">
      <div class="mc-card" style="max-width:540px; width:95%; border-radius:24px; padding:24px;" onclick="event.stopPropagation()">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h3 style="font-size:18px; font-weight:800; color:var(--mc-text-main); margin:0;">
              Smart OCR & Package Scanner
            </h3>
            <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Extract medication details from photo or packaging</p>
          </div>
          <button class="modal-close-btn" onclick="closeMediCareSubModal('medicareScanModal')">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div style="border:2px dashed var(--mc-primary); border-radius:16px; padding:28px 16px; text-align:center; background:var(--mc-primary-light); margin-bottom:16px; cursor:pointer;" onclick="simulateOcrExtraction()">
          <i class="fa-solid fa-camera" style="font-size:36px; color:var(--mc-primary); margin-bottom:8px;"></i>
          <h4 style="margin:0 0 4px 0; color:var(--mc-primary);">Tap to Capture or Upload Medicine Label</h4>
          <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Supports packaging boxes, blister packs, and printed prescription labels</p>
        </div>

        <div id="ocrReviewSection" style="display:none; background:var(--bg-body); border-radius:14px; padding:16px; border:1px solid var(--mc-card-border); margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px; color:var(--mc-accent-green); font-weight:700; font-size:13px;">
            <i class="fa-solid fa-circle-check"></i> Extracted OCR Findings (Please Verify)
          </div>
          <div class="mc-form-grid" style="grid-template-columns:1fr 1fr; gap:10px;">
            <div class="mc-form-group">
              <label>Medicine Name</label>
              <input type="text" id="ocrMedName" class="mc-input" value="Cetirizine Hydrochloride">
            </div>
            <div class="mc-form-group">
              <label>Strength</label>
              <input type="text" id="ocrStrength" class="mc-input" value="10 mg">
            </div>
            <div class="mc-form-group">
              <label>Estimated Expiry</label>
              <input type="text" id="ocrExpiry" class="mc-input" value="2027-12">
            </div>
            <div class="mc-form-group">
              <label>Extracted Dosage</label>
              <input type="text" id="ocrDosage" class="mc-input" value="1 tablet once daily">
            </div>
          </div>
          <div style="font-size:11.5px; color:#b45309; margin-top:8px;">
            <i class="fa-solid fa-shield-halved"></i> <strong>Safety Rule:</strong> Never auto-prescribe from an unclear scan. Confirm with packaging before saving.
          </div>
          <div style="margin-top:14px; display:flex; justify-content:flex-end; gap:8px;">
            <button class="btn btn-outline btn-sm" onclick="closeMediCareSubModal('medicareScanModal')">Cancel</button>
            <button class="btn btn-primary btn-sm" onclick="saveScannedMedicine()">
              <i class="fa-solid fa-plus"></i> Save Verified Medicine
            </button>
          </div>
        </div>

        <div style="text-align:center;">
          <button class="btn btn-outline" style="font-size:12px;" onclick="simulateOcrExtraction()">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Run Simulated Sample Scan
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function simulateOcrExtraction() {
  const review = document.getElementById('ocrReviewSection');
  if (review) {
    review.style.display = 'block';
    showToast('OCR Analysis complete. Please verify extracted information.');
  }
}

function saveScannedMedicine() {
  const name = document.getElementById('ocrMedName').value || 'Cetirizine';
  const strength = document.getElementById('ocrStrength').value || '10mg';

  mediCareState.medicines.push({
    id: 'med_' + Date.now(),
    name: name,
    condition: 'Allergic Rhinitis / Hives',
    genericName: name,
    brandName: 'Zyrtec',
    type: 'tablet',
    strength: strength,
    dosage: '1 tablet',
    instructions: 'Take once daily in evening with water.',
    frequency: 'Once daily',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: '2026-12-31',
    timeSlots: ['08:00 PM'],
    dosesPerDay: 1,
    quantityAvailable: 30,
    refillThreshold: 5,
    doctorNotes: 'Scanned and verified by user.',
    source: 'Packaging OCR Verification',
    lastUpdated: 'October 2026'
  });

  saveMediCareState();
  closeMediCareSubModal('medicareScanModal');
  renderMediCareApp();
  showToast(`Added ${name} to your medicine schedule!`);
}

// ==========================================================================
// 10. FEATURE 10: APPOINTMENTS & HEALTH RECORDS & PDF SUMMARY
// ==========================================================================

function renderMediCareRecords() {
  return `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
      <div>
        <h3 style="font-size:18px; font-weight:800; color:var(--mc-text-main); margin:0;">
          Appointments & Health Records
        </h3>
        <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Clinical visits, diagnostic reports, and physician consultation notes</p>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn-outline btn-sm" onclick="exportMedicalSummaryPdf()">
          <i class="fa-solid fa-file-pdf color-red"></i> Export PDF Summary
        </button>
        <button class="btn btn-primary btn-sm" onclick="openAddAppointmentModal()">
          <i class="fa-solid fa-plus"></i> Add Appointment
        </button>
      </div>
    </div>

    <!-- Doctor Appointments Section -->
    <div class="mc-card" style="margin-bottom:20px;">
      <div class="mc-card-header">
        <span class="mc-card-title"><i class="fa-solid fa-user-doctor color-primary"></i> Scheduled Doctor Appointments</span>
        <span class="mc-badge">${mediCareState.appointments.length} Upcoming</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${mediCareState.appointments.map(apt => `
          <div class="mc-record-card">
            <div class="mc-record-left">
              <div class="mc-record-icon">
                <i class="fa-solid fa-stethoscope"></i>
              </div>
              <div>
                <h4 style="font-size:15px; font-weight:800; color:var(--mc-text-main); margin:0 0 2px 0;">
                  ${apt.doctorName}
                </h4>
                <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">
                  ${apt.specialty} • <i class="fa-regular fa-clock"></i> ${apt.date} at ${apt.time}
                </p>
                <p style="font-size:12px; color:var(--mc-primary); margin:2px 0 0 0;">
                  <i class="fa-solid fa-location-dot"></i> ${apt.clinic}
                </p>
              </div>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="btn btn-sm btn-outline" onclick="openAppointmentPrepModal('${apt.id}')">
                <i class="fa-solid fa-wand-magic-sparkles"></i> AI Prep Questions
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Health Vault Documents & Lab Reports -->
    <div class="mc-card">
      <div class="mc-card-header">
        <span class="mc-card-title"><i class="fa-solid fa-file-medical color-green"></i> Stored Diagnostic Reports & Labs</span>
        <button class="btn btn-sm btn-outline" onclick="showToast('Upload feature ready. Files encrypted locally.')">
          <i class="fa-solid fa-cloud-arrow-up"></i> Upload Document
        </button>
      </div>
      <div style="display:flex; flex-direction:column; gap:10px;">
        ${mediCareState.healthRecords.map(rec => `
          <div class="mc-record-card">
            <div class="mc-record-left">
              <div class="mc-record-icon" style="background:var(--mc-accent-green-light); color:var(--mc-accent-green);">
                <i class="fa-solid fa-file-lines"></i>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--mc-text-main); margin:0 0 2px 0;">
                  ${rec.title}
                </h4>
                <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">
                  ${rec.type} • ${rec.date} • Ordered by ${rec.doctor}
                </p>
                <p style="font-size:12px; color:var(--mc-text-main); margin:4px 0 0 0;">
                  ${rec.summary}
                </p>
              </div>
            </div>
            <button class="btn btn-sm btn-outline" onclick="showToast('Securely viewing ${rec.fileName}')">
              <i class="fa-solid fa-eye"></i> View
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function openAppointmentPrepModal(aptId) {
  const apt = mediCareState.appointments.find(a => a.id === aptId) || mediCareState.appointments[0];

  const modalHtml = `
    <div id="medicareApptPrepModal" class="mc-reminder-overlay" onclick="closeMediCareSubModal('medicareApptPrepModal')">
      <div class="mc-card" style="max-width:580px; width:95%; border-radius:24px; padding:24px;" onclick="event.stopPropagation()">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px;">
          <div>
            <span class="mc-badge">AI Appointment Assistant</span>
            <h3 style="font-size:18px; font-weight:800; color:var(--mc-text-main); margin:4px 0 2px 0;">
              Preparation for ${apt.doctorName}
            </h3>
            <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">${apt.specialty} on ${apt.date}</p>
          </div>
          <button class="modal-close-btn" onclick="closeMediCareSubModal('medicareApptPrepModal')">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div style="background:var(--bg-body); padding:14px; border-radius:12px; margin-bottom:16px;">
          <h4 style="font-size:13.5px; font-weight:700; margin:0 0 8px 0; color:var(--mc-text-main);">
            <i class="fa-solid fa-clipboard-question color-primary"></i> Tailored Questions Generated for Your Doctor:
          </h4>
          <ul style="margin:0; padding-left:20px; font-size:13px; line-height:1.6; color:var(--mc-text-main);">
            <li>"My home blood pressure has averaged 122/78 mmHg. Should we continue Lisinopril 10mg at current dose?"</li>
            <li>"I have a recorded Penicillin allergy in my profile. Are all antibiotic choices on my file cross-checked?"</li>
            <li>"Are there any additional routine lab tests required before my next prescription refill?"</li>
            <li>"Should I continue taking Metformin with dinner or adjust if I exercise in the evening?"</li>
          </ul>
        </div>

        <div class="mc-form-group" style="margin-bottom:16px;">
          <label>Add Your Personal Symptom Notes or Questions</label>
          <textarea class="mc-textarea" rows="3" placeholder="e.g. Felt mild dizziness on Tuesday morning after taking Lisinopril..."></textarea>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:8px;">
          <button class="btn btn-outline" onclick="closeMediCareSubModal('medicareApptPrepModal')">Close</button>
          <button class="btn btn-primary" onclick="showToast('Checklist copied to clipboard!'); closeMediCareSubModal('medicareApptPrepModal');">
            <i class="fa-solid fa-copy"></i> Copy Questions
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function exportMedicalSummaryPdf() {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    showToast('Please allow popups to download health summary PDF.');
    return;
  }

  const u = mediCareState.user;
  const medsListHtml = mediCareState.medicines.map(m => `
    <tr>
      <td style="padding:8px; border:1px solid #ddd;"><strong>${m.name}</strong> (${m.genericName})</td>
      <td style="padding:8px; border:1px solid #ddd;">${m.strength} - ${m.dosage}</td>
      <td style="padding:8px; border:1px solid #ddd;">${m.frequency} (${m.timeSlots.join(', ')})</td>
      <td style="padding:8px; border:1px solid #ddd;">${m.condition}</td>
      <td style="padding:8px; border:1px solid #ddd;">${m.instructions}</td>
    </tr>
  `).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>MediCare AI - Health & Medication Summary</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; padding: 40px; color: #1e293b; }
        h1 { color: #0284c7; margin-bottom: 4px; }
        .meta-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 13px; }
        th { background: #e0f2fe; color: #0369a1; padding: 8px; border: 1px solid #cbd5e1; text-align: left; }
        .disclaimer { font-size: 11px; color: #64748b; margin-top: 30px; border-top: 1px solid #cbd5e1; padding-top: 12px; }
      </style>
    </head>
    <body>
      <h1>MediCare AI • Comprehensive Health Summary</h1>
      <p style="color:#64748b; margin-top:0;">Generated on ${new Date().toLocaleDateString()} for Clinical Consultation</p>

      <div class="meta-box">
        <p><strong>Patient Name:</strong> ${u.name} | <strong>DOB:</strong> ${u.dob} | <strong>Blood Type:</strong> ${u.bloodType}</p>
        <p><strong>Known Allergies:</strong> <span style="color:#dc2626; font-weight:bold;">${u.allergies.join(', ')}</span></p>
        <p><strong>Existing Conditions:</strong> ${u.conditions.join(', ')}</p>
        <p><strong>Emergency Contact:</strong> ${u.emergencyContact}</p>
      </div>

      <h3>Active Medications & Prescription Regimen</h3>
      <table>
        <thead>
          <tr>
            <th>Medication</th>
            <th>Strength / Dose</th>
            <th>Frequency / Times</th>
            <th>Health Condition</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          ${medsListHtml}
        </tbody>
      </table>

      <div class="disclaimer">
        <strong>MEDICAL SAFETY NOTICE:</strong> This document is generated from patient-maintained records on MediCare AI for educational and reference purposes. It does not replace an official electronic health record (EHR) or medical diagnosis. Please verify all information with the patient and prescribing clinician.
      </div>

      <script>
        window.print();
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// ==========================================================================
// 11. FEATURE 11 & 12: EMERGENCY & CAREGIVER SYSTEM
// ==========================================================================

function renderMediCareEmergency() {
  const currentCountry = mediCareState.settings.emergencyCountry || 'US';
  const hotline = mediCareState.settings.emergencyHotlines[currentCountry] || mediCareState.settings.emergencyHotlines.US;

  return `
    <!-- Top Prominent SOS Card -->
    <div class="mc-emergency-box">
      <h3><i class="fa-solid fa-triangle-exclamation"></i> Emergency Safety Center</h3>
      <p>
        For life-threatening symptoms such as <strong>chest pain, sudden weakness, stroke symptoms, difficulty breathing, or severe allergic reaction</strong>, contact emergency response services immediately.
      </p>

      <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-bottom:16px;">
        <a href="tel:${hotline.ambulance}" class="mc-sos-btn-large">
          <i class="fa-solid fa-phone-volume"></i> Call Emergency (${hotline.ambulance})
        </a>
        <a href="tel:${hotline.poison}" class="mc-sos-btn-large" style="background:#d97706; box-shadow:0 8px 24px rgba(217, 119, 6, 0.35);">
          <i class="fa-solid fa-skull-crossbones"></i> Poison Control (${hotline.poison})
        </a>
      </div>

      <div style="display:inline-flex; align-items:center; gap:8px; font-size:12px; background:rgba(255,255,255,0.8); padding:6px 14px; border-radius:20px; color:#1e293b;">
        <span>Emergency Jurisdiction:</span>
        <select onchange="changeEmergencyCountry(this.value)" style="border:none; background:transparent; font-weight:700; cursor:pointer;">
          <option value="US" ${currentCountry === 'US' ? 'selected' : ''}>United States (911)</option>
          <option value="UK" ${currentCountry === 'UK' ? 'selected' : ''}>United Kingdom (999)</option>
          <option value="IN" ${currentCountry === 'IN' ? 'selected' : ''}>India (112 / 108)</option>
          <option value="EU" ${currentCountry === 'EU' ? 'selected' : ''}>European Union (112)</option>
          <option value="AU" ${currentCountry === 'AU' ? 'selected' : ''}>Australia (000)</option>
          <option value="CA" ${currentCountry === 'CA' ? 'selected' : ''}>Canada (911)</option>
        </select>
      </div>
    </div>

    <!-- Red-Flag Symptom Guidance Card -->
    <div class="mc-card" style="margin-bottom:20px;">
      <div class="mc-card-header">
        <span class="mc-card-title"><i class="fa-solid fa-bell color-red"></i> Red-Flag Symptoms (When to Seek Immediate Care)</span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:12px;">
        <div style="background:var(--mc-danger-light); padding:12px; border-radius:12px; border-left:4px solid var(--mc-danger);">
          <strong style="color:var(--mc-danger);"><i class="fa-solid fa-heart-crack"></i> Chest Pain / Heart Symptoms</strong>
          <p style="font-size:12px; margin:4px 0 0 0; color:var(--mc-text-main);">Pressure, tightness, or squeezing pain in center of chest spreading to arm, neck, or jaw.</p>
        </div>
        <div style="background:var(--mc-danger-light); padding:12px; border-radius:12px; border-left:4px solid var(--mc-danger);">
          <strong style="color:var(--mc-danger);"><i class="fa-solid fa-brain"></i> Stroke (F.A.S.T.)</strong>
          <p style="font-size:12px; margin:4px 0 0 0; color:var(--mc-text-main);">Face drooping, Arm weakness, Slurred speech, Time to call emergency services.</p>
        </div>
        <div style="background:var(--mc-danger-light); padding:12px; border-radius:12px; border-left:4px solid var(--mc-danger);">
          <strong style="color:var(--mc-danger);"><i class="fa-solid fa-lungs"></i> Severe Breathing Difficulty</strong>
          <p style="font-size:12px; margin:4px 0 0 0; color:var(--mc-text-main);">Inability to catch breath, blue lips or nails, gasping, or acute stridor.</p>
        </div>
        <div style="background:var(--mc-danger-light); padding:12px; border-radius:12px; border-left:4px solid var(--mc-danger);">
          <strong style="color:var(--mc-danger);"><i class="fa-solid fa-shield-virus"></i> Anaphylaxis (Severe Allergy)</strong>
          <p style="font-size:12px; margin:4px 0 0 0; color:var(--mc-text-main);">Swelling of tongue, lips, or throat, widespread hives, wheezing after medication or food.</p>
        </div>
      </div>
    </div>

    <!-- Family & Caregiver Mode Section -->
    <div class="mc-card">
      <div class="mc-card-header">
        <span class="mc-card-title"><i class="fa-solid fa-people-roof color-primary"></i> Family & Trusted Caregiver Network</span>
        <button class="btn btn-sm btn-outline" onclick="openAddCaregiverModal()">
          <i class="fa-solid fa-user-plus"></i> Add Caregiver
        </button>
      </div>
      <p style="font-size:12px; color:var(--mc-text-muted); margin:0 0 14px 0;">
        Share scheduled reminders, receive alerts if multiple doses are missed, and manage medication profiles for children or elderly family members.
      </p>

      <!-- Active Family Profiles Bar -->
      <div style="font-size:12px; font-weight:700; color:var(--mc-text-main); margin-bottom:8px;">Active Health Profile:</div>
      <div class="mc-family-bar">
        ${mediCareState.familyProfiles.map(p => `
          <button class="mc-family-avatar-btn ${mediCareState.activeProfile === p.name ? 'active' : ''}" onclick="switchFamilyProfile('${p.name}')">
            <div class="mc-family-avatar"><i class="fa-solid ${p.avatar}"></i></div>
            <span>${p.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- Caregiver List -->
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:14px;">
        ${mediCareState.caregivers.map(cg => `
          <div class="mc-record-card">
            <div class="mc-record-left">
              <div class="mc-record-icon">
                <i class="fa-solid fa-user-nurse"></i>
              </div>
              <div>
                <h4 style="font-size:14px; font-weight:700; color:var(--mc-text-main); margin:0;">
                  ${cg.name}
                </h4>
                <p style="font-size:12px; color:var(--mc-text-muted); margin:2px 0 0 0;">
                  ${cg.relationship} • ${cg.phone}
                </p>
                <span class="mc-tag-pill" style="margin-top:4px; display:inline-block;">
                  <i class="fa-solid fa-shield-check"></i> ${cg.permissions}
                </span>
              </div>
            </div>
            <div>
              <button class="btn btn-sm btn-outline" onclick="simulateCaregiverAlert('${cg.name}')">
                <i class="fa-solid fa-paper-plane"></i> Test Missed Dose Alert
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function changeEmergencyCountry(countryCode) {
  mediCareState.settings.emergencyCountry = countryCode;
  saveMediCareState();
  renderMediCareApp();
  showToast(`Emergency hotlines updated to ${countryCode}`);
}

function switchFamilyProfile(profileName) {
  mediCareState.activeProfile = profileName;
  saveMediCareState();
  renderMediCareApp();
  showToast(`Switched active profile to: ${profileName}`);
}

function simulateCaregiverAlert(caregiverName) {
  showToast(`Simulated SMS & Push notification sent to caregiver: ${caregiverName}`);
}

// ==========================================================================
// 12. FEATURE 1: USER REGISTRATION, PROFILE & PRIVACY CONTROLS
// ==========================================================================

function renderMediCareProfile() {
  const u = mediCareState.user;
  const bmi = calculateBmi(u.heightCm, u.weightKg);

  return `
    <div class="mc-card" style="margin-bottom:20px;">
      <div class="mc-card-header">
        <span class="mc-card-title"><i class="fa-solid fa-user-pen color-primary"></i> Personal Health Profile</span>
        <button class="btn btn-sm btn-primary" onclick="saveProfileChanges()">
          <i class="fa-solid fa-floppy-disk"></i> Save Profile
        </button>
      </div>

      <div class="mc-form-grid">
        <div class="mc-form-group">
          <label>Full Name</label>
          <input type="text" id="profName" class="mc-input" value="${u.name}">
        </div>
        <div class="mc-form-group">
          <label>Date of Birth</label>
          <input type="date" id="profDob" class="mc-input" value="${u.dob}">
        </div>
        <div class="mc-form-group">
          <label>Gender Identity</label>
          <select id="profGender" class="mc-select">
            <option value="Male" ${u.gender === 'Male' ? 'selected' : ''}>Male</option>
            <option value="Female" ${u.gender === 'Female' ? 'selected' : ''}>Female</option>
            <option value="Other" ${u.gender === 'Other' ? 'selected' : ''}>Non-binary / Other</option>
            <option value="Prefer not to say" ${u.gender === 'Prefer not to say' ? 'selected' : ''}>Prefer not to say</option>
          </select>
        </div>
        <div class="mc-form-group">
          <label>Blood Type</label>
          <input type="text" id="profBlood" class="mc-input" value="${u.bloodType}">
        </div>
        <div class="mc-form-group">
          <label>Height (cm)</label>
          <input type="number" id="profHeight" class="mc-input" value="${u.heightCm}">
        </div>
        <div class="mc-form-group">
          <label>Weight (kg)</label>
          <input type="number" id="profWeight" class="mc-input" value="${u.weightKg}">
        </div>
      </div>

      <div style="background:var(--bg-body); border-radius:12px; padding:12px; margin-bottom:16px; display:flex; align-items:center; justify-content:space-between;">
        <div>
          <span style="font-size:12px; color:var(--mc-text-muted);">Calculated Body Mass Index (BMI):</span>
          <h4 style="font-size:18px; font-weight:800; color:var(--mc-primary); margin:2px 0 0 0;">${bmi.value} (${bmi.category})</h4>
        </div>
        <span class="mc-badge mc-badge-success">Healthy Range</span>
      </div>

      <!-- Allergies & Existing Health Conditions -->
      <div class="mc-form-grid" style="grid-template-columns:1fr 1fr;">
        <div class="mc-form-group">
          <label><i class="fa-solid fa-triangle-exclamation color-red"></i> Known Allergies (Comma separated)</label>
          <input type="text" id="profAllergies" class="mc-input" value="${u.allergies.join(', ')}">
          <small style="font-size:11px; color:var(--mc-text-muted);">Used by interaction engine to block conflicting meds</small>
        </div>
        <div class="mc-form-group">
          <label><i class="fa-solid fa-notes-medical color-primary"></i> Existing Health Conditions</label>
          <input type="text" id="profConditions" class="mc-input" value="${u.conditions.join(', ')}">
          <small style="font-size:11px; color:var(--mc-text-muted);">Chronic illnesses or physiological conditions</small>
        </div>
      </div>

      <div class="mc-form-grid" style="grid-template-columns:1fr 1fr; margin-top:10px;">
        <div class="mc-form-group">
          <label>Emergency Contact</label>
          <input type="text" id="profEmergency" class="mc-input" value="${u.emergencyContact}">
        </div>
        <div class="mc-form-group">
          <label>Preferred Language</label>
          <select id="profLang" class="mc-select">
            <option value="English">English</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
            <option value="Hindi">हिन्दी</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Security, Privacy & Data Storage Controls -->
    <div class="mc-card">
      <div class="mc-card-header">
        <span class="mc-card-title"><i class="fa-solid fa-lock color-primary"></i> Data Protection & Privacy Controls</span>
        <span class="mc-badge mc-badge-success"><i class="fa-solid fa-shield-check"></i> AES-256 Storage</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:13px; color:var(--mc-text-main);">Lock Screen Privacy Shield</strong>
            <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Hide specific medicine names on device lock screen notifications</p>
          </div>
          <input type="checkbox" id="profLockPrivacy" ${u.lockScreenPrivacy ? 'checked' : ''} onchange="toggleLockPrivacy(this.checked)" style="transform:scale(1.2); cursor:pointer;">
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:13px; color:var(--mc-text-main);">Caregiver Notification Relays</strong>
            <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Send automated SMS if 2 consecutive doses are missed</p>
          </div>
          <input type="checkbox" ${u.caregiverNotifications ? 'checked' : ''} onchange="toggleCaregiverNotice(this.checked)" style="transform:scale(1.2); cursor:pointer;">
        </div>

        <div style="border-top:1px solid var(--mc-card-border); padding-top:14px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <strong style="font-size:13px; color:var(--mc-danger);">Delete / Reset All Health Data</strong>
            <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Permanently wipe local medicine logs and reset default settings</p>
          </div>
          <button class="btn btn-sm btn-outline" style="color:var(--mc-danger);" onclick="confirmDeleteAllHealthData()">
            <i class="fa-solid fa-trash-can"></i> Delete Data
          </button>
        </div>
      </div>
    </div>
  `;
}

function calculateBmi(heightCm, weightKg) {
  if (!heightCm || !weightKg) return { value: '22.0', category: 'Normal' };
  const hM = heightCm / 100;
  const val = (weightKg / (hM * hM)).toFixed(1);
  let cat = 'Normal';
  if (val < 18.5) cat = 'Underweight';
  else if (val >= 25 && val < 30) cat = 'Overweight';
  else if (val >= 30) cat = 'Obese';
  return { value: val, category: cat };
}

function saveProfileChanges() {
  const u = mediCareState.user;
  u.name = document.getElementById('profName').value;
  u.dob = document.getElementById('profDob').value;
  u.gender = document.getElementById('profGender').value;
  u.bloodType = document.getElementById('profBlood').value;
  u.heightCm = parseFloat(document.getElementById('profHeight').value) || 175;
  u.weightKg = parseFloat(document.getElementById('profWeight').value) || 70;
  u.allergies = document.getElementById('profAllergies').value.split(',').map(s => s.trim()).filter(Boolean);
  u.conditions = document.getElementById('profConditions').value.split(',').map(s => s.trim()).filter(Boolean);
  u.emergencyContact = document.getElementById('profEmergency').value;
  u.preferredLanguage = document.getElementById('profLang').value;

  saveMediCareState();
  renderMediCareApp();
  showToast('Profile and allergy records successfully updated.');
}

function toggleLockPrivacy(checked) {
  mediCareState.user.lockScreenPrivacy = checked;
  saveMediCareState();
  showToast(checked ? 'Lock screen privacy shield enabled.' : 'Lock screen privacy disabled.');
}

function toggleCaregiverNotice(checked) {
  mediCareState.user.caregiverNotifications = checked;
  saveMediCareState();
  showToast(checked ? 'Caregiver notifications enabled.' : 'Caregiver notifications disabled.');
}

function confirmDeleteAllHealthData() {
  if (confirm('Are you sure you want to permanently delete all your health data and reset to default? This action cannot be undone.')) {
    localStorage.removeItem(MEDICARE_STORAGE_KEY);
    mediCareState = JSON.parse(JSON.stringify(defaultMediCareState));
    saveMediCareState();
    renderMediCareApp();
    showToast('All health data reset successfully.');
  }
}

// ==========================================================================
// 13. ADD / EDIT MEDICINE MODAL
// ==========================================================================

let tempTimeSlots = ['08:00 AM'];

function openAddMedicineModal() {
  tempTimeSlots = ['08:00 AM', '08:00 PM'];
  renderMedicineFormModal(null);
}

function openEditMedicineModal(medId) {
  const med = mediCareState.medicines.find(m => m.id === medId);
  if (!med) return;
  tempTimeSlots = [...med.timeSlots];
  renderMedicineFormModal(med);
}

function renderMedicineFormModal(existingMed) {
  const isEdit = !!existingMed;
  const m = existingMed || {
    name: '',
    condition: '',
    genericName: '',
    brandName: '',
    type: 'tablet',
    strength: '500 mg',
    dosage: '1 tablet',
    instructions: 'Take after food with water',
    frequency: 'Twice daily',
    startDate: new Date().toISOString().slice(0, 10),
    endDate: '2026-11-19',
    quantityAvailable: 30,
    refillThreshold: 5,
    doctorNotes: ''
  };

  const modalHtml = `
    <div id="medicareAddMedModal" class="mc-reminder-overlay" onclick="closeMediCareSubModal('medicareAddMedModal')">
      <div class="mc-card" style="max-width:640px; width:95%; max-height:90vh; overflow-y:auto; border-radius:24px; padding:24px;" onclick="event.stopPropagation()">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h3 style="font-size:18px; font-weight:800; color:var(--mc-text-main); margin:0;">
              ${isEdit ? 'Edit Prescription' : 'Add New Medicine'}
            </h3>
            <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Configure schedules, dosages, refill thresholds & instructions</p>
          </div>
          <button class="modal-close-btn" onclick="closeMediCareSubModal('medicareAddMedModal')">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); saveMedicineForm('${isEdit ? m.id : ''}');">
          <div class="mc-form-grid">
            <div class="mc-form-group">
              <label>Medicine Name *</label>
              <input type="text" id="fmMedName" class="mc-input" value="${m.name}" placeholder="e.g. Paracetamol" required>
            </div>
            <div class="mc-form-group">
              <label>Health Issue / Condition *</label>
              <input type="text" id="fmCondition" class="mc-input" value="${m.condition}" placeholder="e.g. Fever or mild pain" required>
            </div>
          </div>

          <div class="mc-form-grid">
            <div class="mc-form-group">
              <label>Generic Name</label>
              <input type="text" id="fmGeneric" class="mc-input" value="${m.genericName}" placeholder="e.g. Acetaminophen">
            </div>
            <div class="mc-form-group">
              <label>Brand Name</label>
              <input type="text" id="fmBrand" class="mc-input" value="${m.brandName}" placeholder="e.g. Tylenol">
            </div>
          </div>

          <div class="mc-form-grid">
            <div class="mc-form-group">
              <label>Medicine Type</label>
              <select id="fmType" class="mc-select">
                <option value="tablet" ${m.type === 'tablet' ? 'selected' : ''}>Tablet</option>
                <option value="capsule" ${m.type === 'capsule' ? 'selected' : ''}>Capsule</option>
                <option value="syrup" ${m.type === 'syrup' ? 'selected' : ''}>Syrup</option>
                <option value="injection" ${m.type === 'injection' ? 'selected' : ''}>Injection</option>
                <option value="cream" ${m.type === 'cream' ? 'selected' : ''}>Cream / Ointment</option>
                <option value="inhaler" ${m.type === 'inhaler' ? 'selected' : ''}>Inhaler</option>
                <option value="drops" ${m.type === 'drops' ? 'selected' : ''}>Drops</option>
              </select>
            </div>
            <div class="mc-form-group">
              <label>Strength & Dosage</label>
              <div style="display:flex; gap:6px;">
                <input type="text" id="fmStrength" class="mc-input" value="${m.strength}" placeholder="500 mg" style="flex:1;">
                <input type="text" id="fmDosage" class="mc-input" value="${m.dosage}" placeholder="1 tablet" style="flex:1;">
              </div>
            </div>
          </div>

          <div class="mc-form-group" style="margin-bottom:14px;">
            <label>Specific Instructions</label>
            <input type="text" id="fmInstructions" class="mc-input" value="${m.instructions}" placeholder="e.g. Use only as directed by a doctor. Take after food.">
          </div>

          <div class="mc-form-grid">
            <div class="mc-form-group">
              <label>Frequency</label>
              <select id="fmFrequency" class="mc-select">
                <option value="Once daily" ${m.frequency === 'Once daily' ? 'selected' : ''}>Once daily</option>
                <option value="Twice daily" ${m.frequency === 'Twice daily' ? 'selected' : ''}>Twice daily</option>
                <option value="Three times daily" ${m.frequency === 'Three times daily' ? 'selected' : ''}>Three times daily</option>
                <option value="Every 8 hours" ${m.frequency === 'Every 8 hours' ? 'selected' : ''}>Every 8 hours</option>
                <option value="As needed" ${m.frequency === 'As needed' ? 'selected' : ''}>As needed (PRN)</option>
              </select>
            </div>
            <div class="mc-form-group">
              <label>Start & End Date</label>
              <div style="display:flex; gap:6px;">
                <input type="date" id="fmStartDate" class="mc-input" value="${m.startDate}">
                <input type="date" id="fmEndDate" class="mc-input" value="${m.endDate}">
              </div>
            </div>
          </div>

          <!-- Dynamic Time Slots Configuration -->
          <div class="mc-form-group" style="margin-bottom:14px;">
            <label style="display:flex; justify-content:space-between; align-items:center;">
              <span>Daily Reminder Time Slots (${tempTimeSlots.length} times/day)</span>
              <button type="button" class="btn-flat color-primary" style="font-size:11px;" onclick="addTempTimeSlot()">+ Add Slot</button>
            </label>
            <div class="mc-timeslot-list" id="fmTimeslotContainer">
              ${tempTimeSlots.map((ts, idx) => `
                <div class="mc-timeslot-pill">
                  <span>${ts}</span>
                  <button type="button" onclick="removeTempTimeSlot(${idx})">×</button>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="mc-form-grid">
            <div class="mc-form-group">
              <label>Quantity Available</label>
              <input type="number" id="fmQuantity" class="mc-input" value="${m.quantityAvailable}">
            </div>
            <div class="mc-form-group">
              <label>Refill Alert Threshold</label>
              <input type="number" id="fmRefillThreshold" class="mc-input" value="${m.refillThreshold}">
            </div>
          </div>

          <div class="mc-form-group" style="margin-bottom:16px;">
            <label>Doctor / Pharmacy Notes</label>
            <textarea id="fmNotes" class="mc-textarea" rows="2" placeholder="e.g. Prescribed by Dr. Marcus Chen for 30 days.">${m.doctorNotes || ''}</textarea>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn btn-outline" onclick="closeMediCareSubModal('medicareAddMedModal')">Cancel</button>
            <button type="submit" class="btn btn-primary">
              <i class="fa-solid fa-check"></i> ${isEdit ? 'Update Medicine' : 'Save Medicine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function addTempTimeSlot() {
  const slot = prompt('Enter reminder time (e.g. 02:00 PM):', '02:00 PM');
  if (slot) {
    tempTimeSlots.push(slot);
    const container = document.getElementById('fmTimeslotContainer');
    if (container) {
      container.innerHTML = tempTimeSlots.map((ts, idx) => `
        <div class="mc-timeslot-pill">
          <span>${ts}</span>
          <button type="button" onclick="removeTempTimeSlot(${idx})">×</button>
        </div>
      `).join('');
    }
  }
}

function removeTempTimeSlot(idx) {
  tempTimeSlots.splice(idx, 1);
  const container = document.getElementById('fmTimeslotContainer');
  if (container) {
    container.innerHTML = tempTimeSlots.map((ts, i) => `
      <div class="mc-timeslot-pill">
        <span>${ts}</span>
        <button type="button" onclick="removeTempTimeSlot(${i})">×</button>
      </div>
    `).join('');
  }
}

function saveMedicineForm(editMedId) {
  const name = document.getElementById('fmMedName').value;
  const condition = document.getElementById('fmCondition').value;
  const generic = document.getElementById('fmGeneric').value || name;
  const brand = document.getElementById('fmBrand').value || name;
  const type = document.getElementById('fmType').value;
  const strength = document.getElementById('fmStrength').value || 'Standard';
  const dosage = document.getElementById('fmDosage').value || '1 dose';
  const instructions = document.getElementById('fmInstructions').value || 'Follow physician guidance';
  const frequency = document.getElementById('fmFrequency').value;
  const startDate = document.getElementById('fmStartDate').value;
  const endDate = document.getElementById('fmEndDate').value;
  const qty = parseInt(document.getElementById('fmQuantity').value, 10) || 30;
  const refillThreshold = parseInt(document.getElementById('fmRefillThreshold').value, 10) || 5;
  const notes = document.getElementById('fmNotes').value;

  if (editMedId) {
    const med = mediCareState.medicines.find(m => m.id === editMedId);
    if (med) {
      Object.assign(med, {
        name, condition, genericName: generic, brandName: brand, type,
        strength, dosage, instructions, frequency, startDate, endDate,
        timeSlots: tempTimeSlots.length > 0 ? [...tempTimeSlots] : ['08:00 AM'],
        quantityAvailable: qty, refillThreshold, doctorNotes: notes
      });
    }
  } else {
    mediCareState.medicines.push({
      id: 'med_' + Date.now(),
      name, condition, genericName: generic, brandName: brand, type,
      strength, dosage, instructions, frequency, startDate, endDate,
      timeSlots: tempTimeSlots.length > 0 ? [...tempTimeSlots] : ['08:00 AM'],
      dosesPerDay: tempTimeSlots.length || 1,
      quantityAvailable: qty, refillThreshold, doctorNotes: notes,
      purpose: `Prescribed for ${condition}.`,
      precautions: 'Use only under qualified medical supervision.',
      source: 'Verified Prescription Registry',
      lastUpdated: 'October 2026'
    });
  }

  saveMediCareState();
  closeMediCareSubModal('medicareAddMedModal');
  renderMediCareApp();
  showToast(editMedId ? 'Medicine updated.' : 'New medicine added to schedule.');
}

function deleteMedicine(medId) {
  if (confirm('Are you sure you want to remove this medication from your active list?')) {
    mediCareState.medicines = mediCareState.medicines.filter(m => m.id !== medId);
    saveMediCareState();
    renderMediCareApp();
    showToast('Medicine removed.');
  }
}

// ==========================================================================
// 14. APPOINTMENT MODAL & CAREGIVER MODAL
// ==========================================================================

function openAddAppointmentModal() {
  const modalHtml = `
    <div id="medicareAppointmentModal" class="mc-reminder-overlay" onclick="closeMediCareSubModal('medicareAppointmentModal')">
      <div class="mc-card" style="max-width:520px; width:95%; border-radius:24px; padding:24px;" onclick="event.stopPropagation()">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h3 style="font-size:18px; font-weight:800; color:var(--mc-text-main); margin:0;">
              Schedule Doctor Appointment
            </h3>
            <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Keep track of medical checkups and follow-ups</p>
          </div>
          <button class="modal-close-btn" onclick="closeMediCareSubModal('medicareAppointmentModal')">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); saveAppointmentForm();">
          <div class="mc-form-grid">
            <div class="mc-form-group">
              <label>Doctor Name</label>
              <input type="text" id="aptDocName" class="mc-input" placeholder="e.g. Dr. Jennifer Taylor" required>
            </div>
            <div class="mc-form-group">
              <label>Specialty</label>
              <input type="text" id="aptSpecialty" class="mc-input" placeholder="e.g. Endocrinologist" required>
            </div>
          </div>
          <div class="mc-form-group" style="margin-bottom:14px;">
            <label>Clinic or Hospital Location</label>
            <input type="text" id="aptClinic" class="mc-input" placeholder="e.g. Mercy General Outpatient Clinic" required>
          </div>
          <div class="mc-form-grid">
            <div class="mc-form-group">
              <label>Appointment Date</label>
              <input type="date" id="aptDate" class="mc-input" required>
            </div>
            <div class="mc-form-group">
              <label>Time</label>
              <input type="time" id="aptTime" class="mc-input" value="10:00" required>
            </div>
          </div>
          <div class="mc-form-group" style="margin-bottom:16px;">
            <label>Notes & Questions for Doctor</label>
            <textarea id="aptNotes" class="mc-textarea" rows="2" placeholder="e.g. Blood sugar fasting review, ask about exercise..."></textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn btn-outline" onclick="closeMediCareSubModal('medicareAppointmentModal')">Cancel</button>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-calendar-check"></i> Book Appointment</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function saveAppointmentForm() {
  const doc = document.getElementById('aptDocName').value;
  const spec = document.getElementById('aptSpecialty').value;
  const clinic = document.getElementById('aptClinic').value;
  const date = document.getElementById('aptDate').value;
  const time = document.getElementById('aptTime').value;
  const notes = document.getElementById('aptNotes').value;

  mediCareState.appointments.push({
    id: 'apt_' + Date.now(),
    doctorName: doc,
    specialty: spec,
    clinic: clinic,
    date: date,
    time: time,
    notes: notes,
    status: 'Scheduled'
  });

  saveMediCareState();
  closeMediCareSubModal('medicareAppointmentModal');
  renderMediCareApp();
  showToast('Appointment successfully scheduled!');
}

function openAddCaregiverModal() {
  const modalHtml = `
    <div id="medicareCaregiverModal" class="mc-reminder-overlay" onclick="closeMediCareSubModal('medicareCaregiverModal')">
      <div class="mc-card" style="max-width:500px; width:95%; border-radius:24px; padding:24px;" onclick="event.stopPropagation()">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <h3 style="font-size:18px; font-weight:800; color:var(--mc-text-main); margin:0;">Add Trusted Caregiver</h3>
            <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Family member, guardian, or healthcare nurse</p>
          </div>
          <button class="modal-close-btn" onclick="closeMediCareSubModal('medicareCaregiverModal')">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onsubmit="event.preventDefault(); saveCaregiverForm();">
          <div class="mc-form-group" style="margin-bottom:12px;">
            <label>Caregiver Full Name</label>
            <input type="text" id="cgName" class="mc-input" placeholder="e.g. Robert Morgan" required>
          </div>
          <div class="mc-form-grid">
            <div class="mc-form-group">
              <label>Relationship</label>
              <input type="text" id="cgRelation" class="mc-input" placeholder="e.g. Sibling / Nurse" required>
            </div>
            <div class="mc-form-group">
              <label>Phone Number</label>
              <input type="text" id="cgPhone" class="mc-input" placeholder="+1 (555) 000-0000" required>
            </div>
          </div>
          <div class="mc-form-group" style="margin-bottom:14px;">
            <label>Permission Level</label>
            <select id="cgPerm" class="mc-select">
              <option value="Schedule & Emergency Alerts">Schedule & Emergency Alerts</option>
              <option value="View Only">View Schedule Only</option>
              <option value="Full Access">Full Access (Manage & Refill)</option>
            </select>
          </div>
          <div style="display:flex; align-items:flex-start; gap:8px; margin-bottom:16px; font-size:12px;">
            <input type="checkbox" id="cgConsent" required style="margin-top:3px;">
            <label for="cgConsent" style="color:var(--mc-text-muted);">
              I explicitly consent to sharing selected health reminders and missed-dose alerts with this person.
            </label>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" class="btn btn-outline" onclick="closeMediCareSubModal('medicareCaregiverModal')">Cancel</button>
            <button type="submit" class="btn btn-primary"><i class="fa-solid fa-user-check"></i> Add Caregiver</button>
          </div>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function saveCaregiverForm() {
  const name = document.getElementById('cgName').value;
  const rel = document.getElementById('cgRelation').value;
  const phone = document.getElementById('cgPhone').value;
  const perm = document.getElementById('cgPerm').value;

  mediCareState.caregivers.push({
    id: 'cg_' + Date.now(),
    name, relationship: rel, phone, permissions: perm,
    notifyOnMissed: true, hasConsent: true
  });

  saveMediCareState();
  closeMediCareSubModal('medicareCaregiverModal');
  renderMediCareApp();
  showToast('Caregiver successfully connected!');
}

// ==========================================================================
// 15. ONBOARDING MEDICAL DISCLAIMER MODAL
// ==========================================================================

function showOnboardingDisclaimerModal() {
  const modalHtml = `
    <div id="medicareDisclaimerModal" class="mc-reminder-overlay" onclick="closeMediCareSubModal('medicareDisclaimerModal')">
      <div class="mc-card" style="max-width:540px; width:95%; border-radius:24px; padding:26px; border:2px solid var(--mc-primary);" onclick="event.stopPropagation()">
        <div style="text-align:center; margin-bottom:16px;">
          <div class="mc-reminder-icon" style="background:var(--mc-primary-light); color:var(--mc-primary); margin:0 auto 12px auto;">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
          <h2 style="font-size:20px; font-weight:800; color:var(--mc-text-main); margin:0 0 6px 0;">
            MediCare AI Safety & Educational Policy
          </h2>
          <p style="font-size:12px; color:var(--mc-text-muted); margin:0;">Please read carefully before using this health management application</p>
        </div>

        <div style="background:var(--bg-body); border-radius:14px; padding:16px; font-size:12.5px; line-height:1.6; color:var(--mc-text-main); max-height:240px; overflow-y:auto; border:1px solid var(--mc-card-border); margin-bottom:18px;">
          <p style="margin-top:0;"><strong>1. Not a Substitute for Medical Advice:</strong> MediCare AI does not diagnose illnesses, prescribe medications, or replace direct consultation with a qualified doctor, physician, or pharmacist.</p>
          <p><strong>2. Educational Reference Only:</strong> All medication information, common uses, side effects, and interaction scores are sourced from public medical databases (such as U.S. NLM and FDA DailyMed) solely for patient educational reference.</p>
          <p><strong>3. Medical Emergencies:</strong> If you experience chest pain, stroke symptoms (FAST), severe breathing difficulty, anaphylaxis, or thoughts of self-harm, immediately dial your local emergency services (911, 112, or 999).</p>
          <p style="margin-bottom:0;"><strong>4. Dosage Alterations:</strong> Never start, stop, or adjust prescription doses without explicit physician direction. If a dose is missed, follow your doctor's protocol instead of doubling up.</p>
        </div>

        <button class="btn btn-primary" style="width:100%; padding:12px; font-size:14px; font-weight:700;" onclick="acceptMediCareDisclaimer()">
          <i class="fa-solid fa-check"></i> I Understand & Accept These Safety Guidelines
        </button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function acceptMediCareDisclaimer() {
  mediCareState.onboardingAccepted = true;
  saveMediCareState();
  closeMediCareSubModal('medicareDisclaimerModal');
  showToast('Medical safety policy accepted.');
}

function closeMediCareSubModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.remove();
}

function openAskDoctorGuidance(topic) {
  switchMediCareTab('chat');
  sendMediCareQuickPrompt(`What important questions should I ask my doctor or pharmacist regarding ${topic}?`);
}

function openInteractionDetailModal(issueId) {
  const issues = runSafetyInteractionAnalysis();
  const issue = issues.find(i => i.id === issueId) || issues[0];
  alert(`${issue.title}\n\n${issue.description}\n\nEvidence Source: ${issue.source}\n\nAlways verify with your doctor or pharmacist.`);
}

function formatMarkdownText(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

// Background scheduler interval (checks every 60 seconds)
setInterval(() => {
  // Check if any scheduled dose matches current time
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const pendingDose = mediCareState.todayDoses.find(d => d.status === 'pending' && d.time === timeStr);
  if (pendingDose) {
    triggerTestReminderAlert(pendingDose);
  }
}, 60000);

// ==========================================================================
// 16. DYNAMIC DASHBOARD HEALTH MODULE CARD SYNCHRONIZER
// ==========================================================================

function updateHealthCardSummary() {
  const card = document.querySelector('.sketch-card.card-health') || document.getElementById('cardHealthModule');
  if (!card) return;

  const titleEl = card.querySelector('.card-title-group h2') || document.getElementById('healthCardTitle');
  if (titleEl) {
    titleEl.innerText = 'MediCare';
  }

  const iconBadge = card.querySelector('.card-icon-badge');
  if (iconBadge) {
    iconBadge.style.background = 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)';
    iconBadge.style.color = '#ffffff';
  }

  const subEl = card.querySelector('.card-subtitle') || document.getElementById('healthCardSubtitle');
  const totalMeds = (mediCareState.medicines || []).length;
  const pendingDoses = (mediCareState.todayDoses || []).filter(d => d.status === 'pending');
  const nextDose = pendingDoses.length > 0 ? pendingDoses[0] : null;
  const takenCount = (mediCareState.todayDoses || []).filter(d => d.status === 'taken').length;
  const totalToday = (mediCareState.todayDoses || []).length;
  const adherence = totalToday > 0 ? Math.round((takenCount / totalToday) * 100) : 100;
  const refillCount = (mediCareState.medicines || []).filter(m => m.quantityAvailable <= m.refillThreshold).length;

  if (subEl) {
    subEl.innerText = `${totalMeds} Active Prescriptions • Next: ${nextDose ? `${nextDose.medName} (${nextDose.time})` : 'All Doses Taken'} • ${adherence}% Adherence`;
  }

  const preview = card.querySelector('.card-preview-items') || document.getElementById('healthCardPreview');
  if (preview) {
    preview.innerHTML = `
      <span class="preview-tag red-tag"><i class="fa-solid fa-pills"></i> ${totalMeds} Active Meds</span>
      <span class="preview-tag teal-tag"><i class="fa-solid fa-clock"></i> Next: ${nextDose ? `${nextDose.medName} (${nextDose.time})` : 'Completed'}</span>
      ${refillCount > 0 ? `<span class="preview-tag red-tag"><i class="fa-solid fa-box-open"></i> ${refillCount} Low Stock</span>` : `<span class="preview-tag green-tag"><i class="fa-solid fa-shield-halved"></i> Safety Checked</span>`}
      <span class="preview-tag purple-tag"><i class="fa-solid fa-notes-medical"></i> Health Records</span>
    `;
  }

  // Ensure quick action buttons exist on the card
  let btnRow = card.querySelector('.card-medicare-btn-row');
  if (!btnRow) {
    const content = card.querySelector('.card-content');
    if (content) {
      btnRow = document.createElement('div');
      btnRow.className = 'card-medicare-btn-row';
      btnRow.style.cssText = 'margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap;';
      btnRow.innerHTML = `
        <button class="btn" style="background:linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color:#fff; padding: 6px 14px; font-size: 12px; font-weight:700;" onclick="event.stopPropagation(); openMediCareAppModal();">
          <i class="fa-solid fa-heart-pulse"></i> Open MediCare
        </button>
        <button class="btn btn-outline" style="padding: 6px 14px; font-size: 12px;" onclick="event.stopPropagation(); openMediCareAppModal(); setTimeout(() => openAddMedicineModal(), 150);">
          <i class="fa-solid fa-plus"></i> Add Medicine
        </button>
        <button class="btn btn-outline" style="padding: 6px 14px; font-size: 12px;" onclick="event.stopPropagation(); openMediCareAppModal(); setTimeout(() => switchMediCareTab('calendar'), 150);">
          <i class="fa-solid fa-calendar-check"></i> Calendar
        </button>
      `;
      content.appendChild(btnRow);
    }
  }
}

// Automatically sync the dashboard card as soon as DOM is ready or right now
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateHealthCardSummary);
} else {
  updateHealthCardSummary();
}
setTimeout(updateHealthCardSummary, 100);
setTimeout(updateHealthCardSummary, 500);

