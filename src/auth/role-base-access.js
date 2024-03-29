/**
 * Role Base Access Control
 * Step1 Create roles and configure policy
 * Step2 Associate user to the role
 * Step3 Apply roles to the routes
 * Step4 Integration with authenticate methods
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();
const roles = require('./roles');
const secretKey = process.env.SECRET_KEY;

/**
 * Generate Token
 * @param role
 * @returns {*}
 */
function generateToken(role) {
    return jwt.sign({role}, secretKey, {expiresIn: '1h'});
}

/**
 * Verify access Token
 * @param token
 * @returns {*|null}
 */
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);

        return decoded.role;
    } catch (e) {

        return null;
    }
}

/**
 * Authenticate User based on the role
 * @param requiredRole
 */
function authenticateUser(requiredRole) {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'})
        }
        const userRole = verifyToken(token);
        if (!userRole || userRole !== requiredRole) {
            res.status(403).json({message: 'Forbidden'});
        }
        next();
    };
}

module.exports = {generateToken, verifyToken, authenticateUser, roles};
