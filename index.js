const cityName = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-btn");

searchButton.addEventListener("click", (e) => {
    console.log("search clicked");
    let api = "1e3e8f230b6064d27976e41163a82b77";
    const city = document.querySelector("#city-input");
    const country = document.querySelector("#country-select");
    const state = document.querySelector("#state-input");

    showUi(api, city.value, state.value, country.value);
})

async function showUi(api, city, state, country) {
    let data = await getDataFromApi(city, state, country, api);
    console.log(data);

    const jscity = document.querySelector("#jsCity");
    jscity.innerText = data.name;

    const temperature = document.querySelector("#temperature");
    temperature.innerText = data.main.temp;

    const wind = document.querySelector("#windData");
    wind.innerText = `${data.wind.speed}m/s`;

    const pressure = document.querySelector("#jsPressure");
    pressure.innerText = `${data.main.pressure}hpa`;

    const humidity = document.querySelector("#humidityData");
    humidity.innerText = `${data.main.humidity}%`;

    const timestamp = data.sys.sunrise
    const rise = new Date(timestamp * 1000);

    const sunrise = document.querySelector("#sunriseData");
    sunrise.innerText = `${rise.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    })}`;

    const timestampset = data.sys.sunset
    const set = new Date(timestampset * 1000);

    const sunset = document.querySelector("#sunsetData");
    sunset.innerText = `${set.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    })}`;
}

async function getDataFromApi(city, state, country, apiKey) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city},${state},${country}&appid=${apiKey}`);
        const data = await response.json()
        return data

    } catch (e) {
        console.log(e)
    }
}