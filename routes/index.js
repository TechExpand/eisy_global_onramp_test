const { Router } = require('express');
const puppeteer = require('puppeteer');
const routes = Router();

// index page
routes.get('/', async function (req, res) {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath:
            process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
    });
    const page = await browser.newPage();
    await page.goto('https://pay.radom.com/invoice/6e45f340-6f0a-400d-b59b-668917f78c2c', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#app');
    await page.waitForSelector('button.sc-gEvEer.gtPejK');
    await page.click('button.sc-gEvEer.gtPejK');
    await page.waitForSelector('div.sc-cwHptR.gFHeKo');
    const spanContents = await page.evaluate(() => {
        const spans = document.querySelectorAll('span');
        return Array.from(spans).map(span => span.innerText);
    });


    let address = "";

    spanContents.forEach(current => {
        if (current.length > address.length) {
            address = current;
        }
    });

    console.log(address)

    await browser.close();
    res.render('pages/index', { address, invoiceId: "invoiceId" });
});

routes.get('/sell', async function (req, res) {
    res.render('pages/sell', { invoiceId: "invoiceId" });
});

// routes.get('/api/fiat', async function (req, res) {

// });






// webhook request
routes.post('/api/webhook', function (req, res) {
    const data = req.body;
    console.log(`Received data: ${JSON.parse(data)}`);
    if (data.data.status === "completed") {
        console.log(value.externalCustomerId)
        console.log("update invoice on successful")
        console.log("success...")
    } else {
        console.log("update invoice on failed")
        console.log("failed...")
    }
    res.status(200).json({ status: 'success' });
});


// // webhook request
// routes.get('/api', function (req, res) {
//     res.send('Ok');
// });


module.exports = routes;