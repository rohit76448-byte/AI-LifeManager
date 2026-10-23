/**
 * MEDICARE AI HEALTH & MEDICATION MANAGEMENT CONTROLLER
 */

const { db, saveDatabase } = require('../config/database');
const { analyzeInteractions } = require('../services/drugInteraction.service');

exports.getMedicines = (req, res) => {
  res.json({
    success: true,
    total: (db.medicareMedicines || []).length,
    medicines: db.medicareMedicines || []
  });
};

exports.addMedicine = (req, res) => {
  const { name, genericName, condition, type, strength, dosageAmount, frequency, instructions, quantityAvailable } = req.body;

  if (!name || !strength || !frequency) {
    return res.status(400).json({ success: false, message: 'Name, strength, and frequency are required.' });
  }

  const newMed = {
    id: `med_${Date.now()}`,
    name: name.trim(),
    genericName: genericName || name.trim(),
    condition: condition || 'General Health',
    type: type || 'Tablet',
    strength: strength.trim(),
    dosageAmount: dosageAmount || '1 dose',
    frequency: frequency.trim(),
    instructions: instructions || 'Use only as directed by a healthcare professional',
    quantityAvailable: parseInt(quantityAvailable) || 30,
    refillThreshold: 5,
    createdAt: new Date().toISOString()
  };

  db.medicareMedicines.push(newMed);
  saveDatabase();

  res.status(201).json({
    success: true,
    message: 'Medicine added to active prescriptions regimen.',
    medicine: newMed
  });
};

exports.getTodayDoses = (req, res) => {
  res.json({
    success: true,
    total: (db.medicareDoses || []).length,
    doses: db.medicareDoses || []
  });
};

exports.markDoseTaken = (req, res) => {
  const { id } = req.params;
  const dose = (db.medicareDoses || []).find(d => d.id === id);

  if (!dose) {
    return res.status(404).json({ success: false, message: 'Scheduled dose not found.' });
  }

  dose.status = 'taken';
  dose.takenAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  saveDatabase();

  res.json({
    success: true,
    message: `Dose of ${dose.medName} marked as taken at ${dose.takenAt}.`,
    dose
  });
};

exports.checkDrugSafety = (req, res) => {
  const { medicines } = req.body;
  const listToCheck = Array.isArray(medicines) ? medicines : (db.medicareMedicines || []);

  const result = analyzeInteractions(listToCheck);
  res.json({
    success: true,
    ...result
  });
};

exports.getAppointments = (req, res) => {
  res.json({
    success: true,
    total: (db.medicareAppointments || []).length,
    appointments: db.medicareAppointments || []
  });
};

exports.createAppointment = (req, res) => {
  const { doctorName, specialty, clinic, appointmentDate, appointmentTime, notes } = req.body;

  if (!doctorName || !appointmentDate) {
    return res.status(400).json({ success: false, message: 'Doctor name and appointment date are required.' });
  }

  const newApt = {
    id: `apt_${Date.now()}`,
    doctorName: doctorName.trim(),
    specialty: specialty || 'Specialist Physician',
    clinic: clinic || 'Medical Care Center',
    appointmentDate,
    appointmentTime: appointmentTime || '10:00 AM',
    notes: notes || '',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  db.medicareAppointments.push(newApt);
  saveDatabase();

  res.status(201).json({
    success: true,
    message: 'Appointment scheduled and saved to health calendar.',
    appointment: newApt
  });
};
