const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Common fields
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['student', 'organization'],
    required: true,
    default: 'student'
  },
  
  // Student specific fields
  university: {
    type: String,
    trim: true
  },
  studentId: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  major: {
    type: String,
    trim: true
  },
  academicYear: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    trim: true
  },
  graduationYear: {
    type: String,
    trim: true
  },

  // Organization specific fields
  orgName: {
    type: String,
    trim: true
  },
  orgType: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  registrationNumber: {
    type: String,
    trim: true
  },
  establishedYear: {
    type: String,
    trim: true
  },
  employeeCount: {
    type: Number
  },
  industryCategory: {
    type: String,
    trim: true
  },

  // Common additional fields
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Drop any existing indexes before creating new ones
mongoose.connection.once('open', async () => {
  try {
    await mongoose.connection.collection('users').dropIndexes();
  } catch (err) {
    console.log('No indexes to drop');
  }
});

// Create new indexes
userSchema.index({ email: 1 }, { unique: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;