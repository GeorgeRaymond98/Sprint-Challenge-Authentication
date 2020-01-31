const express = require('express');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret');
const bc = require('bcryptjs')

const Jokes = require('../jokes/jokes-model');


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bc .hashSync(user.password, 10)
  user.password = hash;

  Jokes.insert(user)
  .then(saved => {
    res.status(201).json(saved)
  })
  .catch( err => {
    console.log(err)
    res.status(500).json({message: 'Who are you. Could not register'})
  })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  
  Jokes.getBy({ username })
  .first()
  .then(user => {
    if(user && bc.compareSync(password, user.password)) {

        const token = signToken(user);
        
        res.status(200).json({ token })
    } else {
        res.status(401).json({message: 'Password or user name is wrong:'})
    }
  })
  .catch( err => {
    console.log(err)
    res.status(500).json({message: 'Cound not log in', err: err.message })
  })
});


function signToken(user) {
  const payload = {
      userId: user.id,
      username: user.username
  }
  const options = {
      expiresIn: '1d'
  }
  return jwt.sign(payload, jwtSecret, options)
}


module.exports = router;
