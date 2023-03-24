const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const env = require("./env.json");
// const port = process.env.PORT || env.listen_port;
const port = process.env.PORT || 5000;
const mysql = require('mysql');
const config = require('./db');
const randomstring = require("randomstring");

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));

//здесь наше приложение отдаёт статику
app.use(express.static(path.join(__dirname, 'build')));

//простой тест сервера
app.get('/ping', function (req, res) {
    return res.send('pong');
});

//обслуживание html
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// БД
let connection = mysql.createConnection(config);

// старт сервера
app.listen(port, () => {
    console.log('Server working on port: ' + port)

    app.post('/', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let params = JSON.parse(body);
            res.writeHead(200, { "Content-Type": "application/json" });
            if (params.note) {
                let note = params.note;
                note = note.trim();
                let noteTimer = params.timer;

                let url = randomstring.generate({
                    length: 24,
                    capitalization : 'lowercase'
                });
                let text = note;
                let timer = noteTimer;
                let timestamp = Math.floor(Date.now() / 1000);
                let created_at = Date.now();

                let sql = "INSERT INTO ?? (`url`, `timestamp`, `text`, `timer`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, '')";
                let inserts = ['notes', url, timestamp, text, timer, created_at];
                sql = mysql.format(sql, inserts);

                connection.query(sql, function (error, results, fields) {
                    if (error) throw error;
                    res.end(JSON.stringify({ 'result': true, 'url': url }))
                })
            }
            else if (params.url) {
                let url = params.url;
                url = url.trim();
                // Finding message
                let sql = "SELECT * FROM `notes` WHERE `url` = ?";
                let inserts = [url];
                sql = mysql.format(sql, inserts);

                connection.query(sql, function (error, results, fields) {
                    if (error) throw error;
                    else if (results.length === 1) {
                        res.end(JSON.stringify({ 'result': true, "note": results[0].text, "timer": results[0].timer, "url": results[0].url, }))
                        // deleting message
                        let deleteQueryString = "DELETE FROM `notes` WHERE id =" + results[0].id;
                        connection.query(deleteQueryString, function (error, results, fields) {
                            if (error) throw error;
                        })
                    }
                    else {
                        res.end(JSON.stringify({ 'result': false, "text": 'note not found' }));
                    }
                });
            }
        });
    })
})