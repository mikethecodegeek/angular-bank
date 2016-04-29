/**
 * Created by Admin on 4/28/16.
 */
var express = require('express');
var router = express.Router();


var Account = require('../models/account');

router.route('/')
    .get((req, res) => {

        Account.get((err, trans) => {
            if(err) {
                return res.status(400).send(err);
            }

            res.send(trans);
        });
    })
    .post((req, res) => {
        // req.body  -->  { desc: ??, dueDate: ?? }
        Account.create(req.body, (err, newTrans) => {
            if(err) {
                return res.status(400).send(err);
            }
            res.send(newTrans);
        });
    });
    router.delete('/:id',(req, res) => {
        console.log(req.params);
        Account.delete(req.params, err => {
            res.status(err ? 400 : 200).send(err);
        });
    });
    router.put('/',(req, res) => {
        // req.body  -->  { desc: ??, dueDate: ?? }
        Account.edit(req, (err, newTrans) => {
            if(err) {
                return res.status(400).send(err);
            }
            res.send(newTrans);
        });
    });
module.exports = router;