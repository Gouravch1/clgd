const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Sign Up Controller
exports.signup = async (req, res) => {
  try {
    const {
      // Common fields
      email,
      password,
      userType,
      fullName,

      // Student fields
      university,
      studentId,
      country,
      major,
      academicYear,
      department,
      graduationYear,

      // Organization fields
      orgName,
      orgType,
      website,
      location,
      registrationNumber,
      establishedYear,
      employeeCount,
      industryCategory
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user object based on user type
    const userData = {
      email,
      password,
      userType: userType || 'student',
      fullName,
      ...(userType === 'student' ? {
        // Student specific fields
        university,
        studentId,
        country,
        major,
        academicYear,
        department,
        graduationYear
      } : {
        // Organization specific fields
        orgName,
        orgType,
        website,
        location,
        registrationNumber,
        establishedYear,
        employeeCount: employeeCount ? Number(employeeCount) : undefined,
        industryCategory
      })
    };

    // Create new user
    const user = new User(userData);
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response
    res.status(201).json({
      message: 'User created successfully',
      token,
      userId: user._id,
      userType: user.userType,
      fullName: user.fullName || user.orgName
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      message: 'Error creating user',
      error: error.message
    });
  }
};

// Sign In Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      message: 'Login successful',
      token,
      userId: user._id,
      userType: user.userType,
      fullName: user.fullName || user.orgName
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Error during login',
      error: error.message
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      message: 'Error fetching profile',
      error: error.message
    });
  }
};