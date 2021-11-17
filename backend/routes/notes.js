const express = require('express');
const router = express.Router()

router.get('/',(req,res)=>{
    res.json({
      Title : "My Notes",
      description:"kfjdf fdjfdnkjfd jdnfj"
    })
})
module.exports = router