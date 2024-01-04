const jwt = require("jsonwebtoken")
const pool = require("../db")

const auth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({
            error: "Authorization required"
        })
    }

    const token = authorization.split(" ")[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.uid = await pool.query(
            "SELECT uid FROM users WHERE _id='$1'",
            [_id]
        )
    } catch (err) {
        console.log(err)
        res.status(401).json({
            error: "Token validation failed"
        })
    }

}

module.exports = auth