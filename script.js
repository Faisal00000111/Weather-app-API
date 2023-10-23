function getWeatherWithXHR() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const url = "https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&hourly=temperature_2m";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            updateWeatherUI(data);
        } else {
            console.error('Failed to fetch weather:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Failed to fetch weather:', xhr.statusText);
    };

    xhr.send();
}

function getWeatherWithFetchPromise() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const url = "https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&hourly=temperature_2m";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            updateWeatherUI(data);
        })
        .catch(error => {
            console.error('Failed to fetch weather:', error);
        });
}


async function getWeatherWithAsyncAwait() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;
    const url = "https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&hourly=temperature_2m";

    // Fetch weather data
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            updateWeatherUI(data);
        } else {
            console.error(`Failed to fetch weather: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Failed to fetch weather: ${error}`);
    }
}

function updateWeatherUI(data) {
    const weatherIcon = document.getElementById("weather-icon");
    const weatherDescription = document.getElementById("weather-description");
    const weatherTemperature = document.getElementById("weather-temperature");

    const time = data.hourly.time[0];
    const temperature = data.hourly.temperature_2m[0];

    weatherDescription.textContent = time;
    weatherTemperature.textContent = temperature;
}
