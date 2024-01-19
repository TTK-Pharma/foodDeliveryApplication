const User = require('../DataBase/user');

// registration part
exports.Sighnup = (req, res) => {
    const { email, password, name } = req.body;

    const userObj = new User({
        name,
        email,
        password
        
    });

    userObj.save()
        .then(response => {
            res.status(200).json({
                message: "User Details Saved Successfully",
                usersDetails: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

// Login Part
exports.login = (req, res) => {
    const { email, password } = req.body;

    User.find({
        email,
        password
    })

    .then(response => {
        if(response.length > 0){    
            res.status(200).json({
                message: "User Details are Validated",
                isAuthenticated: true,
                user: response
            })
        
        }else{
            res.status(200).json({
                message: "User Details are not Validated",
                isAuthenticated: false,
                user: response
            })
        } 
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
}