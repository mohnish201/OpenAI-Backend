const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 4000;

app.use(express.json());

app.get("/quote", async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [
          {
            role: "user",
            content: `Generate a quote on ${keyword}`,
          },
        ],
        max_tokens: 1000,
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const quote = response.data.choices[0].message.content;
    res.status(200).send({ quote: quote });
  } catch (error) {
    console.log(error.response.data);
    res.status(500).send(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
