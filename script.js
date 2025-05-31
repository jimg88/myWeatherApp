const apiKey = "97941005119328c5e8b2ce414a7c5a68";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");
  const errorDiv = document.getElementById("error");
  
  weatherResult.innerHTML = "";
  errorDiv.textContent = "";

  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // Defensive checks with optional chaining and defaults
    const temp = data.main?.temp ?? "N/A";
    const description = data.weather?.[0]?.description ?? "No description available";
    const cityName = data.name ?? city;

    // Capitalize first letter of description
    const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);

   weatherResult.innerHTML = `
  <h2>${cityName}</h2>
  <p><strong>${temp}°F</strong></p>
  <p>${capitalizedDescription}</p>
`;

  } catch (error) {
    errorDiv.textContent = error.message;
  }
}
