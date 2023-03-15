const slider = document.querySelector('div[class="slider"]');
let currentPosition = '';

slider.addEventListener('scroll', () => {
    currentPosition = slider.scrollLeft;
});

window.addEventListener('click', (event) => {
    if (currentPosition < 544 || currentPosition > 0) {
        const sliderButtons = event.target.classList;
        if (sliderButtons.contains('fa-circle-right')) {
            currentPosition += 275;
        } else if (sliderButtons.contains('fa-circle-left')) {
            currentPosition -= 275;
        }
        slider.scrollLeft = currentPosition;
    }

});




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