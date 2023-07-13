import 'dotenv/config.js'
import express from 'express'
import mysql from 'mysql'
import crypto from 'crypto'

/*
 * SHA256
 */

function sha256(content) {
    return crypto.createHash('sha256').update(content).digest('hex').toLowerCase()
}

/*
 * DATABASE CONNECTION
 */

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    charset: 'utf8',
    connectTimeout: 2000,
})
db.connect()



/*
 * WEB API
 */

const app = express()
app.use(express.json())
app.use(function (req, res, next) {
    const token = req.get('Authorization')
    if (!token) {
        res.status(401).send()
        return
    }
    db.query(
        'SELECT id, name from servers WHERE token = ?',
        [sha256(token)],
        (err, results) => {
            if (!results.length) {
                res.status(401).send()
                return
            }

            req.auth = results[0]
            next();
        }
    )
});

app.get('/users/:steam_id', (req, res) => {
    db.query(
        'SELECT name as server, reason FROM bans INNER JOIN servers ON bans.server_id = servers.id WHERE steamid = ?',
        [req.params.steam_id],
        (err, results) => {
            res.send({
                steam_id: req.params.steam_id,
                bans: results,
            })
        }
    )
})

app.post('/users/:steam_id/bans', (req, res) => {
    db.query(
        'INSERT INTO bans (steamid, server_id, reason) VALUES (?, ?, ?)',
        [req.params.steam_id, req.auth.id, req.body.reason],
        () => {
            res.send({
                steam_id: req.params.steam_id,
                server: req.auth.name,
                reason: req.body.reason,
            })
        }
    )
})


app.listen(process.env.APP_PORT, '0.0.0.0', () => {
    console.log(`App listening on port ${process.env.APP_PORT}`)
})
