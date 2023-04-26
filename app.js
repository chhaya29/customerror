const express = require('express')
const app = express();
require('./db/connect')
const taskRoutes = require('./routes/tasks')
const notFoundMiddlerware = require('./middleware/not-found')
const errorHandlerMiddlerware  = require('./middleware/errorHandler')

// middlewer
app.use(express.json());

//routes
app.get('/hello', (req, res) => {
    res.send('task manager app');
})
app.use('/api/v1/tasks', taskRoutes)

// midddlerware 
// when no route found matching, the default will be called
app.use(notFoundMiddlerware)
// error handler suggested by express
app.use(errorHandlerMiddlerware)

const port = 3000
app.listen(port, console.log(`Server is listening on port ${port}...`))