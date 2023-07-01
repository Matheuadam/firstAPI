const mongoose = require("mongoose");

// definindo classe person - e criando a tabela persons
const Person = mongoose.model("Person", {
  name: String,
  salary: Number,
  approved: Boolean,
});

// exportando a classe
module.exports = Person;
