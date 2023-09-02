const cors = require('cors');
const express = require('express');
const bot = require('./bot');
const cron = require('node-cron');

const app = express();
app.use(cors());

cron.schedule('*/1 * * * *', bot.sendPeriodicMessage);

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo! bot is live')
})

app.listen(3000, () =>
    console.log('Application listening.....'),
);
