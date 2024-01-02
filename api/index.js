const express = require("express")
const pool = require("./db")
const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.get("/api/users", async (req, res) => {
    try {
        const allData = await pool.query("SELECT * FROM users")
        res.json(allData.rows)
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.post("/api/users", async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        const newUser = await pool.query(
            `INSERT INTO users (first_name, last_name, email, created_at) VALUES ($1, $2, $3, to_timestamp($4))`,
            [first_name, last_name, email, Date.now()]
        )
        res.json(newUser)
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.get("/api/user/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const user = await pool.query("SELECT * FROM users WHERE uid=$1", [uid])
        res.json(user.rows[0])
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.get("/api/listings", async (req, res) => {
    try {
        const allData = await pool.query("SELECT * FROM listings")
        res.json(allData.rows)
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.post("/api/listings", async (req, res) => {
    try {
        const { title, description, uid } = req.body;
        const newListing = await pool.query(
            `INSERT INTO listings (title, description, uid, created_at, active) \
                VALUES ($1, $2, (SELECT uid FROM users WHERE uid=$3), to_timestamp($4), $5)`,
            [title, description, uid, Date.now(), true]
        )
        res.json(newListing)
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})