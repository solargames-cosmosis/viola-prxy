import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.static("public"));

app.get("/proxy", async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.send("No URL provided");
    }

    try {
        const response = await fetch(url);
        const text = await response.text();
        res.send(text);
    } catch (err) {
        res.status(500).send("Viola proxy error");
    }
});

app.listen(8080, () => {
    console.log("Viola running on port 8080");
});
