const memjs = require('memjs');
require('dotenv').config();
const memCachedClient = memjs.Client.create(process.env.MEMCACHED_SERVERS || 'localhost:11211')
