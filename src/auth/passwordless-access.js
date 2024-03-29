/**
 * This type of auth is used mostly for to reset user and passwords.
 * Step1. Submit email or phone number in app
 * Step2. Server respond and send one time magic link to login
 * Step3. User click the link to redirect to the app, logging them in and making the link invalid for subsequent use
 */


const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const sub = 123456; //simulate database read
const SECRET = process.env.SESSION_SECRET;
const token = jwt.sign(
    {
        "iss": "magic-link-chrome-ext",
        "exp": Math.floor(Date.now() / 1000) + (5 * 60),
        "sub": sub, //user is now referred to bt their 'sub'
        "nonce": Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    }, SECRET);

module.exports = token;
