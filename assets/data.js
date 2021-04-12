const cities = require("./cities.json");
const client = require("../config/connection");

let bulk = [];

cities.forEach((city) => {
  bulk.push({
    index: {
      _index: "elastic-demo",
      _type: "cities_list",
    },
  });
  bulk.push(city);
});

client.bulk({ body: bulk }, (err, response) => {
  if (err) {
    console.log("Failed Bulk operation".red, err);
  } else {
    console.log("Successfully imported", cities.length);
  }
});
