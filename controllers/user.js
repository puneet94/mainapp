'use strict';


var jwt = require('jsonwebtoken');


function verifyOTP(req, res) {
    console.log("verify otp");
    console.log(req.body.contactDetails);
    var contactDetails = req.body.contactDetails;

    // OTP.findById(req.body.contactDetails._id)
   

    var d = new Date();
    d.setMinutes(d.getMinutes() - 5);
    console.log(d);

    var d2 = new Date();
    
    OTP.findOne({
            /*created_at: {
                $gte: d
            },*/
            _id: req.body.contactDetails._id,
            otpNumber: req.body.contactDetails.otpNumber
        })

        .exec(function(error, result) {
            if (error) {
                console.log("error while reading");
            } else if(result) {
                console.log("found otp");
                console.log(result);
                console.log(result._id);

                User.findOne({
                    'mobilePhone': cleanPhoneNumber(req.body.contactDetails.mobilePhone, req.body.contactDetails.countryCode)
                }, function(err, user) {
                    if (error) {
                        console.log("error", e);
                    }

                    if (user) {

                        console.log("found user");
                        var token = jwt.sign({
                            data: {
                                "_id": user._id
                            }
                        }, process.env.JWT_SECRET, {
                            expiresIn: '1h'
                        });

                        res.json({
                            token: token
                        });
                    } else {
                        console.log("new user");
                        generateUserObj(contactDetails).save(function(error, user) {
                            if(error){
                                res.json({error:"error. technical error. please try again in some time",code:"501"});
                            }else{
                                var token = jwt.sign({
                                data: {
                                    "_id": user._id
                                }
                            }, process.env.JWT_SECRET, {
                                expiresIn: '1h'
                            });
                            res.json({
                                token: token
                            });    
                            }
                            
                        });
                    }

                });

            }else{
                res.json({error:"error. otp not found",code:"401"});
            }
        });
}

function loginUser(req, res) {
            res.json({
                "message": "User has been loggedin"
            });
       
}


var userController = {
    loginUser: loginUser

};
module.exports = userController;