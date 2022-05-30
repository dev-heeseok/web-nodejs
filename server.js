const express = require('express');
const app = express();

const path = require('path')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, { dbName: "App" })
  .then(
    console.log("Database connected")
  ).catch(error => {
    console.error(error.message);
    process.exit(1);
  });

const DEF_PORT = 4000;
const PORT = process.env.PORT || DEF_PORT;
const STATIC_PATH = path.join(__dirname, '/public/build');

app.use(express.json());
app.use(express.static(STATIC_PATH));
app.use(cors());
app.get('/', (request, response) => {
  response.send(express.static(path.join(__dirname, '/public/build/index.html')));
})
app.use('/app', routesUrls);

app.listen(PORT, () => console.log("server is up and running ", PORT));