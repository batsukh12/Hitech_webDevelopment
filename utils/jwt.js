const jwt = require("jsonwebtoken");

function generateJWT(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

function verifyJWT(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}

module.exports = {
    generateJWT,
    verifyJWT,
};