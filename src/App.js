import "./App.css";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField"; // Şehir ismi için TextField
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
moment.locale("ar");

function App() {
  const { t, i18n } = useTranslation();
  const theme = createTheme({
    typography: {
      fontFamily: ["IBM"],
    },
  });

  const [weather, setWeather] = useState({
    cityName: "",
    dateAndTime: null,
    temp: null,
    description: "",
    minTemp: null,
    maxTemp: null,
  });

  const [locale, setLocale] = useState("ar");
  const [city, setCity] = useState("kilis"); 
  const direction = locale ==="ar"?"rtl":"ltr"

  function handleLanguageClick() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setWeather({
      ...weather,
      dateAndTime: moment().format("MMMM Do YYYY, h:mm a"),
    });
  }

  function handleChangeCity() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=38cc39a17c3d6842bed39cdde9ebddf0`
      )
      .then(function (response) {
        setWeather({
          cityName: response.data.name,
          dateAndTime: moment().format("MMMM Do YYYY, h:mm a"),
          temp: Math.round(response.data.main.temp - 273.15),
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          minTemp: Math.round(response.data.main.temp_min - 273.15),
          maxTemp: Math.round(response.data.main.temp_max - 273.15),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    i18n.changeLanguage("ar");
    handleChangeCity(); // İlk yüklemede varsayılan şehri getir
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            className="card"
            style={{
              width: "90%",
              background: "rgb(28 52 91 / 36%",
              color: "white",
              padding: "1rem",
              borderRadius: "15px",
              boxShadow: "0 11px 1px rgba(0,0,0,0.05",
            }}
            dir ={direction}
          >
            <div className="card-content">
              <div
                className="card-header"
                dir ={direction}
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "start",
                }}
              >
                <Typography
                  variant="h3"
                  textAlign={"center"}
                  sx={{ marginRight: "1rem", fontWeight: "600" }}
                >
                  {weather.cityName}
                </Typography>
                <Typography
                  variant="h5"
                  textAlign={"center"}
                  sx={{ marginRight: "1rem" }}
                >
                  {weather.dateAndTime}
                </Typography>
              </div>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "15px",
                }}
              >
                <div className="deg-desc" style={{ textAlign: "right" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h2" textAlign={"right"}>
                      {weather.temp}°C
                    </Typography>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt="weather-icon"
                    />
                  </div>
                  <div dir={direction} >
                  <Typography textAlign={"start"} variant="h6">{t(weather.description)}</Typography>

                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "70%",
                    }}
                  >
                    <h5 style={{ textAlign: "center" }}>
                      {t("min")}: {weather.minTemp}°C
                    </h5>
                    <h5 style={{ margin: "0 5px" }}>|</h5>
                    <h5 style={{ textAlign: "center" }}>
                      {t("max")}: {weather.maxTemp}°C
                    </h5>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "175%",
                    }}
                  >
                    <TextField
                      label="Select city"
                      variant="outlined"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      sx={{
                        width: "75%",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                          },
                          "&:hover fieldset": {
                            borderColor: "white",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "white",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white",
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        width: "20%",
                        height: "9.8vh",
                        background: "white",
                        color: "black",
                      }}
                      onClick={handleChangeCity}
                    >
                      {locale === "en" ? "Search" : " بحث "}
                    </Button>
                  </div>
                </div>
                <CloudIcon sx={{ fontSize: "200px", color: "white" }} />
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "0.5rem",
              width: "100%",
             
              display: "flex",
              justifyContent: "end",
            }}
            dir ={direction}
          >
            <Button variant="text" onClick={handleLanguageClick}>
              {locale === "en" ? "Arabic" : "إنجليزي"}
            </Button>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
