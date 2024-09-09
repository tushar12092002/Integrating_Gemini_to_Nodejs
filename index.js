const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("hello world ");
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "value of pie in maths.";

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/content", async (req, res) => {
  try {
    const data = req.body.question;
    const result = await generate(data);
    res.send({
      result: result,
    });
  } catch (error) {
    res.send("error ->  " + error);
  }
});

// generate();
app.listen(3000, () => {
  console.log("server running at port 3000");
});
