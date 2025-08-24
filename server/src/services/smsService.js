const SMS = require('../models/SMS');

// SMS service without external dependencies - just log messages
const sendSMS = async (farmerId, farmerName, phoneNumber, message, messageType) => {
  try {
    console.log(`📱 SMS would be sent to ${farmerName} (${phoneNumber}): ${message}`);
    
    // Save SMS record to database as "Logged" (not actually sent)
    const smsRecord = new SMS({
      farmerId,
      farmerName,
      farmerPhone: phoneNumber,
      message,
      messageType,
      status: 'Logged'
    });

    await smsRecord.save();

    return {
      success: true,
      messageId: `local_${Date.now()}`,
      status: 'Logged'
    };
  } catch (error) {
    console.error('SMS logging failed:', error);
    
    return {
      success: false,
      error: error.message
    };
  }
};

const sendBulkSMS = async (farmers, message, messageType) => {
  const results = [];
  
  for (const farmer of farmers) {
    const result = await sendSMS(
      farmer._id,
      farmer.name,
      farmer.mobileNumber,
      message,
      messageType
    );
    results.push(result);
  }

  return results;
};

const getRecentSMS = async (limit = 10) => {
  try {
    return await SMS.find()
      .sort({ sentAt: -1 })
      .limit(limit)
      .populate('farmerId', 'name mobileNumber');
  } catch (error) {
    console.error('Error fetching recent SMS:', error);
    throw error;
  }
};

module.exports = {
  sendSMS,
  sendBulkSMS,
  getRecentSMS
};
