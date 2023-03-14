const longitudeInput = document.querySelector('#longitude');
const latitudeInput = document.querySelector('#latitude');


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

if (url.pathname === '/registreren.html') {
    getCoordinates();
}