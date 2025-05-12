import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
        sameSite: "strict", // Helps prevent CSRF attacks
    });
    return token;
}