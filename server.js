import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/proxy", async (req, res) => {
  const url = req.query.url;

  if (!url) return res.send("No URL");

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch {
    res.send("Proxy error");
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Viola running on port " + PORT);
});
