var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serveStatic = require('serve-static')

app = express();
app.use(serveStatic(__dirname + "/dist"));

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/dist/index.html")
});

var port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App started on port : ${port}`)
})
