const locationInput = document.querySelector('input[name="locatie"]');
const longitudeInput = document.querySelector('#longitude');
const latitudeInput = document.querySelector('#latitude');
const registrerenButton = document.querySelector('.zero_state a:nth-of-type(1)');
let longitude = '';
let latitude = '';


const succes = (position) => {
    longitudeInput.value = position.coords.longitude;
    latitudeInput.value = position.coords.latitude;
}

const error = (err) => {
    console.log(err);
}

const getCoordinates = () => {
    navigator.geolocation.getCurrentPosition(succes, error);
}

const url = new URL(window.location.href);
console.log(url.pathname);

if (url.pathname === '/registreren.html') {
    console.log('registreren');
    getCoordinates();
}

