var express = require('express');
var bcrypt = require('bcrypt');
var uid2 = require('uid2');
var router = express.Router();
var userModel = require('../models/users');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', async function (req, res, next) {
  if (!req.body.login || !req.body.email || !req.body.password) {
    res.json({ result: 'blank input' });
  }
  const hash = bcrypt.hashSync(req.body.password, 10);
  var emailExists = await userModel.findOne({ email: req.body.email });
  var loginExists = await userModel.findOne({ login: req.body.login });

  if (loginExists && emailExists) {
    res.json({ result: 'login & email exists' });
    
  } else if (loginExists) {
    res.json({ result: 'login exists' })
  } else if (emailExists) {
    res.json({ result: 'email exists' });
  } else if (emailExists == null && loginExists == null) {

    var newUser = new userModel({
      login: req.body.login,
      email: req.body.email,
      password: hash,
      token: uid2(32),
      
    })
    var userSaved = await newUser.save();
    res.json({ result: 'ok', token: userSaved.token })
  }
});


router.post('/signin', async function (req, res, next) {

  
  var userExists = await userModel.findOne({ login: req.body.login });
  var password = req.body.password;
  console.log(userExists)
  if (req.body.login == '' || req.body.password == '') {
    res.json({ result: 'blank input' });
  }
  if (bcrypt.compareSync(password, userExists.password)) {
    res.json({ result: 'Yippee Kay Yay', token: userExists.token })
  }
   else {
    res.json({ result: 'Damn' })
  }
  console.log('reqbody : ', req.body)
})
module.exports = router;
