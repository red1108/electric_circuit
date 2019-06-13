const app = require('express')();
const http = require('http');

const port = 8888;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/public/sketch.js', (req, res) => {
    res.sendFile(__dirname + '/public/sketch.js');
});
app.get('/public/library/p5.js', (req, res) => {
    res.sendFile(__dirname + '/public/library/p5.js');
});
app.get('/public/library/addons/p5.dom.js', (req, res) => {
    res.sendFile(__dirname + '/public/library/addons/p5.dom.js');
});
const server = http.createServer(app).listen(port, () => {
    console.log(`server listening on port ${port}`);
    console.log(`click http://localhost:${port}`);
});