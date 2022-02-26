const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')
const app = express()
app.use(cors())
//connecting to the database
connectToMongo();

const port = 5000
//middleware for the application
app.use(express.json())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})
//Intializing the application
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
