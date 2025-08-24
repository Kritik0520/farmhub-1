import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

const FarmerRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    soilType: '',
    soilHealth: '',
    cropName: '',
    seedSowingDate: new Date(),
    pincode: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5001/api/farmers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/farmer/login');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.mobileNumber.length === 10 &&
      formData.soilType &&
      formData.soilHealth &&
      formData.cropName.trim() &&
      formData.pincode.length === 6
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
              🌾 Farmer Registration
            </Typography>
            
            <Typography variant="body1" align="center" sx={{ mb: 4 }}>
              Join FarmHub to get personalized farming insights and recommendations
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Mobile Number"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => handleChange('mobileNumber', e.target.value)}
                    placeholder="10-digit mobile number"
                    inputProps={{
                      pattern: "[0-9]{10}",
                      maxLength: 10
                    }}
                    helperText="Enter your 10-digit mobile number"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Soil Type</InputLabel>
                    <Select
                      value={formData.soilType}
                      label="Soil Type"
                      onChange={(e) => handleChange('soilType', e.target.value)}
                    >
                      <MenuItem value="Clay">Clay</MenuItem>
                      <MenuItem value="Sandy">Sandy</MenuItem>
                      <MenuItem value="Loamy">Loamy</MenuItem>
                      <MenuItem value="Silt">Silt</MenuItem>
                      <MenuItem value="Peaty">Peaty</MenuItem>
                      <MenuItem value="Chalky">Chalky</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Soil Health</InputLabel>
                    <Select
                      value={formData.soilHealth}
                      label="Soil Health"
                      onChange={(e) => handleChange('soilHealth', e.target.value)}
                    >
                      <MenuItem value="Excellent">Excellent</MenuItem>
                      <MenuItem value="Good">Good</MenuItem>
                      <MenuItem value="Fair">Fair</MenuItem>
                      <MenuItem value="Poor">Poor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Crop Name"
                    value={formData.cropName}
                    onChange={(e) => handleChange('cropName', e.target.value)}
                    placeholder="e.g., Rice, Wheat, Cotton"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)}
                    placeholder="6-digit pincode"
                    inputProps={{
                      pattern: "[0-9]{6}",
                      maxLength: 6
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <DatePicker
                    label="Seed Sowing Date"
                    value={formData.seedSowingDate}
                    onChange={(date) => handleChange('seedSowingDate', date)}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2, py: 1.5 }}
                disabled={loading || !isFormValid()}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link href="/farmer/login" variant="body2">
                    Login here
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default FarmerRegister;
