import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.get("/browser", async (req, res) => {
    let url = req.query.url;

    if (!url) return res.send("No URL");

    try {
        url = Buffer.from(url, "base64").toString("utf8");

        const response = await fetch(url);
        const html = await response.text();

        res.send(html);

    } catch {
        res.send("Error loading page");
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Viola running on port " + PORT);
});
