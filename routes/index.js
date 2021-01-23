const express = require('express')
const router = express.Router()
const Article = require('../models/article')
router.get('/', async (req,res,next)=>{
  var articles = await Article.find().sort({createdAt:'desc'})
  res.render('index',{articles:articles})
})

module.exports=router
