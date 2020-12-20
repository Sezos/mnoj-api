var express = require("express");
var fs = require("fs");
var bodyParser = require('body-parser');
var submitSolution = require('./routes/submitSolution');
var config = require('./config');

const {
    cacheDirectory
} = config;
const app = express();
const port = process.env.PORT || 8080;

if (!fs.existsSync(cacheDirectory)) {
    fs.promises.mkdir(cacheDirectory);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/submit_solution', submitSolution);

app.listen(port, () => {
    console.log(`MNOJ-API listening at port ${port}`);
});