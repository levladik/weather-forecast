import { useState, useRef, useEffect } from "react";

interface ForecastData {
  date: string;
  temp: number;
  condition: string;
  icon: string;
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
    icon: string;
  }>;
}

interface OpenWeatherResponse {
  list: ForecastItem[];
}

export const CityInput = ({ onForecastFetched }: { onForecastFetched: (data: ForecastData[]) => void }) => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) throw new Error('City not found');
      
      const data: OpenWeatherResponse = await response.json();
      
      // Process 5-day forecast (group by day and take noon time entry)
      const forecast = data.list
        .filter((_item: ForecastItem, index: number) => index % 8 === 4)
        .slice(0, 5)
        .map((item: ForecastItem) => ({
          date: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: item.main.temp,
          condition: item.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        }));

      onForecastFetched(forecast);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData();
    }
  };

  return (
    <>
      <input
        className="border-gray-400 rounded-md p-2 me-4"
        type="text"
        ref={inputRef}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button 
        onClick={handleSearch}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
};
