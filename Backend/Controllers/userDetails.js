const userDdb  = require('../DataBase/userDdb');

exports.getUsetDetails = (req, res) => {
  const { address, phoneno, name } = req.body;

  const userObjec = new userDdb({
      name,
      address,
      mobile
      
  });

  userObjec.save()
      .then(response => {
          res.status(200).json({
              message: "User Details Saved Successfully",
              usersDetailss: response
          })
      })
      .catch(err => {
          res.status(500).json({ error: err })
      })
  }