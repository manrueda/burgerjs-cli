const colors = require('colors');
const got = require('got');
const logo = require('burgerjs-logo');

if (!global.Intl) {
    global.Intl = require('intl');
}

const IntlRelativeFormat = require('intl-relativeformat');
const rf = new IntlRelativeFormat('es-ES');

got('https://api.meetup.com/burgerjs/events')
    .then(res => JSON.parse(res.body)[0])
    .then(event => {
        const missingTime = rf.format(new Date(event.time + event.utc_offset));
        const message = `\nEl próximo burger.js es ${missingTime}`;

        logo.print();

        // eslint-disable-next-line no-console
        console.log(colors.yellow.bold(message));

        // eslint-disable-next-line no-console
        console.log(`Más info: ${event.link}\n`);
    })
    .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error.response.body);
    });
