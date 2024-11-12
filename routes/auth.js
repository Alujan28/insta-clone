const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send("hello")
})

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"please add all the field"})
    }
    res.json({message:"sucessfuly posted"})
})

module.exports = router