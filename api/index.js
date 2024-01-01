const express = require("express")
const pool = require("./db")
const app = express()

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.get("/api", async (req, res) => {
    try {
        const allData = await pool.query("SELECT * FROM users")
        res.json(allData.rows)
    } catch (err) {
        console.error(err.message)
        res.json({
            message: err.message
        })
    }
})