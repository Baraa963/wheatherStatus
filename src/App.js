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
  const direction = locale === "ar" ? "rtl" : "ltr";

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
    i18n.changeLanguage("ar").then(() => {
      handleChangeCity(); // Şehir bilgilerini güncelle
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <div
          className="wrapper"
          style={{
            width: "100%",
            height: "36.6em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="card"
            style={{
              width: "82%",
              background: "rgb(28 52 91 / 36%",
              color: "white",
              padding: "1.5rem",
              borderRadius: "15px",
              boxShadow: "0 11px 1px rgba(0,0,0,0.05",
            }}
            dir={direction}
          >
            <div className="card-content">
              <div
                className="card-header"
                dir={direction}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  className="cityName"
                  textAlign={"center"}
                  sx={{ fontWeight: "600", fontSize: "3.5vw" }}
                >
                  {weather.cityName}
                </Typography>
                <Typography
                  className="dateAndTime"
                  textAlign={"center"}
                  sx={{ fontSize: "3.5vw" }}
                >
                  {weather.dateAndTime}
                </Typography>
              </div>
              <div>
                <hr />
              </div>
              <div
                className="weather-details"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
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
                    <Typography textAlign={"right"} style={{ fontSize: "8vw" }}>
                      {weather.temp}°C
                    </Typography>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt="weather-icon"
                    />
                  </div>
                  <div dir={direction}>
                    <Typography className="description" textAlign={"start"} variant="h6">
                      {t(weather.description)}
                    </Typography>
                  </div>
                  <div
                    className="min-max-temp"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "93%",
                    }}
                  >
                    <h5 className="min" style={{ textAlign: "center" }}>
                      {t("min")}: {weather.minTemp}°C
                    </h5>
                    <h5
                      style={{
                        margin: "0 5px",
                        fontSize: "25px",
                        fontWeight: "400",
                      }}
                    >
                      |
                    </h5>
                    <h5 className="max" style={{ textAlign: "center" }}>
                      {t("max")}: {weather.maxTemp}°C
                    </h5>
                  </div>
                </div>

                <CloudIcon
                  className="cloud-icon"
                  sx={{ fontSize: "150px", color: "white" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
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
                    fontWeight: "900",
                    width: "20%",
                    height: "3.4rem",
                    background: "white",
                    color: "black",
                  }}
                  onClick={handleChangeCity}
                >
                  {locale === "en" ? "Search" : " بحث "}
                </Button>
              </div>
            </div>
            <div
              style={{
                marginTop: "1rem",
                width: "100%",

                display: "flex",
                justifyContent: "end",
              }}
              dir={direction}
            >
              <Button variant="text" onClick={handleLanguageClick}>
                {locale === "en" ? "Arabic" : "إنجليزي"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
