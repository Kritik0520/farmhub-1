const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  soilType: {
    type: String,
    required: true,
    enum: ['Clay', 'Sandy', 'Loamy', 'Silt', 'Peaty', 'Chalky']
  },
  soilHealth: {
    type: String,
    required: true,
    enum: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  cropName: {
    type: String,
    required: true,
    trim: true
  },
  seedSowingDate: {
    type: Date,
    required: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Index for location-based queries
farmerSchema.index({ location: '2dsphere' });

// Index for pincode-based queries
farmerSchema.index({ pincode: 1 });

module.exports = mongoose.model('Farmer', farmerSchema);

