require("dotenv").config({
    path: "../.env"
})

const express = require("express")
const pool = require("./db")
const { OAuth2Client } = require("google-auth-library")
const jwt = require("jsonwebtoken")

const auth = require("./middleware/auth")
const { createNewUser } = require("./controllers/auth_controllers")

const app = express()
// app.use(auth)
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const PORT = process.env.PORT || 8080

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.get("/api/users", auth, async (req, res) => {
    try {
        const allData = await pool.query("SELECT * FROM users")
        res.json(allData.rows)
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.post("/api/users", auth, async (req, res) => {
    const { first_name, last_name, email } = req.body
    res.json(createNewUser(first_name, last_name, email))
})

app.get("/api/user/:uid", auth, async (req, res) => {
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

app.get("/api/listings", auth, async (req, res) => {
    const query = req.query
    
    try {
        let allData;

        if (Object.keys(query).includes("limit")) {
            allData = await pool.query(
                "SELECT listings.*, users.first_name, users.last_name FROM listings \
                INNER JOIN users ON listings.uid=users.uid LIMIT $1",
                [query.limit]
            ) 
        } else {
            allData = await pool.query("SELECT * FROM listings")
        }

        res.json(allData.rows)
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.post("/api/listings", auth, async (req, res) => {
    try {
        const { title, description, uid } = req.body;
        const newListing = await pool.query(
            `INSERT INTO listings (title, description, uid, created_at, active) \
                VALUES ($1, $2, (SELECT uid FROM users WHERE uid=$3), to_timestamp($4), $5)`,
            [title, description, uid, Date.now() / 1000.0, true]
        )
        res.json(newListing)
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.get("/api/listing/:id", auth, async (req, res) => {
    try {
        const { id } = req.params
        const listing = await pool.query(
            "SELECT listings.*, users.first_name, users.last_name FROM listings \
                INNER JOIN users ON listings.uid=users.uid WHERE id=$1", 
            [id]
        )
        res.json(listing.rows[0])
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.post("/api/auth", async (req, res) => {
    const { authToken } = req.body

    const ticket = await client.verifyIdToken({
        idToken: authToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })

    const { name, email, picture } = ticket.getPayload();

    // TODO: use auth middleware here, delete implementation below

    if (email.endsWith("@berkeley.edu")) {
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        )

        if (!existingUser.rows.length) {
            createNewUser(name, null, email)
        } else {
            const uid = existingUser.rows[0].uid

            const payload = {
                uid: uid
            }

            jwt.sign(payload, process.env.SECRET, {
                expiresIn: "7d"
            }, (err, token) => {
                if (err) {
                    return res.status(401).json({
                        error: "Token generation failed"
                    })
                } else {
                    res.json({
                        name: name,
                        email: email,
                        berkeley: email.endsWith("@berkeley.edu"),
                        uid: uid,
                        token: token
                    })
                }
            })
        }
    } else {
        res.json({
            berkeley: email.endsWith("@berkeley.edu")
        })
    }
})

app.get("/api/auth/callback", async (req, res) => {
    res.send("Successfully signed in")
})