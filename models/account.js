/**
 * Created by Admin on 4/28/16.
 */
var db = require('../config/db');
var moment = require('moment');
var body = require('body-parser');
db.run(`CREATE TABLE IF NOT EXISTS checking (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          createdAt DATETIME,
          description TEXT,
          credit INTEGER,
          debit INTEGER,
          memo TEXT
        )`);

exports.get = function(cb) {
    db.all('SELECT * FROM checking', cb);
};
exports.create = function(trans, cb) {
    var createdAt = moment().valueOf();
    var description = trans.description;
    var credit = trans.credit;
    var debit = trans.debit;
    var memo = trans.memo;

    db.run('INSERT INTO checking (createdAt, description, credit, debit, memo) VALUES (?, ?, ?, ?, ?)', createdAt, description, credit, debit, memo,
        (err) => {
            if(err) return cb(err);

            db.get(`SELECT * 
              FROM    checking
              WHERE   ID = (SELECT MAX(ID)  FROM checking);`, cb)
        });
};

exports.delete = function(trans, cb) {
    var transid = trans.id;
    db.run('DELETE FROM checking where id = ?', transid, cb);
   
};
exports.edit = function(trans, cb) {
   // console.log(trans.body);
    var createdAt = moment().valueOf();
    var description = trans.body.description;
    var credit = trans.body.credit;
    var debit = trans.body.debit;
    var memo = trans.body.memo;
    var transid = trans.body.id;
    db.run('UPDATE checking set createdAt=? where id = '+transid,createdAt,cb);
    db.run('UPDATE checking set description=? where id = '+transid,description,cb);
    db.run('update checking set credit=? where id='+transid, credit,cb);
    db.run('update checking set debit=? where id='+transid,debit,cb);
    db.run('update checking set memo=? where id='+transid,memo,cb);

};