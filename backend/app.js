require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3535"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.send(text);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate text");
  }
});

app.listen(9090, console.log("Server is running"));
