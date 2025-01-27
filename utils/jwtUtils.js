const jwt = require("jsonwebtoken"); 
const generateAccessToken = (payload) => { 
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_TOKEN }); 
}; 

const generateRefreshToken = (payload) => { 
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.TIME_REFRESH_TOKEN }); 
}; 

module.exports = { generateAccessToken, generateRefreshToken }; 