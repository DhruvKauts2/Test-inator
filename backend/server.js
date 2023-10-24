const express = require("express");
require("dotenv").config();
const { OpenAI } = require("openai");

const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const openai = new OpenAI({
  apiKey: "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", // This is also the default, can be omitted
});

app.post("/find-complexity", async (req, res) => {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: "who was citizen 4",
      max_tokens: 30,
    });
    return res
      .status(200)
      .json({ success: true, data: response.data.choices[0].text });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.log(error);
    }
  }
});

app.post("/", (req, res) => {
  // Get the "body" key from the request body
  const bodyContent = req.body.prompt;

  // Check if the 'body' property is present in the request body
  if (bodyContent) {
    res.send(`Content: ${bodyContent}`);
  } else {
    res
      .status(400)
      .send('Please provide a "body" property in the request body.');
  }
});

app.listen(port, () => {
  console.log("listening at 4000");
});
