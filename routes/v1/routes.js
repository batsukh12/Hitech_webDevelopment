const express = require("express");
const router = express.Router();
const {sendVerificationOPTEmail} = require ("../../controller/controller");

// new req shideh 
router.post("/" , async (req, res )=>{
    try {
        const {email } = req.body;
        if (!email ) throw Error ("Email is required!!!!");

        const createdEmailVerificationOTP = await 
        sendVerificationOPTEmail(email);
        res.status (200).json(createdEmailVerificationOTP);

    } catch(error){
        res.status(400).send(error.message);
    }
});
module.exports=router;
