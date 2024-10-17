/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

// Initialize the Firebase Admin SDK
admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).json({error: "Error counting books"});
    }
  });
});


exports.getBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      // 获取每本书的详细信息并返回
      const books = snapshot.docs.map((doc) => ({
        ...doc.data(), // 获取文档中的数据
      }));

      // 返回书籍的详细信息
      res.status(200).json({books});
    } catch (error) {
      console.error("Error fetching books:", error.message);
      res.status(500).json({error: "Error fetching books"});
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
const functions = require("firebase-functions");
const axios = require("axios");

// 替换为你的 OpenWeatherMap API 密钥
const apiKey = "72315f628ec2447a29c06f3f7b68a3d1";

exports.getWeather = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const city = req.query.q;
    const lat = req.query.lat;
    const lon = req.query.lon;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;

    // 根据请求参数构造 API 请求
    if (city) {
      apiUrl += `&q=${city}`;
    } else if (lat && lon) {
      apiUrl += `&lat=${lat}&lon=${lon}`;
    }

    try {
      const response = await axios.get(apiUrl);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({error: "Error fetching weather data"});
    }
  });
});
