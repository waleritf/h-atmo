const { Client } = require("pg")
const client = new Client({ connectionString: "postgres://wv0id:h@tm0@localhost:5432/h_atmo" })

client.connect()

