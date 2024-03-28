const express = require('express');
const userRouter = express.Router();
const debug = require('debug')('app:userRouter');

userRouter.get('/profile', (req, res) => {
    debug('user Router');
    res.json({message: 'User Profile Data'});
});

module.exports = userRouter;
