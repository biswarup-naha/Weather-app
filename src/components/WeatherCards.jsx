import { motion } from "framer-motion";
import { WiHumidity, WiStrongWind, WiBarometer, WiDaySunny, WiRain, WiFog } from "react-icons/wi";

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const WeatherCards = ({ data }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6"
        >
            {[
                { 
                    label: "Humidity", 
                    value: `${data.humidity}%`, 
                    gradient: "from-blue-500/40 to-indigo-500/40",
                    icon: <WiHumidity className="w-8 h-8 mb-2" />
                },
                { 
                    label: "Wind", 
                    value: `${data.wind_mph} mph`, 
                    gradient: "from-green-500/40 to-teal-500/40",
                    icon: <WiStrongWind className="w-8 h-8 mb-2" />
                },
                { 
                    label: "Pressure", 
                    value: `${data.pressure_mb} mb`, 
                    gradient: "from-purple-500/40 to-pink-500/40",
                    icon: <WiBarometer className="w-8 h-8 mb-2" />
                },
                { 
                    label: "UV index", 
                    value: data.uv, 
                    gradient: "from-yellow-500/40 to-orange-500/40",
                    icon: <WiDaySunny className="w-8 h-8 mb-2" />
                },
                { 
                    label: "Precipitation", 
                    value: `${data.precip_mm} mm`, 
                    gradient: "from-red-500/40 to-rose-500/40",
                    icon: <WiRain className="w-8 h-8 mb-2" />
                },
                { 
                    label: "Visibility", 
                    value: `${data.vis_km} km`, 
                    gradient: "from-cyan-500/40 to-blue-500/40",
                    icon: <WiFog className="w-8 h-8 mb-2" />
                },
            ].map((item, index) => (
                <motion.div
                    key={index}
                    variants={cardVariants}
                    className={`p-4 rounded-xl shadow-lg text-white text-center bg-gradient-to-r ${item.gradient} backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300`}
                    whileHover={{ scale: 1.05, y: -5, animationDuration:0.1 }}
                    // whileTap={{ scale: 0.95 }}
                >
                    <div className="flex flex-col items-center">
                        <div className="text-white/90">
                            {item.icon}
                        </div>
                        <p className="text-lg font-semibold mb-1">{item.label}</p>
                        <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default WeatherCards;
