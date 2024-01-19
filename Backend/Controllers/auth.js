const Router = require('express').Router();

const passport = require('passport');

const CLIENT_URL = "http://localhost:3000";

Router.get("/login/success", (req,res) => {
    if(req.user) {
        res.status(200).json({
            success:true, 
            message: "Success",
            user: req.user
        })
    }
});

Router.get("/logout", (req,res) => {
    req.logOut();
    res.redirect(CLIENT_URL);
        
}
);

Router.get("/login/failed", (req,res) => {
        res.status(401).json({
            success : false, 
            message: "UnSuccessfull"
        });
    }
);

Router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));
 
  Router.get('/google/callback', 
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed' }),

     );

module.exports = Router;