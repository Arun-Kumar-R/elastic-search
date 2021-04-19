const elasticsearch = require("elasticsearch");
const cities = require('../assets/cities.json');
const client = new elasticsearch.Client({
  hosts: ["http://localhost:9200"],
});
client.ping(
  {
    requestTimeout: 30000,
  },
  (error) => {
    if (error) {
      console.error("Elasticsearch cluster is down!");
    } else {
      console.log("Everything is ok");
    }
  }
);

// create a new index called scotch.io-tutorial. If the index has already been created, this function fails safely
// client.indices.create({
//   index: 'elastic-demo'
// }, (error, response, status) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("created a new index", response);
//   }
// });

let bulk = [];
cities.forEach(city => {
  bulk.push({
    index: {
      _index: "elastic-demo",
      _type: "cities_list",
    }
  })
  bulk.push(city)
})
//perform bulk indexing of the data passed
client.bulk({ body: bulk }, (err, response) => {
  if (err) {
    console.log("Failed Bulk operation", err)
  } else {
    console.log("Successfully imported %s", cities.length);
  }
});
module.exports = client;
