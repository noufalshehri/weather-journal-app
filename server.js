// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express();

/* Middleware*/
// configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//get route
app.get('/data', function (req, res) {
    res.send(projectData)
})

//post route
app.post('/add', function (request, response) {
    let data = request.body;
    newEntry = {
        key: data.key,
        temperature: data.temperature,
        day: data.day,
        desc: data.desc,
        date: data.date,
        userResponse: data.userResponse
    }
    projectData.push(newEntry)
});


// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`)
})

