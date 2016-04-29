/**
 * Created by Admin on 4/28/16.
 */
var sqlite3 = require('sqlite3').verbose();
var path = require('path');

var dbPath = path.join(__dirname, '../data/checking.db');

var db = new sqlite3.Database(dbPath);

module.exports = db;
