async function createNewUser(first_name, last_name, email) {
    try {
        const newUser = await pool.query(
            `INSERT INTO users (first_name, last_name, email, created_at) VALUES ($1, $2, $3, to_timestamp($4))`,
            [first_name, last_name, email, Date.now()]
        )
        return newUser
    } catch (err) {
        return {
            message: err.message
        }
    }
}

module.exports = createNewUser