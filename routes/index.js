const { Router } = require('express');

const routes = Router();

// index page
routes.get('/', function (req, res) {
    res.render('pages/index');
});



// webhook request
routes.post('/api/webhook', function (req, res) {
    const data = req.body;  
    console.log(`Received data: ${JSON.stringify(data)}`);
    res.status(200).json({ status: 'success' });
});


// // webhook request
// routes.get('/api', function (req, res) {
//     res.send('Ok');
// });


module.exports = routes;