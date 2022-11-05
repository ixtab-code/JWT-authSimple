const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://ixtab:1cluster0.rf2iwla.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start();