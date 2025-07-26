import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


let appointments = [
  {
    doctor: 'John Doe',
    date: '2025-08-01',
    time: '10:00',
    type: 'video',
    status: 'confirmed',
  },
  {
    doctor: 'Jane Smith',
    date: '2025-07-28',
    time: '14:30',
    type: 'in-person',
    status: 'pending',
  },
];

const prescriptions = [
  {
    medication: 'Paracetamol',
    dosage: '500mg',
    frequency: 'Twice a day',
    startDate: '2025-07-20',
    endDate: '2025-07-30',
    doctor: 'John Doe',
  },
  {
    medication: 'Amoxicillin',
    dosage: '250mg',
    frequency: 'Three times a day',
    startDate: '2025-07-10',
    endDate: '2025-07-17',
    doctor: 'Jane Smith',
  },
];


app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

app.post('/api/appointments', (req, res) => {
  const newAppointment = { ...req.body, status: 'pending' };
  appointments.push(newAppointment);
  res.status(201).json({ message: 'Appointment created', appointment: newAppointment });
});

app.get('/api/prescriptions', (req, res) => {
  res.json(prescriptions);
});


app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
