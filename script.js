const apiKey = 'f1fca920e89e4db5b7fcfedcb92980cb'; // Replace with your Weatherbit API key

document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeatherData(location);
    }
});

document.getElementById('toggleTheme').addEventListener('click', toggleTheme);
document.getElementById('toggleTemp').addEventListener('click', toggleTemperatureUnit);

let isCelsius = true;

function displayGreeting() {
    const hours = new Date().getHours();
    const greetingMessage = document.getElementById('greetingMessage');
    if (hours < 12) greetingMessage.innerText = 'Good Morning!';
    else if (hours < 18) greetingMessage.innerText = 'Good Afternoon!';
    else greetingMessage.innerText = 'Good Evening!';
}

function displayLocalTime() {
    const localTimeElement = document.getElementById('localTime');
    setInterval(() => {
        localTimeElement.innerText = `Local Time: ${new Date().toLocaleTimeString()}`;
    }, 1000);
}

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${location}&key=${apiKey}`);
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            displayCurrentWeather(data.data[0]);
            fetchAdditionalData(location);
        } else {
            alert('Location not found!');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    document.body.style.backgroundImage = getBackgroundImage(data.weather.description);
    document.getElementById('temperature').innerText = `Temperature: ${data.temp}°C`;
    document.getElementById('weatherDescription').innerText = `Condition: ${data.weather.description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.rh}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind_spd} m/s`;
    displayGreeting();
    displayLocalTime();
    displayWeatherTip();
}

function getBackgroundImage(weatherDescription) {
    switch (weatherDescription.toLowerCase()) {
        case 'clear sky':
            return "url('https://clearskyconnect.com/wp-content/uploads/2019/05/cropped-clearsky-5.jpg')";
        case 'few clouds':
            return "url('https://c1.wallpaperflare.com/preview/764/382/484/clouds-grey-sky-heavenly-heaven.jpg')";
        case 'rain':
            return "url('https://png.pngtree.com/thumb_back/fw800/background/20230722/pngtree-intense-downpour-under-ominous-clouds-3d-rendered-image-of-a-rainy-image_3766578.jpg')";
        case 'snow':
            return "url('https://wallpapershome.com/images/pages/pic_h/17354.jpg')";
        default:
            return "url('https://cdn.dribbble.com/users/8497870/screenshots/19298239/media/461fa7eaecc41c872f15e6f77b85c2ff.png')";
    }
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        document.getElementById('toggleTheme').innerText = 'Light Mode';
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        document.getElementById('toggleTheme').innerText = 'Dark Mode';
    }
}

function toggleTemperatureUnit() {
    isCelsius = !isCelsius;
    const temperatureElement = document.getElementById('temperature');
    const tempText = temperatureElement.innerText.match(/-?\d+(\.\d+)?/);
    if (tempText) {
        let temp = parseFloat(tempText[0]);
        if (isCelsius) {
            temp = (temp - 32) * (5/9); 
            temperatureElement.innerText = `Temperature: ${temp.toFixed(2)}°C`;
        } else {
            temp = (temp * (9/5)) + 32;
            temperatureElement.innerText = `Temperature: ${temp.toFixed(2)}°F`;
        }
    }
}

function displayWeatherTip() {
    const tips = [
        "Carry an umbrella if it looks cloudy.",
        "Drink plenty of water on hot days.",
        "Dress in layers during the winter.",
        "Check weather alerts before traveling.",
        "Always wear sunscreen on sunny days."
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    document.getElementById('weatherTips').innerText = randomTip;
}

displayGreeting();
displayLocalTime();
