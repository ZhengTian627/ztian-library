<template>
  <div class="container">
    <div class="header">
      <h1>Weather APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>

    <main>
      <div v-if="weatherData">
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

// Firebase Function URL
const firebaseFunctionUrl = "https://us-central1-week7tian.cloudfunctions.net/getWeather";

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273.15)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : null;
    },
  },
  methods: {
    // 根据城市名称获取天气数据
    async searchByCity() {
      try {
        const response = await axios.get(`${firebaseFunctionUrl}?q=${this.city}`);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },

    // 根据用户当前地理位置获取天气数据
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(`${firebaseFunctionUrl}?lat=${latitude}&lon=${longitude}`);
            this.weatherData = response.data;
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        });
      }
    },
  },
  mounted() {
    // 在组件挂载时获取当前地理位置的天气
    this.fetchCurrentLocationWeather();
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.header {
  margin-top: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.search-input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
}

.search-button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #218838;
}

main {
  margin-top: 40px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

img {
  width: 100px;
  height: 100px;
}

p {
  font-size: 32px;
  margin: 0;
}
</style>
