const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token')
    try {
        if (!token) {
            res.status(401).send({ error: "Please Authenticate using a valid token1" })
        } else {
            const data = jwt.verify(token,"mySectretString")
            req.user = data.user
            next();
        }
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate using a valid token2" })
    }
    
}
module.exports = fetchUser;