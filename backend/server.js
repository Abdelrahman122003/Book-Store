const app = require('./app');

const port = 2003;

app.listen(port , () => {
    console.log(`I'm listeninig on port ${port}...`);
});