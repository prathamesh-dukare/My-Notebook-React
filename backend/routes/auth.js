const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let obj = {
        username: "Prathamesh"
    }
    res.json(obj)
})
module.exports = router