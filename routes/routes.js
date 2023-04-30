const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const data = require("../data");
const users = data.users;
const words= data.words;
const validation=require('../validation');

router.get('/login', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
      res.render('app/home',{home: true, authenticated:true});
    }
    else
    {
        res.render('app/login',{login: true});
    }
});

router.get('/signup', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
      res.render('app/home',{home: true, authenticated:true});
    }
    else
    {
        res.render('app/signup',{signup: true});
    }
});

router.post('/signup', async(req,res) =>
{
  try
  {
      req.body.username=validation.validName(req.body.username);
      var password=req.body.password;
      password=validation.validPassword(password);
      req.body.email=validation.validateEmail(req.body.email);
      const newUser=await users.createUser(req.body.username,req.body.email,req.body.password);
      if(newUser){
        return res.render('app/login',{login:true});
      }else{
        return res.status(500).render('app/signup',{signup:true, error: "Error: Internal Server Error"});
      }
  }catch(e)
  {
    res.status(400).render('app/signup',{signup: true, error: e});
  }
});

router.post('/login', async(req,res) =>{
  try
  {
      req.body.username=validation.validName(req.body.username);
      var password=req.body.password;
      password=validation.validPassword(password);
      const checkUser=await users.checkUser(req.body.username,password);
      if(!checkUser.authenticated)
      {
          res.status(400).render('app/login',{login: true, error: "Error: Wrong Username or Password"});
      }
      else
      {
          req.session.views=1;
          req.session.store=req.body.username;
          res.render('app/home',{home: true, authenticated: true});
      }
  }catch(e)
  {
    res.status(400).render('app/login',{login: true, error: e});
  }
})

router.get('/', async(req,res) => 
{
  if(req.session.views!=undefined)
    {
      res.render('app/home',{home: true, autenticated: true});
    }
    else
    {
      res.render('app/home',{home: true, autenticated: false});
    }
});

router.get('/profile', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
        res.render('app/profile',{profile: true});
    }
    else
    {
      res.render('app/home',{home: true, autenticated: false});
    }
});


router.get('/flashcards', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
        let allWords=await words.getAllWords();
        res.render('app/flashcards',{flashcards: true, words: allWords});
    }
    else
    {
      res.render('app/home',{home: true, autenticated: false});
    }
});

router.get('/game', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
        res.redirect("/");
        //res.render('app/flashcards',{flashcards: true});
    }
    else
    {
        res.render('app/game',{game: true});
        //res.redirect("/");
    }
});

/*
router
  .route('/') //home
  .get(async (req, res) => {
    //code here for GET
    try{
      //display html page with links and description
    }
    catch (e){
      res.status(400);
    }
  })

router
  .route('/profile')
  .get(async (req, res) => {
    //code here for GET
    //the profile page
    try{
      if (req.session.user){
        const userData = await users.getUserData(req.session.user);
        //render page with data
      } else{
        //either show error or load main '/' page
      }
    }
    catch (e){
      res.status(400);
    }
  })

router
  .route('/login') 
  .get(async (req, res) => {
    //code here for GET
    try{
      //display html page with links and description

    }
    catch (e){
      res.status(400);
    }
  })
  .post(async (req, res) => {

  })

router
  .route('/signup') 
  .get(async (req, res) => {
    //code here for GET
    try{
      //display html page with links and description
    }
    catch (e){
      res.status(400);
    }
  })
  .post(async (req, res) => {

  })
*/


module.exports = router;