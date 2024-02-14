
const {isNullOrEmpty} = require("../utilities/isNullOrEmpty")
// vailate all nulls for params

exports.nullISBN = params => (req, res, next) => {
    const reqParamList = Object.keys(req.params);
    const hasAllRequiredParams = params.every(param => reqParamList.includes(param));
    if (!hasAllRequiredParams) {
        return res.status(400).send(`The following parameters are all required for this route: ${params.join(", ")}`);
    }
    next();
};
// exports.nullISBN = (req, res, next)=>
// {
//     if(isNullOrEmpty(req.params.ISBN)){
//         console.log("okay");
//         return res.status(400).json({
//             status: "failed",
//             message : "The ISBN does not exist!"
//         });
//     }
//     next();
// }


exports.nullUsername = (req, res, next)=>
{
    if(!req.params.usernam === null){
        return res.status(400).json({
            status: "failed",
            message : "The Username does not exist!"
        });
    }
    next();
}

exports.nullIdorder = (req, res, next)=>
{
    if(!req.params.username === null){
        return res.status(400).json({
            status: "failed",
            message : "The order id does not exist!"
        });
    }
    next();
}