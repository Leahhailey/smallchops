const express = require('express')
const app = express()
const port = 8000




app.listen(port, () => {
  console.log(`smallchops api is listening on port ${port}`)
})