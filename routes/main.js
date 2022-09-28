const express = require('express')
const router = express.Router()
const passport = require('passport')

// const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const groupController = require('../controllers/groups')
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Main Routes 
router.get('/',homeController.getIndex);
router.get('/profile/:id', homeController.getYggdrasil)
router.get('/dashboard', ensureAuth, homeController.getDashboard )
router.get('/groups', ensureAuth, groupController.getCreateGroup)
router.post('/createGroup', groupController.createGroup)
router.get('/getCreateLinkPage/:id', ensureAuth ,groupController.getCreateLinkPage)
router.post('/createLink/:id', ensureAuth,groupController.createLink)
router.delete('/deleteGroup/:id', ensureAuth, groupController.deleteGroup)
router.delete('/deleteLink/:id', ensureAuth, groupController.deleteLink)
router.get('/allGroups/:id', groupController.allGroups)
module.exports= router


