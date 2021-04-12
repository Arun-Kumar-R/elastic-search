const client = require("./config/connection");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.set("port", process.env.PORT || 3001);

app.get("/", (req, res) => {
  res.send("welcome to elastic search...");
});

app.get("/search", (req, res) => {
  let data = {
    size: req.query.size,
    from: 0,
    query: {
      match: {
        name: `${req.query.name}`,
      },
    },
  };
  client
    .search({ index: "elastic-demo", body: data, type: "cities_list" })
    .then((results) => {
      res.status(200).json({
        success: true,
        data: results.hits,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        data: [],
        message: err.message,
      });
    });
});
app.listen(app.get("port"), () => {
  console.log("Magic happens on PORT: " + app.get("port"));
});
