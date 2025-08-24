import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";

// Import the farming platform components
import Home from "./pages/Home";
import FarmerLogin from "./pages/FarmerLogin";
import FarmerRegister from "./pages/FarmerRegister";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Navbar component
const Navbar: React.FC = () => (
  <AppBar position="static" sx={{ bgcolor: '#388e3c' }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        FarmHub - Precision Farming Advisor
      </Typography>
      <Button color="inherit" href="/">Home</Button>
      <Button color="inherit" href="/farmer/login">Farmer Login</Button>
      <Button color="inherit" href="/admin/login">Admin Login</Button>
    </Toolbar>
  </AppBar>
);

const App: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/register" element={<FarmerRegister />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
};

export default App;
