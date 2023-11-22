import axios, { AxiosError } from "axios";
import { FC, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import {FaSearch, FaSpinner} from 'react-icons/fa';
import { WeatherApiResponse } from "../interfaces/weatherApi.interface";
import toast from "react-hot-toast";

const Search: FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherApiResponse>();
  const [loading, setLoading] = useState<boolean>(false);
    const handleSearch = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${apiKey}&units=metric`;
          await axios.get(apiUrl)
          .then((response) => {setWeatherData(response.data)})
          .catch((error) => {
            if (error.response.data.message) {
              toast(error.response.data.message)
            }
          });
    
          
        } catch (error) {
          console.error('Error al obtener datos del clima:', error);
          // Puedes manejar el error de alguna manera (mostrar un mensaje de error, etc.)
          
        }
        setLoading(false);
      };
      
  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search city"
          aria-label="Search city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleSearch} disabled={loading}>
            {loading? <FaSpinner className="spinner" />: <FaSearch/>}
        </Button>
      </InputGroup>

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          {/* Puedes mostrar más detalles según la respuesta de la API */}
        </div>
      )}
    </div>
  );
};

export default Search;
