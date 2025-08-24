// Simplified cron service without external API dependencies
const cron = require('node-cron');
const Farmer = require('../models/Farmer');
const { sendSMS } = require('./smsService');

// Function to send daily farming tips (simplified)
const sendDailyFarmingTips = async () => {
  try {
    console.log('🌾 Sending daily farming tips...');
    
    const farmers = await Farmer.find({ isActive: true });
    
    for (const farmer of farmers) {
      try {
        // Generate personalized farming tip based on crop and soil
        let tip = '';
        
        if (farmer.cropName.toLowerCase().includes('rice')) {
          tip = 'Rice farming tip: Maintain 2-3 inches of water level during vegetative growth.';
        } else if (farmer.cropName.toLowerCase().includes('wheat')) {
          tip = 'Wheat farming tip: Ensure proper irrigation at crown root initiation stage.';
        } else if (farmer.cropName.toLowerCase().includes('cotton')) {
          tip = 'Cotton farming tip: Monitor for bollworm infestation and apply timely pesticides.';
        } else {
          tip = 'General tip: Regular soil testing helps optimize fertilizer application.';
        }
        
        // Add soil-specific advice
        if (farmer.soilHealth === 'Poor') {
          tip += ' Consider organic matter addition to improve soil health.';
        }
        
        const message = `Daily Farming Tip: ${tip} - FarmHub`;
        
        await sendSMS(
          farmer._id,
          farmer.name,
          farmer.mobileNumber,
          message,
          'Crop Advice'
        );
        
        console.log(`📱 Daily tip logged for ${farmer.name} (${farmer.mobileNumber})`);
      } catch (error) {
        console.error(`Error logging daily tip for farmer ${farmer._id}:`, error);
      }
    }
    
    console.log('✅ Daily farming tips logged');
  } catch (error) {
    console.error('❌ Error in daily tips cron job:', error);
  }
};

// Initialize cron jobs
const initCronJobs = () => {
  // Daily farming tips at 8 AM IST
  cron.schedule('0 8 * * *', sendDailyFarmingTips, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
  });
  
  console.log('⏰ Cron jobs initialized (daily farming tips only)');
};

module.exports = {
  initCronJobs,
  sendDailyFarmingTips
};
