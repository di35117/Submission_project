document.addEventListener("DOMContentLoaded",() => {
    const cityInput=document.querySelector('.city-input')
    const searchBtn=document.querySelector('.search-btn')
    const searchCitySection=document.getElementById('second')
    const weatherInfoSection=document.getElementById('first')
    const notFoundSection=document.getElementById('third')
    const country=document.querySelector('.country-txt')
    const datetxt=document.querySelector('.current-date-txt')
    const temp=document.querySelector('.temp-txt')
    const condn = document.querySelector(".condition-txt");
    const humidity = document.querySelector(".humidity-value-txt");
    const air = document.querySelector(".wind-value-txt");
    const weatherPic=document.querySelector('.weather-summary-img')
    const apiKey = "b735a97fb4bd24ba59cfd0ed3925c178";
    searchBtn.addEventListener('click', async () => {
        const city=cityInput.value.trim()
        cityInput.value=""
        if(city==="")
        {
            notFoundSection.classList.remove('hidden');
            weatherInfoSection.classList.add('hidden')
        }
        else
        {
            try {
                const weatherData=await getFetchData(city)
                //console.log(weatherData)
                updateWeatherInfo(weatherData);
            }
            catch (error) {
                searchCitySection.classList.add("hidden");
                notFoundSection.classList.remove("hidden");
                weatherInfoSection.classList.add("hidden");
            }
        }
    })

    cityInput.addEventListener('keydown' ,async (event) => {
        if(event.key=='Enter')
        {
            const city = cityInput.value.trim();
            cityInput.value = "";
            if (city === "") {
              searchCitySection.classList.add("hidden");
              notFoundSection.classList.remove("hidden");
              weatherInfoSection.classList.add("hidden");
            } else {
              try {
                const weatherData = await getFetchData(city);
                //console.log(weatherData)
                updateWeatherInfo(weatherData);
              } catch (error) {
                searchCitySection.classList.add("hidden");
                notFoundSection.classList.remove("hidden");
                weatherInfoSection.classList.add("hidden");
              }
            }
        }
    })
    function updateWeatherInfo(data)
    {
        searchCitySection.classList.add("hidden");
        notFoundSection.classList.add("hidden");
        weatherInfoSection.classList.remove("hidden");
        //console.log(data)
        const {city, list}=data;
        country.textContent=city.name
        datetxt.textContent = formatUnixDate(list[0].dt);
        temp.textContent = `${list[0].main.temp} °C`;
        condn.textContent=list[0].weather[0].description.toUpperCase()
        humidity.textContent=`${list[0].main.humidity}%`
        air.textContent=`${list[0].wind.speed} M/s`

    }
    async function getFetchData(city) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        notFoundSection.classList.remove("hidden");
        weatherInfoSection.classList.add("hidden");
      } else {
        const data = await response.json();
        return data;
      }
    }
    function formatUnixDate(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
      const options = {
        weekday: "short", // "Wed"
        day: "2-digit", // "08"
        month: "short", // "Aug"
        year: "numeric", // "2023"
      };
      return date.toLocaleDateString("en-GB", options);
    }

})