//CREATE MAP
const mymap = L.map('map').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {attribution}).addTo(mymap);

mymap.options.minZoom = 1;


//CREATE ISS ICON
const issIcon = L.icon({
    iconUrl: "iss-icon2.png",
    iconSize: [35, 35],
    iconAnchor: [25, 25]
});

const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap)


//FETCH ISS API
const latitude = document.getElementById("lat");
const longitude = document.getElementById("lon");
const velocity = document.getElementById("vel");
const visibility = document.getElementById("vis");
const altitude = document.getElementById("alt");

const api = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;

async function ISSlocation() {
    const response = await fetch(api);
    const data = await response.json();
    //console.log(data)
    
  marker.setLatLng([data.latitude, data.longitude]); 

    if(firstTime) {
        mymap.setView([data.latitude, data.longitude], 2.5);
        firstTime = false;
    }

    latitude.textContent = data.latitude.toFixed(3);
    longitude.textContent = data.longitude.toFixed(3);
    velocity.textContent = data.velocity.toFixed(1) + " km/h";
    altitude.textContent = data.altitude.toFixed(1) + " km";
    visibility.textContent = data.visibility;
}

ISSlocation();

setInterval(ISSlocation, 1200);


//SHOW AND HIDE DETAILS
const button = document.querySelector("button");
const info = document.querySelector(".info");

button.addEventListener("click", function() {
    showInfo();
    changeText();
});


function showInfo() {
    info.classList.toggle("hidden");
}

function changeText() {
    if(button.innerText == "SHOW DETAILS") {
        button.innerText = "HIDE DETAILS";
    } else {
        button.innerText = "SHOW DETAILS";
    }
}


//TYPEWRITER TITLE
let i = 0;
let txt = 'International Space Station Tracker';

function typeWriter() {
  const title = document.getElementById("title");

  if (i < txt.length) {
    title.innerHTML += txt.charAt(i);
    i++;
  }
  setTimeout(typeWriter, 60);
}
typeWriter();

