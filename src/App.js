import React, { useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

import "dayjs/locale/en";
import { MyTextField } from "./components/MyTextField";
import { Border } from "./components/Border";
import dayjs from "dayjs";

function App() {
  const API_KEY = `403c1aab20c94b1492901c53bdc06312`;
  const API_ICON = "https://www.weatherbit.io/static/img/icons/";
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");

  const url = `https://api.weatherbit.io/v2.0/current?key=${API_KEY}&city=${location}`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
    }
  };

  const wind = (num) => {
    let num1 = num * 3.6;
    return num1.toFixed(1);
  };

  return (
    <>
      <div className="app">
        <div className="search">
          <MyTextField
            id="outlined-basic"
            label="Enter Location"
            type="outlined"
            variant="outlined"
            autoComplete="off"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            style={{ marginTop: "20px", marginInline: "20px" }}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
          />
        </div>

        {data.data ? (
          <div className="container">
            <section className="top">
              <div className="image">
                {
                  <Box
                    component="img"
                    src={`${API_ICON}${data.data[0].weather.icon}.png`}
                    alt={data.data[0].city_name}
                    sx={{
                      width: 150,
                      height: 150,
                    }}
                  />
                }
              </div>
              <div className="description">
                {
                  <Typography variant="h5">
                    {data.data[0].weather.description}
                  </Typography>
                }
              </div>
              <div className="temp">
                {
                  <Typography
                    variant="h1"
                    component="div"
                    style={{ color: "#feec65" }}
                    gutterBottom
                  >
                    {data.data[0].temp.toFixed(0)}
                    <small>°C</small>
                  </Typography>
                }
              </div>
              <div className="location">
                {<Typography variant="h5">{data.data[0].city_name}</Typography>}
              </div>
              <div className="date">
                {
                  <Typography variant="h6">
                    Today &#8226;{" "}
                    {dayjs(data.data[0].ob_time.substring(0, 10)).format(
                      "DD MMM YYYY"
                    )}
                  </Typography>
                }
              </div>
            </section>
            <section className="bottom">
              <div className="today">
                <Typography variant="h6">Today's Highlights </Typography>
              </div>
              <div className="feels">
                <Typography variant="h6">Feels Like</Typography>
                {
                  <Typography variant="h4">
                    {data.data[0].app_temp.toFixed(0)}°C
                  </Typography>
                }
              </div>
              <div className="humidity">
                <Typography variant="h6">Humidity</Typography>
                {
                  <Typography variant="h5">
                    {data.data[0].rh.toFixed()}%
                  </Typography>
                }
                {
                  <Border
                    variant="determinate"
                    value={parseInt(data.data[0].rh.toFixed())}
                  />
                }
              </div>
              <div className="wind">
                <Typography variant="h6">Wind Speed</Typography>
                {
                  <Typography variant="h4">
                    {wind(data.data[0].wind_spd)} km/h
                  </Typography>
                }
              </div>
              <div className="pressure">
                <Typography variant="h6">Pressure</Typography>
                {<Typography variant="h4">{data.data[0].pres} mb</Typography>}
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
