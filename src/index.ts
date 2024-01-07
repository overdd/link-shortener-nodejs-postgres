import express from "express";
import "dotenv/config";
import dbHandler from "./db/db.handler";
import path from "path";

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
app.use(express.json());
app.use(express.static("src/static"));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.post("/short", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Missing longUrl in request body" });
  }

  const shortUrl = await dbHandler.addRecord(longUrl);

  const shortUrlWithDomain = `http://localhost:${process.env.PORT}/${shortUrl}`;
  return res.json({ shortUrl: shortUrlWithDomain });
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  const dbRecord = await dbHandler.find(shortUrl);

  if (!dbRecord) {
    return res.status(404).json({ error: "Short URL not found" });
  } else {
    await dbHandler.incrementCounter(dbRecord, shortUrl);
  }
  return res.redirect(dbRecord.dataValues.longUrl);
});
