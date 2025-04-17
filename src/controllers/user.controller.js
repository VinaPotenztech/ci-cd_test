import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @route   POST /register
 * @desc   Register user
 * @access  Public
 * @body  name, email, password, role
 */
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please enter reuired fields' });
    }
    //check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //create new user
    user = new User({ name, email, password: hashedPassword, role });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
/**
 * @route   POST /login
 * @desc   Login user
 * @access  Public
 * @body  email, password
 */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res
        .status(400)
        .json({ message: 'Email and Password is required' });
    }

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    const tokenData = {
      userId: user._id,
      role: user.role,
    };
    //generate token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      token: token,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' }, error);
  }
};

/**
 * @route   POST /logout
 * @desc   Login user
 * @access  Private
 */
export const logout = (req, res) => {
  try {
    return res.status(200).cookie('token', '', { maxAge: 0 }).json({
      message: 'Logged out successfully',
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error logging out',
      success: false,
    });
  }
};

/**
 * @route   Get /profile
 * @desc   get user profile
 * @access  Private
 */
export const profile = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id).select('-password');
    return res.json(user).status(200);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
