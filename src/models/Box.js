const mongoose = require('mongoose');

const Box = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File"}]
    },
    {
        timestamps: true // cria dois campos (created at / updated at)
    }
);

module.exports = mongoose.model("Box", Box);