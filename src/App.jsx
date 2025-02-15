import axios from 'axios';
import { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { TiAdjustBrightness } from "react-icons/ti";
import { motion } from "framer-motion";
import WeatherCards from './components/WeatherCards';

function App() {
  const [location, setLocation] = useState("Delhi");
  const [data, setData] = useState({});
  const API_ID = import.meta.env.VITE_API_ID;
  const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_ID}`;

  useEffect(() => {
    let lat = "", lon = "";

    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GEO_API_KEY}`)
        .then(res => {
          setLocation(res.data.results[0].address_components[3].long_name);
        })
        .catch(err => console.log(err.message));
    });
  }, []);

  useEffect(() => {
    axios.get(url)
      .then(res => {
        const { temp, humidity, pressure } = res.data.main;
        const { speed: wind } = res.data.wind;
        const { sunrise, sunset } = res.data.sys;
        const { name: city, sys: { country } } = res.data;
        const { main: description, icon } = res.data.weather[0];
        const visibility = res.data.visibility;

        setData({ temp, humidity, pressure, wind, sunrise, sunset, city, country, description, visibility, icon });
      })
      .catch(err => console.log(err.message));
  }, [location]);

  return (
    <motion.div
      className="h-screen w-full py-15 px-5 flex flex-col items-center justify-center bg-[url(./assets/background.png)] bg-cover bg-center bg-fixed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="flex flex-col items-center justify-center h-full max-md:w-full px-10 py-20 bg-white/20 rounded-lg shadow-2xl relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl font-bold mb-10 text-slate-800"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Weather Y<TiAdjustBrightness className='inline w-8 text-white/90' />u
        </motion.h1>

        <motion.div
          className="flex flex-row items-center py-2 bg-gray-50 gap-2 p-1 rounded-3xl shadow-md mb-2"
          whileTap={{ scale: 0.95 }}
        >
          <BsSearch className="text-2xl ml-2 text-bold text-blue-500" />
          <input
            type="text"
            className="outline-none w-md max-md:w-fit"
            placeholder="Enter a location"
            onChange={(e) => setLocation(e.target.value)}
            onKeyDownCapture={(e) => e.target.value=""}
          />
        </motion.div>

        {location?.length > 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>Today's weather in <span className="text-slate-600 text-xl ml-1">{location}</span></p>
            <WeatherCards data={data} />
          </motion.div>
        ) : (
          <motion.p className="text-center">Enter a location</motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default App;
