const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

const app = express()
app.use(express.json())


app.use(rollbar.errorHandler())

const port = process.env.PORT || 4765

app.listen(port, () => console.log(`Take us to warp ${port}!`))