import axios from 'axios';
import { useState, useEffect } from 'react';
import WeatherMain from './components/WeatherMain';
import Loading from './components/Loading';

function App() {
  const [currLocation, setCurrLocation] = useState(false);
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const API_ID = import.meta.env.VITE_API_ID;
  const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_ID}&q=${location}&days=3`;

  const convertToFahrenheit = (celsius) => {
    return ((celsius * 9/5) + 32).toFixed(1);
  };

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
    if (location) {
      axios.get(url)
        .then(res => {
          const { temp_c, is_day, wind_mph, humidity, pressure_mb, uv, precip_mm, vis_km, condition: { text, icon } } = res.data.current;
          const { name, region, country, localtime } = res.data.location;

          setData({ 
            temp_c, 
            temp_f: convertToFahrenheit(temp_c),
            humidity, 
            pressure_mb, 
            wind_mph, 
            name, 
            region, 
            country, 
            is_day, 
            text, 
            icon, 
            uv, 
            precip_mm, 
            vis_km, 
            localtime 
          });
        })
        .catch(err => console.log(err.message));
    }
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    isLoading || !location ? (
      <Loading />
    ) : (
      <WeatherMain 
        location={location} 
        data={data} 
        setLocation={setLocation} 
        currLocation={currLocation}
        isCelsius={isCelsius}
        setIsCelsius={setIsCelsius}
      />
    )
  );
}

export default App;

