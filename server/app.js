const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://ixtab:1@cluster0.rf2iwla.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start();