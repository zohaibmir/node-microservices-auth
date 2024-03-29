/**
 * Rate Limit and Quotas
 *
 * 1. Protect Against Ddos attack
 * 2. Brute Force Attack prevention
 * 3. Protecting Api Resources
 * 4. Preventing resource exhausting
 */

const rateLimit = require('express-rate-limit');

const limiter = rateLimit(
    {
        windowMs: 60 * 1000, // 1 minute
        max: 10, //Limit to 10 request per minute
        message: 'Rate limit exceeded. Please try again later',
    });

module.exports = limiter;
