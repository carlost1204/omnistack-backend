const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const database = require('./config/database');

const app = express();

app.use(cors()); // determina quem pode acessar a aplicação - está liberado

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect(database.conection,
    {
        useNewUrlParser: true //converse a string de conexão
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended : true })) // receber arquivos na requisição
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(3333);