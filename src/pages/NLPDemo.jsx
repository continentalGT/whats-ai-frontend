import React, { useState } from "react";
import "../App.css";

function NLPDemo() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setResult("⚠️ Please enter some text first.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      // ✅ Backend URL — make sure this matches your running FastAPI server
      const response = await fetch("http://127.0.0.1:8000/api/nlp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorMessage}`);
      }

      const data = await response.json();
      console.log("Backend Response:", data);

      // ✅ Handle model response gracefully
      if (data.label && data.score !== undefined) {
        setResult(`${data.label} (${(data.score * 100).toFixed(2)}%)`);
      } else {
        setResult("⚠️ Unexpected response format from backend.");
      }
    } catch (error) {
      console.error("Error fetching NLP result:", error);
      setResult("❌ Error: Could not connect to backend. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nlp-container" style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f6efff", minHeight: "90vh" }}>
      <h2 style={{ color: "purple" }}>NLP Text Processor</h2>

      <textarea
        rows="5"
        cols="60"
        placeholder="Enter text to analyze..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          marginTop: "1rem",
          padding: "1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
          resize: "none",
        }}
      ></textarea>

      <br />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "purple",
          color: "white",
          border: "none",
          padding: "0.7rem 1.5rem",
          borderRadius: "6px",
          marginTop: "1rem",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Process Text"}
      </button>

      <h3 style={{ marginTop: "2rem", color: "purple" }}>Result:</h3>
      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{result}</p>
    </div>
  );
}

export default NLPDemo;
