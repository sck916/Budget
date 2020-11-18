const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT =process.env.PORT || 3000;

const app = express();


app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://steve:12345@budget.pfqff.mongodb.net/budget?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// routes
app.use(require("./routes/api.js"));

require('./routes/htmlRoutes.js')(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
