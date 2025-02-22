import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const GEOCODING_API_URL = "http://api.openweathermap.org/geo/1.0/direct";

interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: { main: string; icon: string }[];
}

interface WeatherResponse {
  list: ForecastItem[];
}

export interface ForecastData {
  date: string;
  temp: number;
  condition: string;
  icon: string;
}

export const fetchWeatherByCity = async (city: string): Promise<ForecastData[]> => {
  try {
    // Get the latitude and longitude of the city
    const geoResponse = await axios.get(GEOCODING_API_URL, {
      params: { q: city, limit: 1, appid: API_KEY },
    });

    if (geoResponse.data.length === 0) {
      throw new Error("Город не найден");
    }

    const { lat, lon } = geoResponse.data[0];

    // Get the weather forecast
    const weatherResponse = await axios.get<WeatherResponse>(WEATHER_API_URL, {
      params: { lat, lon, units: "metric", appid: API_KEY },
    });

    return weatherResponse.data.list
      .filter((_, index) => index % 8 === 4)
      .slice(0, 5)
      .map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
        temp: item.main.temp,
        condition: item.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      }));
  } catch (error) {
    console.error("Ошибка при получении данных о погоде:", error);
    throw error;
  }
};
