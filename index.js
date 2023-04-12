function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocația nu este suportată de acest browser.");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Apel către API-ul OpenWeatherMap pentru a obține datele meteo
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ee2237d48ca0d5de81a398027162d9a8&units=metric`)
        .then(response => response.json())
        .then(data => {
            var city = data.name;
            var temperature = data.main.temp;
            var description = data.weather[0].description;
            var weatherElement = document.querySelector(".textMark"); 
            var locationElement = document.querySelector(".textMark");
            weatherElement.innerHTML = city
            var weatherElement = document.querySelector(".showtemp");
            var locationElement = document.querySelector(".Showtemp");
            weatherElement.innerHTML = temperature

        })
        .catch(error => {
            console.error("Eroare: ", error);
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Permisiunea de geolocație a fost refuzată de utilizator.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Informațiile de locație nu sunt disponibile.");
            break;
        case error.TIMEOUT:
            alert("Solicitarea de geolocație a expirat.");
            break;
        case error.UNKNOWN_ERROR:
            alert("A apărut o eroare necunoscută.");
            break;
    }
}

// Apelarea funcției getLocation() la încărcarea paginii
window.onload = function() {
    getLocation();
};