const User = require('../Models/User')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

JWT_KEY=process.env.JWT_KEY

function authController() {
    return {
        // registration
        register: async (req, res) => {
            
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const hash = await bcrypt.hashSync(req.body.password, 10);

            let user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash

            })

            
            

            User.create(user, (err, doc) => {
                if(err) {
                    if(err.code === 11000) {
                    
                        return res.status(400).json({"error":"User already exist"})
                    
                    } else {

                        return res.status(500).json({"error":"Internal server error"})
                    }
                } else {
                    return res.status(200).json(doc)
                }

            })

            


        },

        // login and authentication
        login: async (req, res) => {

            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let user = await User.findOne({"email": req.body.email})

            if (!user) {
                return res.status(404).json('Invalid username or password')
            }

            const result =  bcrypt.compareSync(req.body.password, user.password) 
            
            const payload = {
                id:user.id    
            }

            if (result) {
                // console.log("authenticated")

                let token = jwt.sign(payload, JWT_KEY)

                res.status(200).json({"token":token})



            } else {
                res.status(404).json({"error":"Invalid username or password"})
            }
        },
    }
    
}

module.exports = authController