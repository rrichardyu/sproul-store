const express = require("express")
const pool = require("./db")
const app = express()

const PORT = process.env.PORT || 8080

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