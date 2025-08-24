# 🌾 FarmHub - Precision Farming Advisor

A comprehensive agricultural decision-support platform that transforms satellite data and agricultural information into actionable insights for Indian farmers. FarmHub integrates satellite-derived crop health monitoring with weather forecasts and market intelligence, making space technology accessible to ground-level agriculture.

## 🎯 Project Overview

FarmHub addresses the critical information gap in Indian agriculture by providing farmers with real-time, integrated data for irrigation, fertilization, pest control, and crop sales decisions. The platform combines satellite imagery, weather data, and market intelligence to deliver simple, actionable farming advice.

## ✨ Key Features

### 🌱 Farmer Features
- **Overview Dashboard**: Crop information, weather conditions, NDVI index, and personalized recommendations
- **Smart Alerts**: Real-time weather and market alerts based on live data
- **Weather Forecast**: Current conditions and 5-day weather forecast
- **Market Intelligence**: Live MSP prices and market trends for crops
- **SMS Integration**: Receive critical alerts and farming tips via SMS

### 🔐 Admin Features
- **Real-time Weather Monitoring**: Live weather data for any pincode
- **Smart Alert Management**: Comprehensive alert system for weather and market conditions
- **Farmer Search**: Advanced search functionality to find specific farmers
- **SMS Management**: Monitor SMS delivery and send bulk messages
- **Dashboard Analytics**: Comprehensive overview of platform usage

## 🏗️ Architecture

### Backend (Node.js + Express)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication system
- **SMS Service**: Twilio integration for automated messaging
- **Weather API**: OpenWeatherMap integration
- **Market Data**: Government API integration for MSP and market prices
- **Cron Jobs**: Automated SMS alerts and farming tips

### Frontend (React + TypeScript)
- **UI Framework**: Material-UI (MUI) for modern, responsive design
- **State Management**: React hooks for local state
- **Routing**: React Router for navigation
- **Charts**: Chart.js for data visualization
- **Maps**: Leaflet for geographical data display

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Twilio account (for SMS functionality)
- OpenWeatherMap API key
- Government API access (for market data)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd farmHub-master
   ```

2. **Install frontend dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/farmhub
   JWT_SECRET=your_jwt_secret_key_here
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   WEATHER_API_KEY=your_openweathermap_api_key
   GOVT_API_KEY=your_government_api_key
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```

5. **Start MongoDB**
   ```bash
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

7. **Start the frontend application**
   ```bash
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 SMS Service Setup

### Twilio Configuration
1. Create a Twilio account at [twilio.com](https://www.twilio.com)
2. Get your Account SID and Auth Token
3. Purchase a phone number for sending SMS
4. Update the environment variables with your Twilio credentials

### SMS Features
- **Weather Alerts**: Automated alerts for extreme weather conditions
- **Market Updates**: Price alerts and MSP notifications
- **Farming Tips**: Daily personalized farming advice
- **Bulk Messaging**: Admin can send messages to specific farmer groups

## 🌤️ Weather Integration

### OpenWeatherMap Setup
1. Sign up at [openweathermap.org](https://openweathermap.org)
2. Get your API key
3. Update the `WEATHER_API_KEY` environment variable

### Weather Features
- Real-time temperature, humidity, and wind data
- 5-day weather forecast
- Automated weather alerts
- Location-based weather monitoring

## 🏪 Market Data Integration

### Government APIs
The platform integrates with government APIs to provide:
- **MSP (Minimum Support Price)**: Current MSP for various crops
- **Market Prices**: Live market prices from government sources
- **Price Trends**: Market trend analysis and alerts

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: API rate limiting to prevent abuse
- **Secure Headers**: CORS and security headers configuration

## 📊 Database Schema

### Farmer Collection
```javascript
{
  name: String,
  mobileNumber: String (unique),
  soilType: String (enum),
  soilHealth: String (enum),
  cropName: String,
  seedSowingDate: Date,
  pincode: String,
  location: GeoJSON Point,
  createdAt: Date,
  lastLogin: Date,
  isActive: Boolean
}
```

### SMS Collection
```javascript
{
  farmerId: ObjectId,
  farmerName: String,
  farmerPhone: String,
  message: String,
  messageType: String,
  status: String,
  twilioSid: String,
  sentAt: Date,
  deliveryTime: Date
}
```

## 🚀 Deployment

### Production Considerations
1. **Environment Variables**: Use production-grade secrets
2. **Database**: Use MongoDB Atlas or production MongoDB instance
3. **SSL**: Enable HTTPS for production
4. **Monitoring**: Implement logging and monitoring
5. **Backup**: Regular database backups
6. **Scaling**: Consider load balancing for high traffic

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Twilio**: For SMS service integration
- **OpenWeatherMap**: For weather data
- **Material-UI**: For the beautiful UI components
- **MongoDB**: For the robust database solution
- **Indian Government**: For agricultural data and MSP information

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation and FAQ

## 🔮 Future Enhancements

- **Satellite Integration**: Direct satellite data integration
- **AI Recommendations**: Machine learning-based farming advice
- **Mobile App**: Native mobile application
- **IoT Integration**: Sensor data integration
- **Blockchain**: Transparent supply chain tracking
- **Multi-language**: Support for regional languages

---

**FarmHub** - Empowering Indian farmers with precision agriculture technology 🌾✨
# farmhub-1
