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

let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName => studentName === name)

    if(index === -1 && name !== ""){
        students.push(name)
    rollbar.log('student added successfully', {
        auth: 'Owen', type: 'manual entry'})
    res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('No name given')
        res.status(400).send('Must provide a name.')
    } else {
        rollbar.warning('Name already exists')
        res.status(400).send('That student already exists.')
    }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4765

app.listen(port, () => console.log(`Take us to warp ${port}!`))