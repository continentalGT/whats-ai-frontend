import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../App.css";

function VisionDemo() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setDetections([]);
    }
  };

  const handleSubmit = async () => {
    if (!image) return alert("Please upload an image first.");
    const formData = new FormData();
    formData.append("file", image);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/vision/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDetections(res.data.detections || []);
    } catch (err) {
      console.error("Detection error:", err);
      alert("Could not connect to backend");
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Draw bounding boxes
  useEffect(() => {
    if (!preview || detections.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      detections.forEach((det) => {
        const { xmin, ymin, xmax, ymax } = det.box;
        const color = "rgba(128,0,128,0.8)";
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(xmin, ymin, xmax - xmin, ymax - ymin);

        ctx.fillStyle = color;
        ctx.font = "18px Segoe UI";
        const text = `${det.object} ${(det.confidence * 100).toFixed(1)}%`;
        const textWidth = ctx.measureText(text).width + 6;
        ctx.fillRect(xmin, ymin - 22, textWidth, 22);
        ctx.fillStyle = "#fff";
        ctx.fillText(text, xmin + 3, ymin - 5);
      });
    };

    img.src = preview;
  }, [detections, preview]);

  return (
    <div style={{ textAlign: "center", padding: "2rem", backgroundColor: "#f9f4ff", minHeight: "90vh" }}>
      <h2 style={{ color: "purple" }}>Computer Vision – Object Detection</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
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
        {loading ? "Detecting..." : "Detect Objects"}
      </button>

      <div style={{ marginTop: "2rem" }}>
        <canvas ref={canvasRef} style={{ maxWidth: "90%", borderRadius: "10px" }} />
      </div>

      {detections.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3 style={{ color: "purple" }}>Detected Objects:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {detections.map((d, i) => (
              <li key={i} style={{ margin: "0.3rem 0", fontWeight: "bold" }}>
                {d.object} — {(d.confidence * 100).toFixed(1)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default VisionDemo;
