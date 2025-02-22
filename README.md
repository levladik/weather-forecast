# Weather Application

A web-based weather forecasting application built with React and TypeScript. Provides real-time weather data and 5-day forecasts for any city.

## Features
- Search for current weather conditions
- 5-day forecast visualization
- Responsive UI with animated weather icons
- Error handling and loading states
- Type-safe API interactions

## API Setup
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Create `.env` file in project root
3. Add your API key:
```ini
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

## Installation
```bash
npm install
npm run dev
```

## Project Structure
```tree
src/
├── App.tsx          # Main application component
├── main.tsx         # Entry point
├── utils/weatherApi.ts  # API configuration
└── components/      # Reusable components
    ├── CityInput.tsx
    └── Forecast.tsx
```

## Development Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint checks
