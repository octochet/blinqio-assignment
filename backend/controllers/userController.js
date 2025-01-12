import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import userModel from '../models/userModel.js';

const generateToken = (id) => { 
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export const registerUser = async (req, res) => {
    const { name, password } = req.body;
    
    try {
        const userExists = await userModel.findOne({ name });

        if (userExists) {
            // alert('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }
    } catch (error) {
        console.log(error);
    }

    const user = await userModel.create({
        name,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            password: user.password,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

export const authUser = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await userModel.findOne({ name });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!user || !isPasswordValid) {
            // console.log(user, password, user.password);
            return res.status(400).json({ message: 'Invalid user data' });
        }
        res.status(200).json({ message: 'User logged in', user: user });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Invalid user data' });
    }
};

