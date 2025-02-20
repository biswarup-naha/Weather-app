import axios from 'axios';
import { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { TiAdjustBrightness } from "react-icons/ti";
import { motion } from "framer-motion";
import WeatherMain from './components/WeatherMain';

function App() {
  const [currLocation, setCurrLocation] = useState(false);
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const API_ID = import.meta.env.VITE_API_ID;
  const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_ID}&q=${location}&days=3`;

  useEffect(() => {
    let lat = "", lon = "";

    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GEO_API_KEY}`)
        .then(res => {

          setLocation(res.data.results[0].address_components[3].long_name);
          setCurrLocation(res.data.results[0].address_components[3].long_name);
        })
        .catch(err => console.log(err.message));
    });
  }, []);

  useEffect(() => {
    axios.get(url)
      .then(res => {
        const { temp_c, is_day, wind_mph, humidity, pressure_mb, uv, precip_mm, vis_km, condition: { text, icon } } = res.data.current;
        const { name, region, country, localtime } = res.data.location;

        setData({ temp_c, humidity, pressure_mb, wind_mph, name, region, country, is_day, text, icon, uv, precip_mm, vis_km, localtime });
      })
      .catch(err => console.log(err.message));
  }, [location]);

  return (


    data.name != undefined ? (<WeatherMain location={location} data={data} setLocation={setLocation} currLocation={currLocation} />) :
      <div className='bg-[url(./assets/background.png)] bg-cover bg-center bg-fixed h-screen w-full py-15 px-5 flex flex-col items-center justify-center text-3xl'>
        Loading...
      </div>
    // <WeatherMain location={location} data={data} setLocation={setLocation} currLocation={currLocation} />

  );
}

export default App;

