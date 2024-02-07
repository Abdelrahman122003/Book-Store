const app = require('./app');
const mongoose = require('mongoose');

const port = 2003;

mongoose.set("strictQuery", false);
mongoose
    .connect('mongodb+srv://mostafa3132004:DuXaxkJrP8RGuXR2@cluster0.tyo186d.mongodb.net/')
    .then(() => {
        console.log('Database connected successfully!');
        app.listen(port , () => {
            console.log(`listeninig to port ${port}...`);
        });
    })
    .catch(err => {
        console.log(err);
    });
