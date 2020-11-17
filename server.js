// require('dotenv').config();

// const express = require("express");
// const logger = require("morgan");
// const mongoose = require("mongoose");
// const compression = require("compression");

// const PORT = 3000;

// const app = express();

// app.use(logger("dev"));

// app.use(compression());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/budget", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

// // routes
// app.use(require("./routes/api.js"));

// app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}!`);
// });

const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const logger = require("morgan");
const compression = require("compression");
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)


// Load config
dotenv.config({path: './config/config.env'})

const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(logger("dev"));

// body Parser
app.use(compression());
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// express-session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

// Static
app.use(express.static('public'));

// routes
app.use(require('./routes/api.js'));

const PORT = process.env.PORT || 8080


app.listen(PORT, console.log(`Server running on ${PORT}`));

