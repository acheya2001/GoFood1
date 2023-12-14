const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')
const { error } = require('console')

router.post('/orderData', async (req, res)=>{
    let data = req.body.Order_data
    await data.splice(0, 0, {Order_date: req.body.Order_date})
    // if email not existing in db then create : esle : inserMany5°
    let eId = await Order.findOne({'email':req.body.email})
    console.log(eId)
    if (eId == null){
        try {
            await Order.create({
                email:req.body.email, 
                order_data:[data]
            }).then(() => {
                res.json({ success: true})

            })

            
        }catch (error){
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }

    else {
        try{
            await Order.findOneAndUpdate({email: req.body.email},
                {$push: { order_data: data} }).then(() => {
                    res.json({ success:true })
                })

                
        }catch (error) {
            res.send("Server Eror", error.message)
        }
    }
})
router.post('/myorderData', async(req, res)=>{
    try{
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})

    }catch(error){
        res.send("server Error",error.message)

    }
})

module.exports = router;