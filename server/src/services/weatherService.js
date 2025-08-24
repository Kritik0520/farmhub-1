// Mock weather service without external API dependencies
const getWeatherByPincode = async (pincode) => {
  try {
    // Generate mock weather data based on pincode
    const mockWeatherData = {
      current: {
        temperature: Math.floor(Math.random() * 20) + 20, // 20-40°C
        humidity: Math.floor(Math.random() * 30) + 40,   // 40-70%
        description: 'Partly cloudy',
        windSpeed: Math.floor(Math.random() * 15) + 5,   // 5-20 km/h
        pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050 hPa
        timestamp: new Date()
      },
      forecast: [
        {
          date: new Date(Date.now() + 24 * 60 * 60 * 1000),
          temperature: Math.floor(Math.random() * 20) + 20,
          humidity: Math.floor(Math.random() * 30) + 40,
          description: 'Sunny'
        },
        {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          temperature: Math.floor(Math.random() * 20) + 20,
          humidity: Math.floor(Math.random() * 30) + 40,
          description: 'Cloudy'
        },
        {
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          temperature: Math.floor(Math.random() * 20) + 20,
          humidity: Math.floor(Math.random() * 30) + 40,
          description: 'Light rain'
        },
        {
          date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
          temperature: Math.floor(Math.random() * 20) + 20,
          humidity: Math.floor(Math.random() * 30) + 40,
          description: 'Partly cloudy'
        },
        {
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          temperature: Math.floor(Math.random() * 20) + 20,
          humidity: Math.floor(Math.random() * 30) + 40,
          description: 'Sunny'
        }
      ],
      location: `Area ${pincode}`
    };

    return mockWeatherData;
  } catch (error) {
    console.error('Mock weather error:', error);
    throw new Error('Failed to generate weather data');
  }
};

// Mock coordinates function - not needed for mock weather
const getCoordinatesFromPincode = async (pincode) => {
  return { lat: 0, lon: 0 }; // Mock coordinates
};

const getWeatherAlerts = (weatherData) => {
  const alerts = [];
  
  if (weatherData.current.temperature > 35) {
    alerts.push({
      type: 'High Temperature',
      message: 'High temperature alert! Consider additional irrigation.',
      severity: 'warning'
    });
  }
  
  if (weatherData.current.temperature < 10) {
    alerts.push({
      type: 'Low Temperature',
      message: 'Low temperature alert! Protect crops from frost.',
      severity: 'warning'
    });
  }
  
  if (weatherData.current.humidity < 30) {
    alerts.push({
      type: 'Low Humidity',
      message: 'Low humidity alert! Increase irrigation frequency.',
      severity: 'info'
    });
  }
  
  if (weatherData.current.windSpeed > 20) {
    alerts.push({
      type: 'High Wind',
      message: 'High wind alert! Secure crops and structures.',
      severity: 'warning'
    });
  }

  return alerts;
};

module.exports = {
  getWeatherByPincode,
  getWeatherAlerts
};
