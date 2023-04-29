const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const data = require("../data");
const users = data.users;
const events = data.events;

router.get('/login', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
        res.redirect("/");
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
        res.redirect("/");
    }
    else
    {
        res.render('app/signup',{signup: true});
    }
});

router.post('/login', async(req,res) => 
{
});

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
        res.redirect("/");
    }
    else
    {
        res.render('app/profile',{profile: true});
    }
});


router.get('/flashcards', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
        res.redirect("/");
        //res.render('app/flashcards',{flashcards: true});
    }
    else
    {
        res.render('app/flashcards',{flashcards: true});
        //res.redirect("/");
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