const Group= require('../models/Groups')
const Link = require('../models/Link');
const User = require('../models/User');

module.exports = {
    getIndex: (req, res) => {
      res.render("index.ejs");
    },
    getDashboard: async (req,res) =>{
      try {
        const user = req.user
        const group = await Group.find({user:user._id}).lean()
        const links = await Link.find().sort({createdAt:'asc'}).lean();
        res.render('dashboard.ejs', {group:group, links:links, user:req.user })
      } catch (err) {
        console.log(err)
        res.render('error/404')
      }
      
    },
    getYggdrasil: async (req,res) =>{
      try {
        console.log(req.params.id)
        const user= await User.findById(req.params.id)
        const group = await Group.find({user:req.params.id}).lean()
        const links = await Link.find().sort({createdAt:'asc'}).lean()
        res.render('yggdrasil.ejs',{group:group, links:links, user:user})
      } catch (err) {
        console.log(err)
      }
    }
  };
  