const express = require('express')

const app = express()
const PORT = 3000

app.use((req, res, next) => {
  console.log('quering start 1')
  next()
  console.log('quering end 1')
})

app.use((req, res, next) => {
  console.log('quering start 2')
  next()
  console.log('quering end 2')
})

app.use((req, res, next) => {
  console.log('quering start 3')
  next()
  console.log('quering end 3')
})

app.get('/', (req, res) => {
  res.send('hello grace')
})

app.listen(PORT, () => {
  console.log(`Example listening on port ${PORT}`)
})

