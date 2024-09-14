import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import authValidator from '../utils/authValidator.js';

const register = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;
    if(!authValidator(req)){
        return res.status(403).json({ message: 'Invalid input' });
    }   

    if (!name || !email || !password || !confirmPassword || !role) {
        return res.status(403).json({ message: 'Please enter all fields' });
    }
    const exist = await User.findOne({ email });
    if (exist) {
        return res.status(403).json({ message: 'Email already exists' });
    }
    if (password !== confirmPassword) {
        return res.status(403).json({ message: 'Passwords do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await User.create({
            name,
            email,
            role,
            password: hashedPassword,
        }).then((user)=>
           user? res.status(201).json("user created successfully, now you can login"):res.status(500).json({ message: 'User register error' }));
        return
    } catch (error) {
        res.status(500).json({ message: 'User register error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = generateToken(user._id);
        res.cookie('token', token);
        res.json({
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Login error' });
    }
};

export { register, login };