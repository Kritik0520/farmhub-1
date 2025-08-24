import React from 'react';
import {
  Box, Grid, Typography, Paper, Card, CardContent, Button, Container
} from '@mui/material';
import { Agriculture, WbSunny, TrendingUp, Notifications } from '@mui/icons-material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
          🌾 FarmHub
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom color="text.secondary">
          Precision Farming Advisor
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}>
          Empowering Indian farmers with intelligent agricultural decision-support through real-time weather, 
          market intelligence, and smart farming recommendations.
        </Typography>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} mb={6}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', p: 3 }}>
            <Box textAlign="center">
              <Agriculture sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Smart Farming Decisions
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get intelligent recommendations for irrigation, fertilization, pest control, and crop management 
                based on real-time weather data and soil conditions.
              </Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', p: 3 }}>
            <Box textAlign="center">
              <WbSunny sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Weather Intelligence
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Access accurate weather forecasts and real-time alerts to protect your crops and optimize 
                farming operations based on climate conditions.
              </Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', p: 3 }}>
            <Box textAlign="center">
              <TrendingUp sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Market Intelligence
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Stay informed about MSP prices, market trends, and local crop demand to maximize 
                your profits and make better selling decisions.
              </Typography>
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', p: 3 }}>
            <Box textAlign="center">
              <Notifications sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Smart Alerts
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Receive timely notifications about weather changes, market opportunities, and farming 
                best practices to stay ahead of challenges.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
        <Typography variant="h4" gutterBottom>
          Ready to Transform Your Farming?
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Join thousands of farmers who are already using FarmHub to increase yields and profits.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            size="large" 
            href="/farmer/register"
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
          >
            Register as Farmer
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            href="/farmer/login"
            sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'grey.100', bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Farmer Login
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            href="/admin/login"
            sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'grey.100', bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            Admin Login
          </Button>
        </Box>
      </Paper>

      {/* How It Works */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          How FarmHub Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 'bold' }}>1</Typography>
              <Typography variant="h6" gutterBottom>Register & Profile</Typography>
              <Typography variant="body2" color="text.secondary">
                Create your farmer profile with soil type, crop information, and location details.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 'bold' }}>2</Typography>
              <Typography variant="h6" gutterBottom>Get Insights</Typography>
              <Typography variant="body2" color="text.secondary">
                Receive personalized farming recommendations based on weather and market data.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 'bold' }}>3</Typography>
              <Typography variant="h6" gutterBottom>Smart Alerts</Typography>
              <Typography variant="body2" color="text.secondary">
                Stay updated with real-time weather alerts and market price notifications.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 'bold' }}>4</Typography>
              <Typography variant="h6" gutterBottom>Optimize & Profit</Typography>
              <Typography variant="body2" color="text.secondary">
                Make informed decisions to increase crop yields and maximize profits.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
