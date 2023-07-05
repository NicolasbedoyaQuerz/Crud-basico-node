const express = require('express');
const db = require('./utils/database');
const ToDos = require('./models/todos.models');
require("dotenv").config();


const PORT = process.env.PORT ?? 8000;

db.authenticate()
    .then(() => {
        console.log('base de datos conectada correctamente');
    })
    .catch((error) => console.log(error));

db.sync()
    .then(() => {
        console.log('base de datos sincronizada correctamente');
    })
    .catch((error) => console.log(error));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('servidor funcionando')
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await ToDos.findAll();

        res.json(todos);
    } catch (error) {
        res.status(400).json(error)
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const { id }= req.params;
        const todos = await ToDos.findByPk(id);

        res.json(todos);
    } catch (error) {
        res.status(400).json(error)
    }
});


app.post('/todos', async (req, res) => {
    try {
        const newTodo = req.body;
        const todos = await ToDos.create(newTodo);

        res.status(201).json(todos);
    } catch (error) {
        res.status(400).json(error)
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const todosInfo = req.body;

        await ToDos.update(todosInfo, {
            where: {id}
        });

        res.status(204).send();
    } catch (error) {
        res.status(400).json(error)
    }
})


app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;

        await ToDos.destroy({
            where: {id}
        })
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${PORT}`);
});
