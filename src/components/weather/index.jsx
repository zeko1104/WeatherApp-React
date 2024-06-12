import React, { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=a502fefe419014fa4f0885632380ec55`
      );
      const data = await response.json();

      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  async function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchWeatherData("Baku");
  }, []);

  function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
  }

  console.log(weatherData);

  return (
    <div className="p-6 bg-blue-100 min-h-screen flex flex-col items-center">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div className="text-center text-xl text-gray-700">Loading...</div>
      ) : (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          {/* city name */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          {/* date */}
          <div className="text-center mb-4">
            <span className="text-gray-500">{getCurrentDate()}</span>
          </div>
          {/* temperature */}
          <div className="text-center text-3xl font-bold mb-4">
            {kelvinToCelsius(weatherData?.main?.temp)}°C
          </div>
          {/* description */}
          <p className="text-center text-gray-700 mb-6">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          {/* weather info */}
          <div className="flex justify-around text-center">
            <div>
              <p className="text-xl font-bold">{weatherData?.wind?.speed} m/s</p>
              <p className="text-gray-500">Wind Speed</p>
            </div>
            <div>
              <p className="text-xl font-bold">{weatherData?.main?.humidity}%</p>
              <p className="text-gray-500">Humidity</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
