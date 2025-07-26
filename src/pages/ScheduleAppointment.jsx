import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Snackbar,
  Alert
} from '@mui/material';

export default function ScheduleAppointment() {
  const [form, setForm] = useState({ doctor: '', date: '', time: '', type: '' });
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const API_BASE = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setToast({ open: true, message: 'Appointment scheduled!', severity: 'success' });
        setForm({ doctor: '', date: '', time: '', type: '' });
      } else {
        throw new Error('Failed to schedule appointment');
      }
    } catch (error) {
      setToast({ open: true, message: error.message, severity: 'error' });
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'grid', gap: 2, maxWidth: 400 }}
      >
        <TextField name="doctor" label="Doctor Name" value={form.doctor} onChange={handleChange} required />
        <TextField name="date" type="date" value={form.date} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        <TextField name="time" type="time" value={form.time} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        <FormControl required>
          <InputLabel>Type</InputLabel>
          <Select name="type" value={form.type} label="Type" onChange={handleChange}>
            <MenuItem value="video">Video</MenuItem>
            <MenuItem value="in-person">In-person</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">Schedule</Button>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} onClose={() => setToast({ ...toast, open: false })}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
