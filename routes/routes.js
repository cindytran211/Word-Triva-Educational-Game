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
      req.body.name=validation.validUserName(req.body.name);
      var password=req.body.password;
      password=validation.validPassword(password);
      req.body.email=validation.validateEmail(req.body.email);
      const newUser=await users.createUser(req.body.name,req.body.username,req.body.email,password);
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
          req.session.password=req.body.password;
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
      res.render('app/home',{home: true, authenticated: true});
    }
    else
    {
      res.render('app/home',{home: true, authenticated: false});
    }
});

router.get('/profile', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
      try{
        let theUser=await users.getUser(req.session.store);
        let holder={
        name: theUser.name, 
        email: theUser.email,
        username: req.session.store,
        password: req.session.password
      }
      res.render('app/profile',{profile: true, info: holder});
      }catch(e){
        res.status(400).render('app/profile',{profile: true, error: e});
      }
    }
    else
    {
      res.render('app/home',{home: true, authenticated: false});
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
      res.render('app/home',{home: true, authenticated: false});
    }
});

router.get('/game', async(req,res) =>
{
    if(req.session.views!=undefined)
    {
      let gameWord=await words.getRandomWord();
      let otherWords=[];
      while(otherWords.length<3){
        let newWord=await words.getRandomWord();
        if(newWord.word !== gameWord.word){
          if(!otherWords.includes(newWord)){
            otherWords.push(newWord)
          }
        }
      }
      otherWords.push(gameWord);
      //shuffle array
      for(let i=otherWords.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        let temp=otherWords[i];
        otherWords[i]=otherWords[j];
        otherWords[j]=temp;
      }
      const holder={
        gameWord: gameWord,
        otherWords: otherWords
      }
      req.session.gameWord=gameWord.word;
      res.render('app/game',{game: true, words:holder});
    }
    else
    {
      res.render('app/home',{home: true, authenticated: false});
    }
});

router.post('/game', async(req,res) =>{
    if(req.body.options===req.session.gameWord){
      res.render('app/game', {game: true, result: "Correct", correct: true});
    }else{
      res.render('app/game', {game: true, result: "Incorrect", correct: false});
    }
    
});

router.get('/logout', async(req,res) =>{
  if(req.session.views!=undefined)
  {
    req.session.views=undefined;
    res.clearCookie('AuthCookie');
    res.render('app/home',{home: true, authenticated: false});
  }
  else
  {
    res.render('app/home',{home: true, authenticated: false});
  }
});

module.exports=router;