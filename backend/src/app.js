const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv/config');


const app = express();

app.set("port", process.env.PORT || 5000);

/* Middlewares */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Print JSONS
app.use( express.urlencoded({ extended: true }) );

/* Routes */
app.use("/api/access", require("./routes/userAuth"));
app.use("/api/functions", require("./routes/function"));


// Example : later can be User, Product, ...
// Tested from Postman with GET `http://localhost:3000/api/example, ....
// Running 
//  - development : npm run dev // with nodemon!
//  - default :     npm start   // default script to start node server!

module.exports = app; 