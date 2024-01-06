import express from "express";
import "dotenv/config";
import urls from "./db/urls.model";
import { ytid } from "ytid";

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
app.use(express.json());

app.post("/short", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Missing longUrl in request body" });
  }

  const shortUrl = ytid();
  const date = new Date().toISOString();
  await urls.create({
    longUrl: longUrl,
    shortUrl: shortUrl,
    createdAt: date,
  });
  const shortUrlWithDomain = `http://localhost:${process.env.PORT}/${shortUrl}`;
  return res.json({ shortUrl: shortUrlWithDomain });
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  const longUrl = await urls.findOne({ where: { shortUrl: shortUrl } });

  if (!longUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  } else {
    await urls.update(
      { counter: longUrl.dataValues.counter + 1 },
      { where: { shortUrl: shortUrl } },
    );
  }
  return res.redirect(longUrl.dataValues.longUrl);
});
