import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const {username, password} = req.body;
    const existingUser = await User.findOne({username});
    if (existingUser) return res.status(400).json({message: 'User already exists'});
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password: hashedPassword});
    await user.save();
    res.status(201).json({message: 'User created'});
};

export const login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) return res.status(401).json({message: 'Invalid credentials'});
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({message: 'Invalid credentials'});
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.json({token});
};
