const User = require("../models/user")
const sendVerificationOPTEmail = async  () => {

    try {
        // check herwee acc exists
       // const user = await User.findById({userId});
        const existingUser = await  User.findOne({email});
         if     (!existingUser){
             throw Error("buruu email bn");
         }
         const otpDetails ={
            email ,
            subjuct : "Email verification",
            message : "verify  youre email  with code below",   
            duration : 20,
            
         };
         const createdOTP =  await sendOPT(optdetails);
         return createdOTP;

    }catch(error){
        throw error;
    }

};
 module.exports = {sendVerificationOPTEmail};