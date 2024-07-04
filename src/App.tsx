import './App.css'
import {useState} from "react";

function App() {
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    const [city, setCity] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [weather, setWeather] = useState<{temp: number,description: string} | null>(null)

    const fetchWeather = () => {
        const apiKey = "80bed376c413d9670428f732fef045bf"


        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === '404') {
                    setError('City not found')
                    setWeather(null)
                } else {
                    setWeather({temp: json.main.temp, description: json.weather[0].description})
                    setError(null)
                }
            })
            .catch(error => {
                console.error('Error:', error)
                setError('An error occurred. Please try again later.')
                setWeather(null)
            })

    }


    return (
        <div className="App">
            <h1>Weather App</h1>
            <div>{city}</div>
            <div>{weather ? <p>{weather.temp}°C, {weather.description}</p> : null}</div>
            <input type="text" value={city} onChange={(e) => setCity(e.currentTarget.value)}/>
            <button onClick={fetchWeather}>Get Weather</button>
            <p style={{color: 'red'}}>{error ? error : null}</p>
        </div>
    )
}

export default App
