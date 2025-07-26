import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
const API_BASE = import.meta.env.VITE_API_URL;
export default function MyPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('all');

  useEffect(() => {
    fetch(`${API_BASE}/api/prescriptions`)
      .then(res => res.json())
      .then(data => setPrescriptions(data));
  }, []);


  const doctorList = [...new Set(prescriptions.map(p => p.doctor))];

 
  const filtered = prescriptions
    .filter(p =>
      p.medication.toLowerCase().includes(search.toLowerCase()) &&
      (doctorFilter === 'all' || p.doctor === doctorFilter)
    )
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        My Prescriptions
      </Typography>

      <TextField
        fullWidth
        label="Search Medication"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter by Doctor</InputLabel>
        <Select
          value={doctorFilter}
          label="Filter by Doctor"
          onChange={e => setDoctorFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          {doctorList.map((doctor, i) => (
            <MenuItem key={i} value={doctor}>
              Dr. {doctor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {filtered.length === 0 ? (
        <Typography>No prescriptions found.</Typography>
      ) : (
        filtered.map((p, i) => (
          <Card key={i} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{p.medication}</Typography>
              <Typography>Dosage: {p.dosage}, Frequency: {p.frequency}</Typography>
              <Typography>
                Duration: {p.startDate} to {p.endDate}
              </Typography>
              <Typography>Prescribed by Dr. {p.doctor}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
