const express = require('express')
const passport = require('passport')
const User = require('../models/User')
const router=express.Router()

// @desc Auth with Google
// @Route Get /auth/google
router.get('/google', passport.authenticate('google', { scope:['profile','email'] }));

// @desc Google auth callback
// @Route Get /auth/google/callback
router.get('/google/callback', 
    passport.authenticate('google',{failureRedirect: '/'}), (req,res) => {
    res.redirect('/dashboard')
    }
)
//@desec logout user
// @route /auth/logout
router.get('/logout',(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
    })
    res.redirect('/')
})


module.exports = router