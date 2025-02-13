const app = require('./app');
require('dotenv').config();

app.listen(process.env.BACKEND_PORT || 1234, () => console.log('\n\---------------------------------------------------\n🟢 Online\nURL: http://localhost:' + (process.env.BACKEND_PORT || 1234) + '/api/'))