/**
 * Auth best practices.
 * 1. Centralized authentication * 2. Token Validation * 3. Rate limiting/ throttling 4. Secure Communication
 * 5. Multi-factor authentication * 6. Api key rotation * 7. role based access control 8. Security headers
 *
 * Authentication methods
 * 1. Session-based * 2. Token-based * 3. Password-less
 */

//Debug module
const debug = require('debug')('app:sessionAuth');
require('dotenv').config();
//Session Setup
const expressSession = require('express-session');
const secret = process.env.SESSION_SECRET ;
const store = new expressSession().store;

//Authentication middleware
const protect = (req, res, next) => {
    const {authenticated} = req.session;
    if (!authenticated) {
        debug('401 /n');
        res.sendStatus(401);
    } else {
        debug('Authenticated!')
        next();
    }
}

//midleware configuration
const session = expressSession({secret, resave: false, saveUnintialized: true, store});

module.exports = {protect, session};
