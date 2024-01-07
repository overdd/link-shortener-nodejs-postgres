import { Model, ModelStatic } from "sequelize";
import urls from "./urls.model";
import { ytid } from "ytid";

class DBHandler {
  constructor(private urls: ModelStatic<Model>) {
    this.urls = urls;
  }

  public async addRecord(longUrl: string): Promise<string> {
    const shortUrl = ytid();
    await this.urls.create({
      longUrl: longUrl,
      shortUrl: shortUrl,
      createdAt: new Date().toISOString(),
    });
    return shortUrl;
  }

  public async find(shortUrl: string): Promise<Model | null> {
    return await urls.findOne({ where: { shortUrl: shortUrl } });
  }

  public async incrementCounter(
    dBRecord: Model,
    shortUrl: string,
  ): Promise<void> {
    await urls.update(
      { counter: dBRecord.dataValues.counter + 1 },
      { where: { shortUrl: shortUrl } },
    );
  }
}

export default new DBHandler(urls);
