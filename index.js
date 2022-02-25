const express  = require('express');
// const path = require('path');
const app =  express();
require('dotenv').config();
const port = process.env.PORT;
// const port = 80;

if (!process.env.PORT) { console.error('FATAL ERROR: App Port is not defined.'); process.exit(1); }
if (!process.env.JWT_SECRET) { console.error('FATAL ERROR: jwtPrivateKey is not defined.'); process.exit(1); }

// require('./startup/logging')();
require('./startup/securityPackages')(app);
require('./startup/db_connection');
require('./startup/router')(app);
app.use('/api/uploads', express.static(__dirname + "/uploads"));

require('./startup/pageNotFound')(app);

app.listen(port, () => console.log(`Listening on port ${port}...`));