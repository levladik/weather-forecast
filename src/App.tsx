import "./styles/App.css";
import { CityInput } from "./components/CityInput";
import { Forecast } from "./components/Forecast";

import { useState } from "react";

function App() {
  const [forecastData, setForecastData] = useState<Array<{
    date: string;
    temp: number;
     condition: string;
    icon: string;
  }>>([]);

  return (
    <div className="container mx-auto p-4">
      <CityInput onForecastFetched={setForecastData} />
      <Forecast weatherData={forecastData} />
    </div>
  )
}

export default App;
