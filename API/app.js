const express = require("express");
const axios = require("axios");
const ExcelJS = require("exceljs");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Replace with your OpenAI API key
const OPENAI_API_KEY = "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";

app.post("/query-gpt", async (req, res) => {
  try {
    const { inputText } = req.body;

    // Make a request to the OpenAI API with the input text
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci/completions",
      {
        prompt: inputText,
        max_tokens: 50, // Adjust as needed
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const gptResponse = response.data.choices[0].text;

    // Create an Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Test Cases");

    // Add headers to the Excel sheet
    worksheet.addRow([
      "Test case name",
      "Test case step",
      "Expected result of test step",
    ]);

    // Add data from the GPT-3 response to the Excel sheet
    // You may need to parse the GPT-3 response to extract the test case information
    // For example, if the response is in a specific format, you can use regular expressions to extract data.
    // Here, we're just adding dummy data as an example.
    worksheet.addRow(["Test Case 1", "Step 1", "Expected Result 1"]);
    worksheet.addRow(["Test Case 1", "Step 2", "Expected Result 2"]);
    worksheet.addRow(["Test Case 2", "Step 1", "Expected Result 3"]);

    // Generate the Excel file in memory
    const buffer = await workbook.xlsx.writeBuffer();

    // Set the response headers for Excel file download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=test_cases.xlsx"
    );
    res.send(buffer);
  } catch (error) {
    console.error("Error querying GPT-3:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
