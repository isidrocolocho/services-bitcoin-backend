const jwt = require("jsonwebtoken"); 
const generateAccessToken = (payload) => { 
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_TOKEN }); 
}; 

const generaterefresh_token = (payload) => { 
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.TIME_REFRESH_TOKEN }); 
}; 

module.exports = { generateAccessToken, generaterefresh_token }; 