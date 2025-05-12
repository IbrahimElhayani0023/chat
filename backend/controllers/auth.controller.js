import User from '../models/user.model.js';
import { generateToken } from '../config/utils.js';
import bcrypt from 'bcryptjs';
export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        const user = await User.findOne({ email });
        const isMatch = await user.comparePassword(password);
        if (!user || !isMatch) return res.status(404).json({ message: 'Invalid email or password' });
        generateToken(user._id, res);
        return res.status(200).json({
            message: 'User logged in successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                thamb: user.thamb,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const Register = async (req, res) => {
    const { name, email, password, thamb, gender } = req.body;
    try {
        if (!name || !email || !password || gender) return res.status(400).json({ message: 'Name, email and password are required' });
        if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        if (!email.includes('@')) return res.status(400).json({ message: 'Invalid email address' });
        if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already exists' });
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashPass,
            thamb,
            gender,
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    thamb: newUser.thamb,
                    gender: newUser.gender,
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}





export const Logout = async (req, res) => {
    try {

        res.clearCookie("token", {}) // clear the cookie  ;
        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


// export { Login, Register, Logout };