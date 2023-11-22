import axios from "axios";
import { FC, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import {BsSearch} from 'react-icons/bs';
import { WeatherApiResponse } from "../interfaces/weatherApi.interface";

const Search: FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherApiResponse>();

    const handleSearch = async (e:any) => {
        e.preventDefault();
    
        try {
            const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
          const response = await axios.get(apiUrl);
    
          setWeatherData(response.data);
        } catch (error) {
          console.error('Error al obtener datos del clima:', error);
          // Puedes manejar el error de alguna manera (mostrar un mensaje de error, etc.)
        }
      };
      
  return (
    <div>
      <Form>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search city"
          aria-label="Search city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleSearch}>
            <BsSearch></BsSearch>
        </Button>
      </InputGroup>

      </Form>
      {weatherData && (
        <div>
          <h2>Datos del Clima para {weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp} °C</p>
          <p>Descripción: {weatherData.weather[0].description}</p>
          {/* Puedes mostrar más detalles según la respuesta de la API */}
        </div>
      )}
    </div>
  );
};

export default Search;
