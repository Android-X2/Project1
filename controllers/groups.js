const Group = require('../models/Groups')
const Link = require('../models/Link')
const User = require('../models/User')
const validUrl = require('valid-url')

module.exports = {
    getCreateGroup:(req,res) =>{
      res.render('groups.ejs')
    },
    getCreateLinkPage: async(req,res)=>{
      const group = await Group.findById(req.params.id);
      const link = await Link.find().sort({createdAt:'desc'}).lean()
      res.render('links.ejs',{group:group,links:link})
    },  
    createGroup: async (req,res)=>{
        try {
          await Group.create({
            title:req.body.title,
            user:req.user.id,
          })
          console.log('Group has been added')
          res.redirect('/dashboard')
        } catch (err) {
          res.render('error/500')
          console.log(err)
        }
    },
    createLink: async (req,res)=>{
      try {
        if(validUrl.isUri(req.body.link)&& req.body.title.length<23){
          await Link.create({
            title:req.body.title,
            link:req.body.link,
            group:req.params.id,
          })
        }
        res.redirect(req.get('referer'));
      } catch (err) {
        console.log(err)
        res.render('error/500')
      }
    },
    deleteGroup: async (req,res)=>{
      try{
        let group = await Group.findById({_id:req.params.id})
        let link = await Link.find({group:req.params.id})
        await Group.remove({_id:req.params.id})
        await Link.remove({group:req.params.id})
        res.redirect('/dashboard')
      }catch(err){
          console.log(err)
          res.render('error/500')
      }
    },
    deleteLink: async (req,res)=>{
      try{
        let link = await Link.find({_id:req.params.id})
        await Link.deleteOne({_id:req.params.id})
        res.redirect(req.get('referer'));
      }catch(err){
          console.log(err)
          res.render('error/500')
      }
    },
    allGroups: async (req,res) => {
      try {
        const group = await Group.find({user: req.params.id})
        const links = await Link.find().sort({createdAt:'asc'}).lean()
        res.render('allGroups.ejs', {groups:group, links:links,user:req.params.id})
      } catch (err) {
        console.log(err)
        res.render('error/404')
      }
    },
    allLinks: async (req,res)=>{
      try {
        const group = await Group.findById(req.params.id)
        const link = await Link.find({group:req.params.id}).sort({createdAt:'desc'}).lean()
        res.render('allLinks.ejs',{groups:group,links:link})
      } catch (err) {
        console.log(err)
        res.render('error/404')
      }
    }
  };
  