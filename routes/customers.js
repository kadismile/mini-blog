var router = require('express').Router();

router.get('', (req, res) => {
  const customers = [
    {id: 1, firstName: 'Ibrahim', lastname: 'Abubakar'},
    {id: 2, firstName: 'Toyosi', lastname: 'omodele'},
    {id: 3, firstName: 'Hello', lastname: 'Bae'},
  ];

  res.json(customers)
});

module.exports = router;