var router = require('express').Router();

router.get('/', function(req, res) {
  res.send('Index Page');
});

router.get('/about', function(req, res) {
  res.send('About Page');
});

router.post('/testApi', function (req, res) {
  console.log("Request ", req.body.data);
  res.send('OKAY')
});

module.exports = router;