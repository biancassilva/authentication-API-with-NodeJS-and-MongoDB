require("dotenv").config();

const express = require("express");

const indexRoute = require("./Routes/index");
const mongoose = require("./middlewares/mongo/mongoose");
const usersRoute = require("./Routes/users");

const app = express();

/**
 * Start MongoDB connection
 */
mongoose.connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//associando os arquivos de rota na aplicação
indexRoute.install(app);
usersRoute.install(app);

app.listen(process.env.PORT);

module.exports = app;
