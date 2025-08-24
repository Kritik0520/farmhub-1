import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Search,
  Send,
  Refresh,
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  WbSunny,
  Opacity,
  Assessment,
  Logout
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface WeatherData {
  weather: {
    current: {
      temperature: number;
      humidity: number;
      description: string;
    };
    forecast: Array<{
      date: string;
      temperature: number;
      humidity: number;
    }>;
  };
  alerts: Array<{
    type: string;
    message: string;
    severity: string;
    pincode?: string;
  }>;
}

interface Farmer {
  _id: string;
  name: string;
  mobileNumber: string;
  cropName: string;
  pincode: string;
  soilType: string;
  soilHealth: string;
  seedSowingDate: string;
  createdAt: string;
  lastLogin: string;
}

interface SMSRecord {
  _id: string;
  farmerName: string;
  farmerPhone: string;
  message: string;
  messageType: string;
  status: string;
  sentAt: string;
}

const AdminDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [smsData, setSmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPincode, setSearchPincode] = useState('');
  const [searchCrop, setSearchCrop] = useState('');
  const [searchSoilType, setSearchSoilType] = useState('');
  
  // SMS states
  const [smsDialogOpen, setSmsDialogOpen] = useState(false);
  const [smsForm, setSmsForm] = useState({
    message: '',
    messageType: 'General',
    pincode: '',
    cropName: ''
  });
  
  // Weather pincode
  const [weatherPincode, setWeatherPincode] = useState('110001');
  
  const navigate = useNavigate();

  useEffect(() => {
    const credentials = localStorage.getItem('adminCredentials');
    if (!credentials) {
      navigate('/admin/login');
      return;
    }

    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch weather data
      const weatherResponse = await fetch(`http://localhost:5001/api/admin/weather?pincode=${weatherPincode}`);
      if (weatherResponse.ok) {
        const weather = await weatherResponse.json();
        setWeatherData(weather);
      }

      // Fetch alerts
      const alertsResponse = await fetch('http://localhost:5001/api/admin/alerts');
      if (alertsResponse.ok) {
        const alertsData = await alertsResponse.json();
        setAlerts(alertsData.alerts);
      }

      // Fetch SMS statistics
      const smsResponse = await fetch('http://localhost:5001/api/admin/sms-statistics');
      if (smsResponse.ok) {
        const sms = await smsResponse.json();
        setSmsData(sms);
      }

      // Fetch initial farmers
      const farmersResponse = await fetch('http://localhost:5001/api/admin/search-farmers');
      if (farmersResponse.ok) {
        const farmersData = await farmersResponse.json();
        setFarmers(farmersData.farmers);
      }
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('query', searchQuery);
      if (searchPincode) params.append('pincode', searchPincode);
      if (searchCrop) params.append('cropName', searchCrop);
      if (searchSoilType) params.append('soilType', searchSoilType);

      const response = await fetch(`http://localhost:5001/api/admin/search-farmers?${params}`);
      if (response.ok) {
        const data = await response.json();
        setFarmers(data.farmers);
      }
    } catch (err) {
      setError('Search failed');
    }
  };

  const handleSendSMS = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/admin/send-bulk-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smsForm),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`SMS sent to ${result.totalSent} farmers`);
        setSmsDialogOpen(false);
        fetchDashboardData(); // Refresh data
      } else {
        setError('Failed to send SMS');
      }
    } catch (err) {
      setError('Failed to send SMS');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminCredentials');
    navigate('/admin/login');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning': return 'error';
      case 'info': return 'info';
      default: return 'success';
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <LinearProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>Loading admin dashboard...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" color="primary">
            🔐 Admin Dashboard
          </Typography>
          <Button variant="outlined" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Weather Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">
                  🌤️ Real-time Weather
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    size="small"
                    label="Pincode"
                    value={weatherPincode}
                    onChange={(e) => setWeatherPincode(e.target.value)}
                    sx={{ width: 120 }}
                  />
                  <IconButton onClick={fetchDashboardData}>
                    <Refresh />
                  </IconButton>
                </Box>
              </Box>
              
              {weatherData?.weather?.current && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>Current Weather</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <WbSunny sx={{ fontSize: 40, color: 'orange' }} />
                        <Typography variant="h6">
                          {weatherData.weather.current.temperature}°C
                        </Typography>
                        <Typography variant="body2">Temperature</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Opacity sx={{ fontSize: 40, color: 'blue' }} />
                        <Typography variant="h6">
                          {weatherData.weather.current.humidity}%
                        </Typography>
                        <Typography variant="body2">Humidity</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">
                          {weatherData.weather.current.description}
                        </Typography>
                        <Typography variant="body2">Condition</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {weatherData?.weather?.forecast && (
                <>
                  <Typography variant="h6" gutterBottom>5-Day Forecast</Typography>
                  <Grid container spacing={1}>
                    {weatherData.weather.forecast.map((day, index) => (
                      <Grid item xs={2.4} key={index}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </Typography>
                          <Typography variant="h6">
                            {day.temperature}°C
                          </Typography>
                          <Typography variant="caption">
                            {day.humidity}%
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Paper>
          </Grid>

          {/* Smart Alerts */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                🚨 Smart Alerts
              </Typography>
              
              {alerts.length > 0 ? (
                <List dense>
                  {alerts.slice(0, 10).map((alert, index) => (
                    <ListItem key={index}>
                      <Alert 
                        severity={getSeverityColor(alert.severity) as any}
                        sx={{ width: '100%' }}
                      >
                        {alert.message}
                        {alert.pincode && (
                          <Chip 
                            label={alert.pincode} 
                            size="small" 
                            sx={{ ml: 1 }} 
                          />
                        )}
                      </Alert>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No alerts at the moment.
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Farmer Search */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                🔍 Search Farmers
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Search Query"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Name or mobile"
                  />
                </Grid>
                
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={searchPincode}
                    onChange={(e) => setSearchPincode(e.target.value)}
                    placeholder="6-digit pincode"
                  />
                </Grid>
                
                <Grid item xs={12} sm={2}>
                  <TextField
                    fullWidth
                    label="Crop"
                    value={searchCrop}
                    onChange={(e) => setSearchCrop(e.target.value)}
                    placeholder="Crop name"
                  />
                </Grid>
                
                <Grid item xs={12} sm={2}>
                  <FormControl fullWidth>
                    <InputLabel>Soil Type</InputLabel>
                    <Select
                      value={searchSoilType}
                      label="Soil Type"
                      onChange={(e) => setSearchSoilType(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Clay">Clay</MenuItem>
                      <MenuItem value="Sandy">Sandy</MenuItem>
                      <MenuItem value="Loamy">Loamy</MenuItem>
                      <MenuItem value="Silt">Silt</MenuItem>
                      <MenuItem value="Peaty">Peaty</MenuItem>
                      <MenuItem value="Chalky">Chalky</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSearch}
                    startIcon={<Search />}
                    sx={{ height: 56 }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Mobile</TableCell>
                      <TableCell>Crop</TableCell>
                      <TableCell>Pincode</TableCell>
                      <TableCell>Soil Type</TableCell>
                      <TableCell>Soil Health</TableCell>
                      <TableCell>Registered</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {farmers.map((farmer) => (
                      <TableRow key={farmer._id}>
                        <TableCell>{farmer.name}</TableCell>
                        <TableCell>{farmer.mobileNumber}</TableCell>
                        <TableCell>{farmer.cropName}</TableCell>
                        <TableCell>{farmer.pincode}</TableCell>
                        <TableCell>{farmer.soilType}</TableCell>
                        <TableCell>
                          <Chip 
                            label={farmer.soilHealth} 
                            color={farmer.soilHealth === 'Excellent' ? 'success' : 
                                   farmer.soilHealth === 'Good' ? 'primary' : 
                                   farmer.soilHealth === 'Fair' ? 'warning' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(farmer.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  Found {farmers.length} farmers
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* SMS Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">
                  📱 SMS Management
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setSmsDialogOpen(true)}
                  startIcon={<Send />}
                >
                  Send Bulk SMS
                </Button>
              </Box>
              
              {smsData && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Total SMS Sent
                        </Typography>
                        <Typography variant="h4">
                          {smsData.statistics.total}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Success Rate
                        </Typography>
                        <Typography variant="h4">
                          {smsData.statistics.successRate}%
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          This Week
                        </Typography>
                        <Typography variant="h4">
                          {smsData.smsLastWeek}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <Card>
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Recent SMS
                        </Typography>
                        <Typography variant="h4">
                          {smsData.recentSMS.length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}
              
              {smsData?.recentSMS && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Recent SMS (Top 10)
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Farmer Name</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Message Type</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Sent At</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {smsData.recentSMS.map((sms: SMSRecord) => (
                          <TableRow key={sms._id}>
                            <TableCell>{sms.farmerName}</TableCell>
                            <TableCell>{sms.farmerPhone}</TableCell>
                            <TableCell>{sms.messageType}</TableCell>
                            <TableCell>
                              <Chip 
                                label={sms.status} 
                                color={sms.status === 'Sent' ? 'success' : 'error'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {new Date(sms.sentAt).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* SMS Dialog */}
      <Dialog open={smsDialogOpen} onClose={() => setSmsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Bulk SMS</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={smsForm.message}
                onChange={(e) => setSmsForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your message..."
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Message Type</InputLabel>
                <Select
                  value={smsForm.messageType}
                  label="Message Type"
                  onChange={(e) => setSmsForm(prev => ({ ...prev, messageType: e.target.value }))}
                >
                  <MenuItem value="Weather Alert">Weather Alert</MenuItem>
                  <MenuItem value="Market Update">Market Update</MenuItem>
                  <MenuItem value="Crop Advice">Crop Advice</MenuItem>
                  <MenuItem value="General">General</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode (Optional)"
                value={smsForm.pincode}
                onChange={(e) => setSmsForm(prev => ({ ...prev, pincode: e.target.value }))}
                placeholder="Send to specific area"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Crop Name (Optional)"
                value={smsForm.cropName}
                onChange={(e) => setSmsForm(prev => ({ ...prev, cropName: e.target.value }))}
                placeholder="Send to specific crop farmers"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSmsDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSendSMS} 
            variant="contained"
            disabled={!smsForm.message}
          >
            Send SMS
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
