const express = require('express');

const app = express();

const port = 2003;

app.listen(port , () => {
    console.log(`I'm listeninig on port ${port}...`);
});

