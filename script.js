document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search button');
    const searchInput = document.querySelector('.search input');
    const weatherIcon = document.querySelector('.weather-icon');
    const tempElement = document.querySelector('.temp');
    const cityElement = document.querySelector('.city');
    const humidityElement = document.querySelector('.humidity');
    const windElement = document.querySelector('.wind');

    const apiKey = '96dc00543025b1bb7cd67e2c40258e48'; 
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    searchButton.addEventListener('click', () => {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    });

    function fetchWeatherData(city) {
        fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    updateWeatherUI(data);
                } else {
                    alert('City not found');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data');
            });
    }

    function updateWeatherUI(data) {
        const { main, weather, wind } = data;
        cityElement.textContent = data.name;
        tempElement.textContent = `${Math.round(main.temp)}°C`;
        humidityElement.textContent = `${main.humidity}%`;
        windElement.textContent = `${Math.round(wind.speed)} Km/h`;

        
        const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = weather[0].description;
    }
});
