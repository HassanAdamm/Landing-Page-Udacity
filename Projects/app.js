/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Two variables holding the url and the key of the OpenWeatherMap API
const apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=9b3c33b533506c64990f559fcd22ab8e';

// Event listener to perform action when generate button is clicked
const btn = document.getElementById('generate');
btn.addEventListener('click', generateOutput);

// Function called by the event listener
function generateOutput(e){
    const zipCode  = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // Simple validation on the ZIP Code entry
    if (zipCode === ""){
        alert("Please enter a ZIP Code!")
    }else{
        getWeather(apiURL, zipCode, apiKey)

        // Chaining promises using ".then" handler
        .then(function(data){
            console.log(data);
         
            postData('/addData', {date:newDate, temp:data.main.temp, userResponse: feelings});
            updateUI();
        })
    }
}

// Function to get the Weather from the API
const getWeather = async(url, zip, key) =>{

    const res = await fetch(url+zip+key)

    try{
        const data = await res.json();
        return data;

    }catch(error){
        console.log("The following error occurred:", error)
    }
}

// Function to POST Data
const postData = async(url = '', data = {}) =>{
    console.log(data);
    const res = await fetch(url, {
        method:      'POST',
        credentials: 'same-origin',
        headers:     {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) // Convert JavaScript object to JSON string format
    });

    try{
        const ndata = await res.json();
        console.log(ndata);
        return ndata;

    }catch(error){
        console.log("The following error occurred:", error)
    }
}

// Function to Dynamically update the UI
const updateUI = async() =>{

    const req = await fetch('/allData');

    try{
        const adata = await req.json();
        document.getElementById('date').innerHTML = `Today's Date: ${adata.date}`;
        document.getElementById('temp').innerHTML = `Today's Temperature: ${adata.temp}`;
        document.getElementById('content').innerHTML = `Today I feel: ${adata.feel}`;

    }catch(error){
        console.log("The following error occurred:", error)
    }
}