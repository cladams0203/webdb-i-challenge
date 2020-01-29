const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    db('accounts')
        .then(account => {
            console.log(account)
            res.status(200).json(account)
        })
        .catch(err => res.status(500).json(err))
})
server.post('/', (req, res) => {
    db('accounts').insert(req.body, 'id')
        .then(account => {
            res.status(201).json(account)
        })
        .catch(err => res.status(500).json(err))
})
server.put('/:id', (req,res) => {
    db('accounts').where({id : req.params.id})
    .update(req.body)
    .then(account => {
        res.status(201).json(account)
    })
    .catch(err => res.status(500).json(err))
})
server.delete('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
    .del()
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => res.status(500).json(err))
})

module.exports = server;