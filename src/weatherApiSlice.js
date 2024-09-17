import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
export const fetchWeather = createAsyncThunk("weatherApi/fetchWeather", async (city) => {
    
    console.log("calling fetch weather for city:", city);
  
    // OpenWeather API isteği
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=38cc39a17c3d6842bed39cdde9ebddf0`
    );
   
    // API sonucunu konsola yazdırma
    console.log(response.data);
    return {
        cityName: response.data.name,
        dateAndTime: moment().format("MMMM Do YYYY, h:mm a"),
        temp: Math.round(response.data.main.temp - 273.15),
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        minTemp: Math.round(response.data.main.temp_min - 273.15),
        maxTemp: Math.round(response.data.main.temp_max - 273.15),
      };
});
export const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    city: "kilis", // Varsayılan şehir,
    weather:{},
    isLoading:false,
  },
  reducers: {
     setCity: (state, action) => {
      state.city = action.payload; // Yeni şehir bilgisini güncelle
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state,action) => {
        console.log("==================")
        console.log(state,action)
        state.isLoading=true
        console.log(state.isLoading)

      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        console.log("---------*******-------")
        console.log(state,action)
        state.isLoading = false
        console.log(state.isLoading)
        state.weather = action.payload;
        console.log("_+_+_+_+")
        console.log(state.weather);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false
      });
  },
});

// Action creators are generated for each case reducer function
export const { setCity } = weatherApiSlice.actions;

export default weatherApiSlice.reducer;
