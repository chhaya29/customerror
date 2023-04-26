const mongoose = require('mongoose')
// to use environment variable declared in .env file
require('dotenv').config()

const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to database...'))
    .catch((err) => console.log(err))