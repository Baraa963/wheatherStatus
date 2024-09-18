import "./App.css";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField"; // Şehir ismi için TextField
import CloudIcon from "@mui/icons-material/Cloud";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setCity, fetchWeather } from "./weatherApiSlice";

moment.locale("ar");

function App() {
  const { t, i18n } = useTranslation();
  const theme = createTheme({
    typography: {
      fontFamily: ["IBM"],
    },
  });

  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });
  const weather = useSelector((state) => {
    return state.weather.weather;
  });
  const city = useSelector((state) => state.weather.city); // Redux'taki şehir adını seç
  const [inputCity, setInputCity] = useState(city); // Local state for TextField

  const dispatch = useDispatch();

  const [locale, setLocale] = useState("ar");
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
  }

  function handleChangeCity() {
    dispatch(setCity(inputCity)); // Dispatch the new city to Redux
    dispatch(fetchWeather(inputCity)); // Fetch weather for the new city
  }

  useEffect(() => {
    if (city && city !== "undefined") {
      dispatch(fetchWeather(city));
    }
  }, [city, dispatch]);
  

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
                    {isLoading ? (
                      <CircularProgress sx={{ color: "white" }} />
                    ) : null}

                    <Typography textAlign={"right"} style={{ fontSize: "8vw" }}>
                      {weather.temp}°C
                    </Typography>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt="weather-icon"
                    />
                  </div>
                  <div dir={direction}>
                    <Typography
                      className="description"
                      textAlign={"start"}
                      variant="h6"
                    >
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
                  onChange={(e) => dispatch(setCity(e.target.value))} // Redux'taki şehir bilgisini güncelle
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
