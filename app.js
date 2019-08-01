const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

const url = config.bd_string;
const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 5,
  useNewUrlParser: true
};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', err => {
  console.log('Erro na conexão com o banco de dados: ' + err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Aplicação desconectada do banco de dados!');
});
mongoose.connection.on('connected', () => {
  console.log('Aplicação conectada ao banco de dados!');
});

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//instanciando os arquivos da rota
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

//associando os arquivos de rota na aplicação
app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3001);

module.exports = app;
