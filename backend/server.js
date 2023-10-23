const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(bodyParser.json());

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
