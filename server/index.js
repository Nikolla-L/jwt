const {
    GenerateJWT,
    DecodeJWT, 
    ValidateJWT
} = require('./dec-enc.js');
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
const port = process.env.POST || 3001;

app.get('/', (req, res) => {
    res.send('Hey man...');
});

app.post('/api/GenerateJWT', (req, res) => {
    let {header, claims, key} = req.body;
    key = key || 'secret';
    res.json(GenerateJWT(req.body.header, req.body.claims, req.body.key));
});

app.post('/api/DecodeJWT', (req, res) => {
    res.json(DecodeJWT(req.body.token));
});

app.post('/api/ValidateJWT', (req, res) => {
    let {header, claims, key} = req.body;
    key = key || 'secret';
    res.json(ValidateJWT(req.body.header, req.body.token, req.body.key));
});

app.listen(3001, () => {
    console.log('app is running on port 3001');
});