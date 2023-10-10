import React, { useState } from "react";
import axios from "axios";

function ChatApp() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [excelFile, setExcelFile] = useState(null); // Store the Excel file data

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make an API request to your Express.js server
    try {
      const response = await axios.post("http://localhost:5000/query-gpt", {
        inputText: inputText,
      });

      // Handle the API response
      setResponse(response.data.response);

      // Store the Excel file data
      setExcelFile(response.data.excelFile);
    } catch (error) {
      console.error("Error querying the API:", error);
    }
  };

  const handleDownloadExcel = () => {
    if (excelFile) {
      // Create a blob from the Excel file data
      const blob = new Blob([excelFile], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger a click to download the file
      const a = document.createElement("a");
      a.href = url;
      a.download = "test_cases.xlsx";
      a.click();

      // Release the blob and URL
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <h1>Chat with GPT-3</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          style={{ width: "100%", height: "400px", resize: "vertical" }} // Adjust the height as needed
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Send
        </button>
      </form>
      {response && <div className="response">{response}</div>}
      {excelFile && (
        <div>
          <button onClick={handleDownloadExcel}>Download Excel</button>
        </div>
      )}
    </div>
  );
}

export default ChatApp;
