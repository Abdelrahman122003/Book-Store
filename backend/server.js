const app = require('./app');
const mongoose = require('mongoose');

const DB = 'mongodb+srv://mostafa3132004:DuXaxkJrP8RGuXR2@cluster0.tyo186d.mongodb.net/';
const DB1 = 'mongodb+srv://mostafa3132004:<DuXaxkJrP8RGuXR2>@cluster0.tyo186d.mongodb.net/?retryWrites=true&w=majority';
const port = 2003;

mongoose.set("strictQuery", false);
mongoose
    .connect(DB1)
    .then(() => {
        console.log('Database connected successfully!');
        app.listen(port , () => {
            console.log(`listeninig to port ${port}...`);
        });
    })
    .catch(err => {
        console.log(err);
    });
