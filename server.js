const express = require('express')
const path = require('path')
// const Rollbar = require('rollbar')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    // rollbar.info("html file served successfully")
})


// app.use(rollbar.errorHandler())

const port = process.env.PORT || 4765

app.listen(port, () => console.log(`Take us to warp ${port}!`))