'use strict';
var express = require('express');
var router = express.Router();
var sql = require("mssql");

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/test', (req, res) => {
    var config = {
        user: 'insidesales',
        password: 'Lapp_1234',
        server: 'LGNASQL1',
        database: 'SALES'
    };

    var connection = new sql.ConnectionPool(config);

    connection.connect().then(() => {
        var request = new sql.Request(connection);
        request.query(`INSERT INTO db_datawriter.quotes VALUES ('9999999', 999, '2009999', 1, 1, 0, 0, 'Angelo Bovino', '2018-09-11 17:19:59.000', 'Angelo Bovino', '2018-09-11 17:19:59.000', 'no notes'); SELECT @@identity AS new_id`).then((recordset) => {
            console.log(recordset);
            res.send(recordset);
        }).catch((err) => {
            res.send(err);
            console.log(err);
        })
    }).catch((err) => {
        res.send(err);
        console.log(err);
    })
    
})

module.exports = router;
