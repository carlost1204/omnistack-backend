const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer')

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');


routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
routes.post(
    '/boxes/:id/files', 
    multer(multerConfig).single('file'), //variavel no request que será passado os arquivos
    FileController.store
    );


module.exports = routes;