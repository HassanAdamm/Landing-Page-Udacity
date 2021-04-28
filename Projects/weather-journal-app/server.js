// Setup empty JS object to act as endpoint for all routes
projectData = {
    date: null,
    temp: null,
    feel: null
};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Body Parser Dependancy
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;

const server = app.listen(port, function(){
    console.log(`The server is running on port: ${port}`);
});

//GET Route
app.get('/allData', function(req, res){
    res.send(projectData);
});

//POST Route
app.post('/addData', function(req, res){

    let data = req.body;

    console.log('Server-side data: ', data);
    // // New Entry
    // nEntry = {
    //     date: data.date,
    //     temp: data.temp,
    //     feel: data.userResponse
    // }
    // projectData.push(nEntry);
    projectData["date"] = data.date;
    projectData["temp"] = data.temp;
    projectData["feel"] = data.userResponse;  

    res.send(projectData);
    console.log(projectData);
});
