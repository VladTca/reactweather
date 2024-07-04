import './App.css'
import {useState} from "react";
import {Weather} from "./Weather.tsx";

function App() {
    const [city, setCity] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [weather, setWeather] = useState<{ temp: number, description: string } | null>(null);
    const fetchWeather = () => {
        const apiKey = "80bed376c413d9670428f732fef045bf"


        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === "404") {
                    setError('City not found');
                    setWeather(null);
                } else {
                    setWeather({
                        temp: json.main.temp,
                        description: json.weather[0].description
                    });
                    setError(null);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setError('An error occurred');
                setWeather(null);
            });
    }


    return (
        <div className="App">
            <h1>Weather App</h1>
            <div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />
                <button onClick={fetchWeather}>Get Weather</button>
            </div>
            {weather && <Weather temp={weather.temp} description={weather.description}/>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}

export default App
