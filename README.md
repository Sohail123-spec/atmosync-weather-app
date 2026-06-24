# 🌦️ AtmoSync
**A premium real-time weather forecasting app with immersive atmospheric animations and dynamic themes.**

🔗 **Live:** [sohail123-spec.github.io/atmosync-weather-app](https://sohail123-spec.github.io/atmosync-weather-app/)

---

## 🚀 Features

- **Real-time weather data** powered by WeatherAPI
- **Immersive atmospheric animations** that reflect current conditions
- **Dynamic themes** that adapt to the weather
- **Advanced forecasts** with interactive charts
- **Responsive modern UI** across devices

---

## ⚠️ Known Issue

The live demo currently shows "City not found" with zeroed-out stats on load — this points to the WeatherAPI key not being set correctly for the deployed version. Check that the API key in `script.js` is valid and that the request isn't being blocked by API quota or CORS on GitHub Pages before pointing people at the live link.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | CSS3 |
| Interactivity | Vanilla JavaScript |
| Weather Data | [WeatherAPI](https://www.weatherapi.com/) |
| Hosting | GitHub Pages |

---

## 🛠️ Local Setup

This is a static site — no build step required.

### 1. Clone the repo
```bash
git clone https://github.com/Sohail123-spec/atmosync-weather-app.git
cd atmosync-weather-app
```

### 2. Add your WeatherAPI key
Open `script.js` and add your own [WeatherAPI](https://www.weatherapi.com/) key where the API key is referenced.

### 3. Open it
Open `index.html` directly in your browser, or serve it locally:
```bash
npx serve .
```

---

## 📁 Project Structure

```
atmosync-weather-app/
├── index.html
├── style.css
└── script.js
```

---

## 👨‍💻 Author
Built by **Md Sohail Ahmed**
