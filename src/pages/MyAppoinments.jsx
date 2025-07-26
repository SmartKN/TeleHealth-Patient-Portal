import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box
} from '@mui/material';
const API_BASE = import.meta.env.VITE_API_URL;
export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/appointments`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch appointments');
        return res.json();
      })
      .then((data) => setAppointments(data))
      .catch((err) => setError(err.message));
  }, []);

  const filtered = appointments.filter((app) => {
    if (filter === 'upcoming') {
      const today = new Date();
      const appDate = new Date(`${app.date}T${app.time}`);
      return appDate > today;
    }
    return true;
  });

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        My Appointments
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter</InputLabel>
        <Select value={filter} label="Filter" onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
        </Select>
      </FormControl>

      {error && <Typography color="error">{error}</Typography>}

      {filtered.length === 0 ? (
        <Typography>No appointments to show.</Typography>
      ) : (
        filtered.map((a, i) => (
          <Card key={i} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Dr. {a.doctor}</Typography>
              <Typography>{a.date} at {a.time} ({a.type})</Typography>
              <Typography>Status: {a.status}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
