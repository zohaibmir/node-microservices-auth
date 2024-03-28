const express = require('express');
const orderRouter = express.Router();
const debug = require('debug')('app:userRouter');

orderRouter.get('/history', (req, res) => {
    debug('Order Router');
    res.json({message: 'Order History Data'});
});

module.exports = orderRouter;
