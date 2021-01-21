/* Global Variables */
const startUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '341ceab91029ef8183e8a87416fc4849'
let zipCode = ''
let feelings = ''
let baseUrl = ''
let key = -1;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let day = weekday[d.getDay()];

//get request 
const retrieveData = async (url = '', apiKey = '') => {
    const request = await fetch(url + apiKey);
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        return allData
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

//post request 
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

//click event 
document.getElementById('generate').addEventListener('click', function (e) {
    e.preventDefault()
    // get user input
    zipCode = document.getElementById('zip').value
    feelings = document.getElementById('feelings').value
    // API url setup
    baseUrl = startUrl + zipCode + ',us&appid='
    postGet()
})

// Chain  async functions to post data then GET the resulting data
function postGet() {
    key++
    retrieveData(baseUrl + apiKey)
        .then(weather => {

            postData('/add', {
                key: key,
                temperature: weather.main.temp,
                desc: weather.weather[0].description,
                date: newDate,
                day: day,
                userResponse: feelings,
            })
        })
        .then(
            () => {
                updateUI()
            }
        )
}
// update UI with the fetched data
async function updateUI() {
    await retrieveData('/data')
        .then(data => {
            document.getElementById('date').innerHTML =
                `Date: ${data[data.length - 1].date}`

            document.getElementById('temp').innerHTML =
                `${data[data.length - 1].temperature}°`

            document.getElementById('desc').innerHTML =
                `${data[data.length - 1].desc}`

            document.getElementById('content').innerHTML =
                `I feel :${data[data.length - 1].userResponse}`

            document.getElementById('day').innerHTML =
                `Day: ${data[data.length - 1].day}`

        })
}


