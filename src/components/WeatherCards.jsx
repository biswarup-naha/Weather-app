import { motion } from "framer-motion";

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
                { label: "Humidity", value: `${data.humidity}%`, gradient: "from-blue-500/40 to-indigo-500/40" },
                { label: "Wind", value: `${data.wind_mph} mph`, gradient: "from-green-500/40 to-teal-500/40" },
                { label: "Pressure", value: `${data.pressure_mb} mb`, gradient: "from-purple-500/40 to-pink-500/40" },
                { label: "UV index", value: data.uv, gradient: "from-yellow-500/40 to-orange-500/40" },
                { label: "Precipitation", value: `${data.precip_mm} mm`, gradient: "from-red-500/40 to-rose-500/40" },
                { label: "Visibility", value: `${data.vis_km} km`, gradient: "from-cyan-500/40 to-blue-500/40" },
            ].map((item, index) => (
                <motion.div
                    key={index}
                    variants={cardVariants}
                    className={`p-4 rounded-xl shadow-md text-white text-center bg-gradient-to-r ${item.gradient} backdrop-blur-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <p className="text-lg font-semibold">{item.label}</p>
                    <p className="text-xl font-bold">{item.value}</p>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default WeatherCards;
