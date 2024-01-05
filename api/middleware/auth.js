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
        const { email } = jwt.decode(token)
        
        // TODO: create new user and corresponding uid

        // const existingUser = await pool.query(
        //     "SELECT uid FROM users WHERE email=$1",
        //     [email]
        // )
        // const existingUserUID = existingUser.rows[0].uid

        if (token) {
            jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({ 
                        error: "Token validation failed"
                    })
                } else {
                    req.uid = decodedToken.uid
              }
            })
        } else {
            res.status(401).json({ 
                error: "Token validation failed" 
            })
        }

        next()
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: "Token validation failed"
        })
    }

}

module.exports = auth