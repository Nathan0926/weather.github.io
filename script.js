const form = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');
const locationName = document.getElementById('location-name');
const temperature = document.getElementById('temperature');
const time = document.getElementById('time');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const location = locationInput.value;
    getWeather(location);
});

function getWeather(location) {
    // Replace 'API_KEY' with your actual weather API key
    const apiKey = 'API_KEY';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                displayError(data.error.message);
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            console.log(error);
            displayError('An error occurred. Please try again.');
        });
}

function displayWeather(data) {
    const location = data.location.name + ', ' + data.location.country;
    const tempC = data.current.temp_c;
    const tempF = data.current.temp_f;
    const localtime = data.location.localtime;

    locationName.textContent = location;
    temperature.textContent = tempC + '°C / ' + tempF + '°F';
    time.textContent = 'Local Time: ' + localtime;

    weatherInfo.style.display = 'block';
}

function displayError(message) {
    locationName.textContent = '';
    temperature.textContent = '';
    time.textContent = message;

    weatherInfo.style.display = 'block';
}
