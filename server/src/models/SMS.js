const mongoose = require('mongoose');

const smsSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true
  },
  farmerName: {
    type: String,
    required: true
  },
  farmerPhone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    required: true,
    enum: ['Weather Alert', 'Market Update', 'Crop Advice', 'General']
  },
  status: {
    type: String,
    required: true,
    enum: ['Sent', 'Delivered', 'Failed', 'Not Configured', 'Logged'],
    default: 'Logged'
  },
  twilioSid: {
    type: String
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  deliveryTime: {
    type: Date
  }
});

// Index for quick retrieval of recent SMS
smsSchema.index({ sentAt: -1 });

module.exports = mongoose.model('SMS', smsSchema);
