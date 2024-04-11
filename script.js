document.getElementById("getLocationBtn").addEventListener("click", getLocation);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherData);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function getWeatherData(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const cityName = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;

            const locationDataDiv = document.getElementById("locationData");
            locationDataDiv.innerHTML = `
                <h2>Location: ${cityName}</h2>
                <p>Temperature: ${temperature} K</p>
                <p>Description: ${description}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});



