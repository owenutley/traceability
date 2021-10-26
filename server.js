const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: "f0ef62ffe76046f8b661e18f7dc6a29c",
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info("html file served successfully")
})

app.get('/style', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/styles.css"))
})

app.get('/test', (req, res) => {
    try {
        nonExistentFunction();
      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4765

app.listen(port, () => console.log(`Take us to warp ${port}!`))