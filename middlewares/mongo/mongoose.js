const mongoose = require("mongoose");

const connect = () => {
  const url = `mongodb://${process.env.MONGODB_USER}:${
    process.env.MONGODB_PASS
  }@${process.env.MONGODB_URL}`;
  const options = {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true
  };

  mongoose.connect(url, options);
  mongoose.set("useCreateIndex", true);

  mongoose.connection.on("error", err => {
    console.log("Erro na conexão com o banco de dados: " + err);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Aplicação desconectada do banco de dados!");
  });
  mongoose.connection.on("connected", () => {
    console.log("Aplicação conectada ao banco de dados!");
  });
};

module.exports = {
  connect
};
