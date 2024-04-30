import express from "express";
import "dotenv/config";
import dbHandler from "./db/db.handler";
import path from "path";
import { isValidURL } from "./helper/helpers";

const app = express();
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
app.use(express.json());
app.use(express.static("src/static"));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/healthcheck", async (req, res) => {
 return res.status(200).json({ status: "OK" });
});


app.post("/short", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Missing longUrl in request body" });
  }

  const isUrl = isValidURL(longUrl);

  if (isUrl) {
    const shortUrl = await dbHandler.addRecord(longUrl);
    const shortUrlWithDomain = `http://localhost:${process.env.PORT}/${shortUrl}`;
    return res.json({ shortUrl: shortUrlWithDomain });
  } else {
    return res.status(403).json({ error: "Not a valid URL!" });
  }
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
