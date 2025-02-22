interface WeatherData {
  date: string;
  temp: number;
  condition: string;
  icon: string;
}

export const Forecast = ({ weatherData }: { weatherData: WeatherData[] }) => {

  console.log(weatherData);
  return (
    <div className="mt-8 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast for</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {weatherData.map((day) => (
          <div key={day.date} className="p-4 bg-white rounded-lg text-center">
            <p className="font-semibold text-gray-600 mb-2">{day.date}</p>
            <img 
              src={day.icon} 
              alt={day.condition} 
              className="w-12 h-12 mx-auto mb-2"
            />
            <p className="text-2xl text-gray-600 font-bold">{Math.round(day.temp)}°C</p>
            <p className="text-gray-600">{day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
