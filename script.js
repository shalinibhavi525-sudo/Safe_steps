// Initialize map
const map = L.map("map").setView([20.5937, 78.9629], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
 attribution: "© OpenStreetMap contributors"
}).addTo(map);
// Add static shelter markers
const shelters = [
 { name: "Community Hall", coords: [19.076, 72.8777] },
 { name: "Relief Camp", coords: [28.6139, 77.209] }
];
shelters.forEach(s =>
 L.marker(s.coords).addTo(map).bindPopup(`<b>${s.name}</b>`)
);
// Fetch weather data from OpenWeatherMap demo endpoint
async function getWeather() {
 const city = document.getElementById("city").value.trim();
 if (!city) return;
 const alertBox = document.getElementById("alert");
 try {
 const res = await fetch(
 `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02`
 ); // key-free demo appid
 const data = await res.json();
 const condition = data.weather[0].main.toLowerCase();
 if (condition.includes("rain") || condition.includes("storm")) {
 alertBox.textContent = "■■ Warning: Severe weather expected!";
 alertBox.style.color = "red";
 } else {
 alertBox.textContent = "■ Safe: No major alerts.";
 alertBox.style.color = "green";
 }
 } catch (err) {
 alertBox.textContent = "Offline: Unable to fetch alerts.";
 alertBox.style.color = "gray";
 }
}
