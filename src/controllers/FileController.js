const File = require('../models/File');
const Box = require('../models/Box');

class FileController{
    async store (req, res) {
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });

        box.files.push(file);

        await box.save();

        req.io.sockets.in(box._id).emit('file', file); //usuários conectados na mesma box id vão ser notificados com o file adicionado
        
       return res.json(file);
    }
}

module.exports = new FileController();