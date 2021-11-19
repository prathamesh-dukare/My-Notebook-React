const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000

connectToMongo()

app.use(express.json()) //middleware
// Available routes 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})