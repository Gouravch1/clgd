const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  createdAt: {
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

const User = mongoose.model('User', userSchema);

module.exports = User;