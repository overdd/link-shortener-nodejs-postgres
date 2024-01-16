import urls from "./urls.model";

urls
  .sync({ force: true })
  .then(() => {
    console.log("Urls table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating table:", error);
  });
