import { Model, ModelStatic } from "sequelize";
import urls from "./urls.model";
import { ytid } from "ytid";

class DBHandler {
    private urls: ModelStatic<Model<any, any>>;
    constructor(urls: ModelStatic<Model<any, any>>) {
        this.urls = urls;
    }

    public async addRecord(longUrl: string): Promise<string>{
        const shortUrl = ytid();
        await this.urls.create({
          longUrl: longUrl,
          shortUrl: shortUrl,
          createdAt: new Date().toISOString(),
        });
        return shortUrl;
    }

    public async find(shortUrl: string): Promise<Model<any, any> | null> {
        return await urls.findOne({ where: { shortUrl: shortUrl } });
    }

    public async incrementCounter(dBRecord: Model<any, any>, shortUrl: string): Promise<void> {
        await urls.update(
            { counter: dBRecord.dataValues.counter + 1 },
            { where: { shortUrl: shortUrl } },
          );
    }
}

export default new DBHandler(urls);