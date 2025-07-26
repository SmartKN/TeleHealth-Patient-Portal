import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import MyPrescriptions from './pages/MyPrescriptions.jsx';
import ScheduleAppointment from './pages/ScheduleAppointment.jsx';
import VideoCall from './pages/VideoCall.jsx';
import MyAppointments from './pages/MyAppoinments.jsx';

const drawerWidth = 240;

export default function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              TeleHealth Patient Portal
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <List>
            {[['My Appointments', '/'], ['Schedule Appointment', '/schedule'], ['My Prescriptions', '/prescriptions'], ['Video Call', '/video']].map(([text, path]) => (
              <ListItem button key={text} component={Link} to={path}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<MyAppointments />} />
            <Route path="/schedule" element={<ScheduleAppointment />} />
            <Route path="/prescriptions" element={<MyPrescriptions />} />
            <Route path="/video" element={<VideoCall />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}