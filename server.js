const express = require('express');

const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://admin:admin@backend.qru7w.mongodb.net/notesLab6?retryWrites=true&w=majority&appName=backend"
const app = express();
const notesRoute = require('./routes/NoteRoutes.js');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/v1/', notesRoute);
mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(2050, () => {
    console.log("Server is listening on port 8081 at http://localhost:2050/");
});