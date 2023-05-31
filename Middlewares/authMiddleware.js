const jwt = require('jsonwebtoken')

JWT_KEY=process.env.JWT_KEY || "IamtheBoss"


function IsAuthencticated(req, res, next) {

    const token = req.headers['token']

    if (token === undefined && token === null) {
        return res.status(400).json({"error":"Invalid Request"})
    }

    jwt.verify(token, JWT_KEY, function(err, decoded) {

        if(err) {            
            return res.status(401).json({"error":"Unauthorized"})
        }

        req.locals = decoded
        next()

    })
}


module.exports = IsAuthencticated