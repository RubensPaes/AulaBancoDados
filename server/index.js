const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(cors());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let collection;

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('jogos');
    collection = db.collection('jogos');

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

connectDB();

app.use(express.json()); 


app.post('/jogos', async (req, res) => {
  try {
    const novoJogos = req.body;

    const result = await collection.insertOne(novoJogos)
    
    res.status(201).json({ message: 'Jogo criado com sucesso', jogoId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar Jogo', error: err });
  }
});

app.get('/jogos', async (req, res) => {
  try {
    const jogos = await collection.find().toArray()
    res.status(200).json(jogos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar jogos', error: err });
  }
});

const { ObjectId } = require('mongodb');

app.get('/jogos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);
    const matricula = await collection.findOne({ _id: newId });
    //complete o código

    if (!jogos) {
      res.status(404).json({ message: 'Jogos não encontrada' });
    } else {
      res.status(200).json(jogos);
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar jogo', error: err });
  }
});

app.put('/jogos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);
    const atualizacao = req.body;
    const result = await collection.updateOne( { _id: newId }, { $set: atualizacao });
    //complete o código

    if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Jogo não encontrado' });
    } else {
      res.status(200).json({ message: 'Jogo atualizado com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar jogo', error: err });
  }
});

app.delete('/jogos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const newId =  new ObjectId(id);

    //complete o código
    const result = await collection.deleteOne({ _id: newId });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Jogo não encontrado' });
    } else {
      res.status(200).json({ message: 'Jogo excluído com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir jogo', error: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
