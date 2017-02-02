const colors = require('colors');
const got = require('got');
const logo = require('burgerjs-logo');

if (!global.Intl) {
    global.Intl = require('intl');
}

const IntlRelativeFormat = require('intl-relativeformat');
const rf = new IntlRelativeFormat('en');

got('https://api.meetup.com/burgerjs/events')
    .then(res => JSON.parse(res.body)[0])
    .then(event => {
        const missingTime = rf.format(new Date(event.time + event.utc_offset));
        const message = `\nThe next burger.js is ${missingTime}`;

        logo.print();

        setTimeout(() => {
            // eslint-disable-next-line no-console
            console.log(colors.yellow.bold(message));

            // eslint-disable-next-line no-console
            console.log(`More info: ${event.link}\n`);
        }, 100);
    })
    .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error.response.body);
    });
