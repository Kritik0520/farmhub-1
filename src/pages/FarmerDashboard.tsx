import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Alert,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  IconButton
} from '@mui/material';
import {
  WbSunny,
  Opacity,
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Agriculture,
  Schedule,
  Assessment,
  Refresh
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface FarmerData {
  id: string;
  name: string;
  cropName: string;
  soilType: string;
  soilHealth: string;
}

interface WeatherData {
  current: {
    temperature: number;
    humidity: number;
    description: string;
    windSpeed: number;
    pressure: number;
  };
  forecast: Array<{
    date: string;
    temperature: number;
    humidity: number;
    description: string;
  }>;
  alerts: Array<{
    type: string;
    message: string;
    severity: string;
  }>;
}

interface MarketData {
  currentCrop: {
    name: string;
    currentPrice: number;
    msp: number;
    trend: string;
  };
  topCropsInArea: Array<{
    name: string;
    currentPrice: number;
    trend: string;
  }>;
}

const FarmerDashboard: React.FC = () => {
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [overviewData, setOverviewData] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('farmerToken');
    const storedData = localStorage.getItem('farmerData');
    
    if (!token || !storedData) {
      navigate('/farmer/login');
      return;
    }

    try {
      setFarmerData(JSON.parse(storedData));
      fetchDashboardData(token);
    } catch (err) {
      navigate('/farmer/login');
    }
  }, [navigate]);

  const fetchDashboardData = async (token: string) => {
    try {
      setLoading(true);
      
      // Fetch overview data
      const overviewResponse = await fetch('http://localhost:5001/api/farmers/overview', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (overviewResponse.ok) {
        const overview = await overviewResponse.json();
        setOverviewData(overview);
      }

      // Fetch weather data
      const weatherResponse = await fetch('http://localhost:5001/api/farmers/weather', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (weatherResponse.ok) {
        const weather = await weatherResponse.json();
        setWeatherData(weather);
      }

      // Fetch market data
      const marketResponse = await fetch('http://localhost:5001/api/farmers/market', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (marketResponse.ok) {
        const market = await marketResponse.json();
        setMarketData(market);
      }
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('farmerToken');
    localStorage.removeItem('farmerData');
    navigate('/farmer/login');
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp color="success" />;
      case 'down': return <TrendingDown color="error" />;
      default: return <TrendingFlat color="action" />;
    }
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
          <Typography variant="h6" sx={{ mt: 2 }}>Loading your farming dashboard...</Typography>
        </Box>
      </Container>
    );
  }

  if (!farmerData) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" color="primary">
            🌾 Welcome, {farmerData.name}!
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Overview Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                📊 Farming Overview
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Crop
                      </Typography>
                      <Typography variant="h6">
                        {farmerData.cropName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Soil Health
                      </Typography>
                      <Typography variant="h6">
                        {farmerData.soilHealth}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {overviewData && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Current Conditions
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <WbSunny sx={{ fontSize: 40, color: 'orange' }} />
                        <Typography variant="h6">
                          {overviewData.weather?.current?.temperature}°C
                        </Typography>
                        <Typography variant="body2">Temperature</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Opacity sx={{ fontSize: 40, color: 'blue' }} />
                        <Typography variant="h6">
                          {overviewData.weather?.current?.humidity}%
                        </Typography>
                        <Typography variant="body2">Humidity</Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Assessment sx={{ fontSize: 40, color: 'green' }} />
                        <Typography variant="h6">
                          {(overviewData.farming?.ndviIndex * 100).toFixed(1)}%
                        </Typography>
                        <Typography variant="body2">NDVI Index</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {overviewData.farming?.recommendations && (
                    <>
                      <Typography variant="h6" gutterBottom>
                        💡 Recommendations
                      </Typography>
                      <List>
                        {overviewData.farming.recommendations.map((rec: string, index: number) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Agriculture color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={rec} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </>
              )}
            </Paper>
          </Grid>

          {/* Smart Alerts */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                🚨 Smart Alerts
              </Typography>
              
              {overviewData?.weather?.alerts?.map((alert: any, index: number) => (
                <Alert 
                  key={index} 
                  severity={getSeverityColor(alert.severity) as any}
                  sx={{ mb: 1 }}
                >
                  {alert.message}
                </Alert>
              ))}
              
              {overviewData?.market?.alerts?.map((alert: any, index: number) => (
                <Alert 
                  key={index} 
                  severity={getSeverityColor(alert.severity) as any}
                  sx={{ mb: 1 }}
                >
                  {alert.message}
                </Alert>
              ))}
              
              {(!overviewData?.weather?.alerts?.length && !overviewData?.market?.alerts?.length) && (
                <Typography variant="body2" color="textSecondary">
                  No alerts at the moment. All conditions are normal.
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Weather Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">
                  🌤️ Weather Forecast
                </Typography>
                <IconButton onClick={() => fetchDashboardData(localStorage.getItem('farmerToken') || '')}>
                  <Refresh />
                </IconButton>
              </Box>
              
              {weatherData?.current && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>Today</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h4" color="primary">
                        {weatherData.current.temperature}°C
                      </Typography>
                      <Typography variant="body2">{weatherData.current.description}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        Humidity: {weatherData.current.humidity}%
                      </Typography>
                      <Typography variant="body1">
                        Wind: {weatherData.current.windSpeed} km/h
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {weatherData?.forecast && (
                <>
                  <Typography variant="h6" gutterBottom>Next 4 Days</Typography>
                  <Grid container spacing={1}>
                    {weatherData.forecast.slice(1, 5).map((day, index) => (
                      <Grid item xs={3} key={index}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </Typography>
                          <Typography variant="h6">
                            {day.temperature}°C
                          </Typography>
                          <Typography variant="caption">
                            {day.description}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Paper>
          </Grid>

          {/* Market Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                🏪 Market Information
              </Typography>
              
              {marketData?.currentCrop && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Your Crop: {marketData.currentCrop.name}
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6" color="primary">
                        ₹{marketData.currentCrop.currentPrice}
                      </Typography>
                      <Typography variant="body2">Current Price</Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="h6" color="secondary">
                        ₹{marketData.currentCrop.msp}
                      </Typography>
                      <Typography variant="body2">MSP</Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      Trend:
                    </Typography>
                    {getTrendIcon(marketData.currentCrop.trend)}
                  </Box>
                </Box>
              )}
              
              {marketData?.topCropsInArea && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Top Crops in Your Area
                  </Typography>
                  <List dense>
                    {marketData.topCropsInArea.slice(0, 5).map((crop, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={crop.name}
                          secondary={`₹${crop.currentPrice} - ${crop.trend}`}
                        />
                        {getTrendIcon(crop.trend)}
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default FarmerDashboard;
