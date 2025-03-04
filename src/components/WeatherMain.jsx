import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { TiAdjustBrightness } from "react-icons/ti";
import { motion } from "framer-motion";
import WeatherCards from './WeatherCards';

const WeatherMain = ({ location, data, setLocation, currLocation, isCelsius, setIsCelsius }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setLocation(searchInput);
      setSearchInput("");
    }
  };

  return (
      <motion.div
          className="min-h-screen w-full flex flex-col items-center justify-center bg-[url(./assets/background.png)] bg-cover bg-center bg-fixed p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
      >
          <motion.div
              className="w-full max-w-2xl flex flex-col items-center justify-center bg-white/20 rounded-lg shadow-2xl p-6 my-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
          >
              <motion.h1
                  className="text-4xl font-bold mb-6 text-slate-800 max-md:text-3xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7 }}
              >
                  Weather Y<TiAdjustBrightness className='inline w-6 text-white/90' />u
              </motion.h1>

              <motion.div
                  className="w-full max-w-md flex flex-row items-center py-2 bg-gray-50 gap-2 p-1 rounded-3xl shadow-md mb-4"
                  whileTap={{ scale: 0.95 }}
              >
                  <BsSearch className="text-xl ml-2 text-bold text-blue-500" />
                  <input
                      type="text"
                      className="outline-none w-full"
                      placeholder="Enter a location"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyDown={handleSearch}
                  />
              </motion.div>

              {location.length > 0 ? (
                  <motion.div
                      className="w-full flex flex-col items-center justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                  >
                      <div className="flex items-center gap-4 mb-4">
                          <p className='font-light text-slate-600 text-center'>Today's weather in <span className="text-slate-800 text-lg ml-1 max-md:text-md">{data.name + ", " + data.region + ", " + data.country}</span></p>
                          <div className="flex items-center gap-2 bg-white/20 rounded-full p-1">
                              <button
                                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                                      isCelsius 
                                          ? 'bg-blue-500 text-white' 
                                          : 'text-slate-700 hover:bg-white/30'
                                  }`}
                                  onClick={() => setIsCelsius(true)}
                              >
                                  °C
                              </button>
                              <button
                                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                                      !isCelsius 
                                          ? 'bg-blue-500 text-white' 
                                          : 'text-slate-700 hover:bg-white/30'
                                  }`}
                                  onClick={() => setIsCelsius(false)}
                              >
                                  °F
                              </button>
                          </div>
                      </div>
                      <motion.div 
                          className='flex items-center justify-center gap-4 mt-4' 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                      >
                          <img src={data.icon} alt="weather icon" className="w-16 h-16 rounded-full shadow-lg bg-white/50" />
                          <div>
                              <p className='text-3xl text-white text-center'>
                                  {isCelsius ? `${data.temp_c} °C` : `${data.temp_f} °F`}
                              </p>
                              <p className="text-xl font-bold text-slate-600">{data.is_day ? data.text + ", Day" : data.text + ", Night"}</p>
                          </div>
                      </motion.div>
                      <WeatherCards data={data} />
                      <p className="text-sm font-bold text-slate-700 mt-4">Last updated at: &nbsp; {data.localtime}</p>
                  </motion.div>
              ) : (
                  <motion.button 
                      whileHover={{ scale: 1.02 }} 
                      transition={{ duration: 0.25, ease: "easeIn" }} 
                      className="text-center text-xl mt-4 text-bold text-blue-500 border rounded-2xl p-2 hover:bg-blue-400 hover:text-white"
                      onClick={() => {
                          setLocation(currLocation);
                      }}
                  >
                      Show current location
                  </motion.button>
              )}
          </motion.div>
      </motion.div>
  )
}

export default WeatherMain