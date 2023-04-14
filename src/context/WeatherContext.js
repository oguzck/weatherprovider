import { createContext, useState, useEffect } from "react"
import axios from 'axios';

export const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
  const [city, setCity] = useState('Istanbul');
  const [weatherData, setWeatherData] = useState(null);
  const APIkey = '9377e05a248f8448b63cfef7e28f0d84';

  useEffect(() => {
    const BaseURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=en&appid=${APIkey}&cnt=40`;
    axios.get(BaseURL)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [city]);

  return (
    <WeatherContext.Provider value={{ city, setCity, weatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};
