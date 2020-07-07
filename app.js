// Import the necessary packages
const express = require("express");
const app = express(); // get app handle
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

mongoose.connect(
  "mongodb+srv://naveen98:" +
    process.env.MONGO_ATLAS_PW +
    "@gte-v4wni.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, // For deprecation
    useUnifiedTopology: true, // For deprecation
    // useMongoClient: true,
  }
);

// Below line to deal with Deprecation warning
mongoose.Promise = global.Promise;
// For logging requests
app.use(morgan("dev"));
// Make uploads folder statically/publically available
app.use("/uploads", express.static("uploads"));
// For parsing body of the requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // This is for CORS errors. Replace "*" with "http://GTE.com"
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  //   This for the browser when it checks if a POST/GET/.. request can be made
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.status(200).json({});
  }
  next();
});

// Different submodules of the application
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Response with error message
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
