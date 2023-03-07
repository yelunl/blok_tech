require('dotenv').config();
console.log(process.env);

const locationInput = document.querySelector('input[name="locatie"]');
let longitude = '';
let latitude = '';
const apiKey = API_KEY;

const getLocation = async () => {
    try {
        const response = await fetch(`https://eu1.locationiq.com/v1/reverse?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`);

        if (response.ok) {
            jsonResponse = await response.json();
            console.log(jsonResponse.address.city);
            locationInput.value = jsonResponse.address.city;
        }
        // throw new Error('request failed');
    } catch (err) {
        console.log(err);
    }
}

const succes = (position) => {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    getLocation();
}

const error = (err) => {
    console.log(err);
}

const getCoordinates = () => {
    navigator.geolocation.getCurrentPosition(succes, error);
}

locationInput.addEventListener('click', getCoordinates);

