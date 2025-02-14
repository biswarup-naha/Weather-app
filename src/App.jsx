import axios from 'axios'
import { useState, useEffect } from 'react';

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const API_ID = import.meta.env.VITE_API_ID;
  const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_ID}`



  const search = (e) => {
    if (e.key === 'Enter') {
      axios.get(url)
        .then(res => setData(JSON.parse(res.data)))
        .catch(err => console.error(err.message))
    }
  }

  useEffect(() => {
    let lat = ""
    let lon = ''

    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude, position.coords.longitude);
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GEO_API_KEY}`)
        .then(res => {
          // console.log(res.data.results[0].address_components[3].long_name)
          const baseLocation = res.data.results[0].address_components[3].long_name
          setLocation(res.data.results[0].address_components[3].long_name)
        })
        .catch(err => console.error(err.message));
    });
  }, [])

  useEffect(() => {
    axios.get(url)
      .then(res => {
        console.log((res.data))
        // setData((res.data))
        // console.log(data)
        const temp = res.data.main.temp
        const humidity = res.data.main.humidity
        const wind = res.data.wind.speed
        const sunrise = res.data.sys.sunrise
        const sunset = res.data.sys.sunset
        const city = res.data.name
        const country = res.data.sys.country
        const description = res.data.weather[0].description
        const icon = res.data.weather[0].icon
        setData({
          temp,
          humidity,
          wind,
          sunrise,
          sunset,
          city,
          country,
          description,
          icon
        })
      })
      .catch(err => console.error(err.message))
  }, [location])

  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center w-fit px-40 py-20 bg-slate-100 rounded-lg'>
        <h1 className='text-4xl font-bold mb-30'>Weather App</h1>
        <input type="text" className='border mb-10' placeholder='Enter a location' onChange={(e) => setLocation(e.target.value)} onKeyDownCapture={search} />
        {location?.length > 0 ? <div className='flex flex-col items-center justify-center'>
          <p>Weather in {location}</p>
          <p>{data.description}</p>
          <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={data.description} />
          <div className='flex flex-col items-center justify-center'>
            <p>Temperature: {data.temp}°C</p>
            <p>Humidity: {data.humidity}%</p>
            <p>Wind: {data.wind}m/s</p>
            <p>Sunrise: {data.sunrise}</p>
            <p>Sunset: {data.sunset}</p>
          </div>
        </div> : <p className='text-center'>Enter a location</p>}
      </div>

    </div>
  )
}

export default App
