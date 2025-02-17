import React from 'react'
import { BsSearch } from "react-icons/bs";
import { TiAdjustBrightness } from "react-icons/ti";
import { motion } from "framer-motion";
import WeatherCards from './WeatherCards';

const WeatherMain = ({ location, data, setLocation, currLocation }) => {
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
                  className="text-5xl font-bold mb-10 text-slate-800 max-md:text-3xl"
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
                      onKeyDownCapture={(e) => { if (e.key === "Enter") e.target.value = "" }}
                  />
              </motion.div>

              {location.length > 0 ? (
                  <motion.div
                      className="flex flex-col items-center justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                  >
                      <p className='font-light text-slate-600'>Today's weather in <span className="text-slate-800 text-xl ml-1 max-md:text-md">{data.name + ", " + data.region + ", " + data.country}</span></p>
                      <motion.div className='flex items-center justify-center gap-5 mt-5' initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}>
                          <img src={data.icon} alt="weather icon" className="w-20 h-20 mb-5 rounded-full shadow-lg bg-white/50 aspect-square" />
                          <div>
                              <p className='text-4xl text-white text-center'>{data.temp_c} °C</p>
                              <p className="text-2xl font-bold text-slate-600">{data.is_day ? data.text + ", Day" : data.text + ", Night"}</p>

                          </div>
                      </motion.div>
                      <WeatherCards data={data} />
                      <p className="text-sm font-bold text-slate-700 mt-10">Last updated at: &nbsp; {data.localtime}</p>
                  </motion.div>
              ) : (
                  <motion.button whileHover={{ scale: 1.02 }} transition={{ duration: 0.25, ease: "easeIn" }} className="text-center text-2xl mt-4 text-bold text-blue-500 border rounded-2xl p-2 hover:bg-blue-400 hover:text-white" onClick={() => {
                      setLocation(currLocation);
                      // window.location.search("/")
                  }}>
                      Show current location
                  </motion.button>
              )}
          </motion.div>
      </motion.div>
  )
}

export default WeatherMain