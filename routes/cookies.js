const express = require('express');
const router = express.Router();
const Cookie = require('../models/cookie');

// All cookies route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
 try {
    const cookies = await Cookie.find(searchOptions)
    res.render('cookies/index', {
       cookies: cookies,
       searchOptions: req.query
    })
 } catch {
   res.redirect('/')
 }
});

// New cookie route
router.get('/new', (req, res) => {
  res.render('cookies/new', { cookie: new Cookie() });
});

// Create cookie route
router.post('/', async (req, res) => {

  const cookie = new Cookie({
    name: req.body.name
  })

  try {
    const newCookie = await cookie.save()
    res.redirect('cookies')
  } catch {
    res.render('cookies/new', {
      cookie: cookie,
      errorMessage: 'Error creating Cookie'
    })
  }
});

module.exports = router;