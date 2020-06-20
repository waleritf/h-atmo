const express = require("express");
const { Client } = require("pg")
const databaseConnectionString = "postgres://wv0id:h@tm0@localhost:5432/h_atmo"
const client = new Client({ connectionString: databaseConnectionString });
const app = express();
const port = 3000 || process.env.PORT;
const sensor = require("node-dht-sensor");

client.connect()

function dbQuery(query) {
  return new Promise((resolve, reject) => {
    client.query(query, (err, res) => {
      if (res) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

app.get('/', (_, res) => {

  let { temperature, humidity } = sensor.read(11, 14);

  res.json({
    temperature,
    humidity,
    timestamp: Date()
  });
});

app.listen(port, () => {
  console.log(`Listen port ${port}`);
});
