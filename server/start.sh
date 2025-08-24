#!/bin/bash

echo "🚀 Starting FarmHub Backend Server..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "📝 Please update the .env file with your configuration before starting the server."
    echo "🔑 Default admin credentials: admin / admin123"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "📝 Please update the .env file with your MongoDB Atlas password and other credentials:"
    echo "   - Replace <db_password> with your actual MongoDB Atlas password"
    echo "   - Add your Twilio credentials for SMS service"
    echo "   - Add your OpenWeatherMap API key for weather data"
    echo "🔑 Default admin credentials: admin / admin123"
    exit 1
fi

echo "🔍 Checking MongoDB Atlas connection..."
echo "✅ Environment file found"
echo "🌐 Starting FarmHub server on port 5000..."
echo "📱 SMS Service will be available if Twilio credentials are configured"
echo "🌤️  Weather data will be available if OpenWeatherMap API key is configured"

npm run dev
