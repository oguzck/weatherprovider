import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import options from '../options/options';

export default function Container() {
    const { city, setCity, weatherData } = useContext(WeatherContext);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    if (!weatherData) {
        return <div>Loading...</div>;
    }
    //bu fonksiyon contextten dönen weatherdatayı haftalık günler , en yüksek ve en düşük sıcaklık değeri , description ve icon olarak ayırmamıza yarar 
    const dailyData = weatherData.list.reduce((acc, data, index) => {
        const date = data.dt_txt.split(' ')[0];
        const time = data.dt_txt.split(' ')[1];
        const day = new Date(date).toLocaleString('en-us', {weekday: 'long'});
      
        if (!acc[date]) {
          acc[date] = { date, day, min: data.main.temp, max: data.main.temp, time, description: '', icon: '' };
        } else {
          acc[date].min = Math.min(acc[date].min, data.main.temp);
          acc[date].max = Math.max(acc[date].max, data.main.temp);
          if (time === '12:00:00') {
            acc[date].description = data.weather[0].description;
            acc[date].icon = data.weather[0].icon;
          }
        }
      
        if (index === 0 && acc[date].time !== '12:00:00') {
          acc[date].description = data.weather[0].description;
          acc[date].icon = data.weather[0].icon;
        }
      
        return acc;
      }, {});
      

    const dailyList = Object.values(dailyData);

    return (
        <div className='container'>
            <div className='col-md-3' style={{position:"left"}}>
            <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" value={city} onChange={handleCityChange}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            </div>
            <div className='col-md-10'>
            {dailyList.map((daily) => (
                <div style={{ clear: "both", marginTop: "20px" }} key={daily.date} className='weather-cards'>
                    <h8>{daily.day}</h8>
                    <br></br>
                    <>
                        <img src={`http://openweathermap.org/img/w/${daily.icon}.png`} alt={daily.description} />
                    </>
                    <p>{ Math.round(daily.min)}°  {Math.round(daily.max)}°</p>
                </div>
            ))}
            </div>
        </div>
    );
}
