const dotenv = require('dotenv');
dotenv.config();

require('./db')
const app = require('./app')


app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`))