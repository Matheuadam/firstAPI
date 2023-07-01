// config inicial

require("dotenv").config; // importa o modulo dotenv
const express = require("express"); // importando o express
const res = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const app = express(); // inicializando o express

// Lendo o json / middlewares

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rota da API
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);

// entregar uma porta
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.9fjeosr.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectamos ao MongoDB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
