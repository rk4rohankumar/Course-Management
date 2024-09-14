import jwt from 'jsonwebtoken';
import {jwtSecret} from '../config/config.js';

const generateToken = (userId) => {
  try {
    return jwt.sign({ id: userId },jwtSecret, { expiresIn:"72h" });
  } catch (error) {
    console.error('Token generation error:', error);
    return null;
  }
};

export default generateToken;