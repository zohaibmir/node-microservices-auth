const express = require('express');
const productRouter = express.Router();
const debug = require('debug')('app:productRouter');

productRouter.get('/list', (req, res) => {
    debug('Product Router');
    res.json({message: 'Product List Data'});
});

module.exports = productRouter;
