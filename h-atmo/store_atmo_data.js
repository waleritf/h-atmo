const sensor = require("node-dht-sensor");
const { Client } = require("pg");
const databaseConnectionString = "postgres://wv0id:h@tm0@localhost:5432/h_atmo"
const client = new Client({ connectionString: databaseConnectionString });

function getSensorData() {
  return new Promise((resolve, reject) => {
    resolve(Object.assign(sensor.read(11, 14), { timestamp: new Date().getTime() }))
  })
}

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

async function storeAtmoData() {
  let { temperature, humidity, timestamp } = await getSensorData()
  let insertAtmoDataQuery = `
    INSERT INTO atmo_data(temperature, humidity, timestamp)
      VALUES (${temperature}, ${humidity}, to_timestamp(${timestamp}));
  `
  console.log(await dbQuery(insertAtmoDataQuery))
}

client.connect()
setInterval(() => { storeAtmoData() }, 30000)
