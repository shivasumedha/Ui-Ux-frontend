function getWeather() {
    const city = document.getElementById("city").value.trim();
    const weatherResult = document.getElementById("weatherResult");

    if (!city) {
        weatherResult.innerHTML = "<p class='error'>⚠️ Please enter a city name.</p>";
        weatherResult.style.display = "block";
        changeBackground("default");
        return;
    }

    const apiKey = "86c9a1cc65be2068b63a7c94cef3d30c";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) throw new Error("Weather fetch failed.");
            return response.json();
        })
        .then(data => {
            if (!data || !data.coord) throw new Error("Invalid weather data.");

            const weatherCondition = data.weather[0].main;
            changeBackground(weatherCondition);

            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

            weatherResult.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                <p><strong>Sunrise:</strong> ${sunrise}</p>
                <p><strong>Sunset:</strong> ${sunset}</p>
            `;
            weatherResult.style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            weatherResult.innerHTML = "<p class='error'>⚠️ Something went wrong. Please try again later.</p>";
            weatherResult.style.display = "block";
            changeBackground("default");
        });
}

function changeBackground(condition) {
    let imageUrl = "";

    switch (condition) {
        case "Clear":
            imageUrl = "images/sunny.webp";
            break;
        case "Clouds":
            imageUrl = "images/cloudy.webp";
            break;
        case "Rain":
            imageUrl = "images/rainy.webp";
            break;
        case "Thunderstorm":
            imageUrl = "images/thunder.webp";
            break;
        case "Drizzle":
            imageUrl = "images/drizzle.webp";
            break;
        case "Snow":
            imageUrl = "images/snow.webp";
            break;
        case "Mist":
        case "Fog":
        case "Haze":
        case "Smoke":
        case "Dust":
        case "Sand":
        case "Ash":
            imageUrl = "images/mist.avif";
            break;
        case "default":
            imageUrl = "none";
            break;
        default:
            imageUrl = "images/default.jpg";
    }

    if (imageUrl === "none") {
        document.body.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
    } else {
        document.body.style.background = `url(${imageUrl}) no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
    }

    document.body.style.transition = "background 0.9s ease";
}
