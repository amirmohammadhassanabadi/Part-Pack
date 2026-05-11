const express = require('express')
const cors = require('cors')

// Modules Importing
const { vehicleRouter } = require("./modules/vehicles");

// App
const app = express()


app.use(express.json()); // برای پارس کردن Body درخواست‌ها
app.use(cors())
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('API is running')
})

// Routers
app.use("/api/v1/vehicles", vehicleRouter);

module.exports = app