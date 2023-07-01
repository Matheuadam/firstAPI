const router = require("express").Router();

// Resgatando a classe para que possamos trabalhar com nossa models
const Person = require("../models/Person");

// Create - ciação de dados
router.post("/", async (req, res) => {
  // req.body --> criando 3 variaveis utilizando as informações do req
  const { name, salary, approved } = req.body;

  // Verificando se a variavel name foi preenchida
  if (!name) {
    res.status(422).json({ error: "O nome é obrigatório" });
    return;
  }

  //Criando objeto
  const person = {
    name,
    salary,
    approved,
  };

  // create

  try {
    // criando dados
    await Person.create(person);

    res.status(201).json({ message: "Pessoa inserida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read - leitura de dados

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  // extrair dado da requisição

  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    //Caso não seja encontrado um usuário
    if (!person) {
      res.status(202).json({ message: "Usuário não foi encontrado" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// update - Atualização de dados (PUT, PATCH)

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ error: "O usuário não foi encontrado" });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Delete - Exclusão de dados

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ error: "O usuário não foi encontrado" });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
module.exports = router;
