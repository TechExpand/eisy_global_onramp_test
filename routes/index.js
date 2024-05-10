const { Router } = require('express');

const routes = Router();

// index page
routes.get('/', function (req, res) {
    res.render('pages/index');
});



// webhook request
routes.post('/api/webhook', function (req, res) {
    console.log(req.body)
    res.send('Ok');
});


module.exports = routes;