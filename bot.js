const axios = require('axios');
const { load } = require('cheerio');
const Slimbot = require('slimbot');

const bot = new Slimbot(
  '6394316552:AAF9epm1nJxMwkrriJJQ-X30B7Ejs0pzV6o',
);
const groupChatId = '-986446582';

async function sendPeriodicMessage() {
  console.log('Job Started');
  try {
    const html = await axios.get(
      'https://service2.diplo.de/rktermin/extern/appointment_showForm.do?locationCode=isla&realmId=108&categoryId=1600',
    );
    const $ = load(html.data);
    $(`#appointment_newAppointmentForm_fields_3__content`)
      .children('option')
      .each((_, elem) => {
        if (elem.attribs['value'].toString().includes('2024')) {
          const option = elem.attribs['value'].split('/');
          bot.sendMessage(
            groupChatId,
            '----------------------------------------------------',
          );
          bot.sendMessage(
            groupChatId,
            `Appointment found Keyword:2024 ${option[1]}`,
          );
          bot.sendMessage(
            groupChatId,
            '----------------------------------------------------',
          );
        }
      });
    bot.sendMessage(
      groupChatId,
      `[Info] - ${JSON.stringify(
        new Date(),
      )} - Successfully scrapped!`,
    );
  } catch (error) {
    bot.sendMessage(
      groupChatId,
      `[Error] - ${JSON.stringify(error)}`,
    );
  }
  console.log('Job Ended');
}

module.exports = { sendPeriodicMessage }