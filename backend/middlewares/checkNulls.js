const {isNullOrEmpty} = require("../utilities/isNullOrEmpty")
module.exports = (req, res, next)=>
{
    // if request body ---> null
    // then check every property in controller
    if(isNullOrEmpty(req.body)){
        return res.status(400).json({
            status: "failed",
            message : "Empty body!"
        });
    }
    next();
}