const colors = require('colors');
const got = require('got');
const logo = require('burgerjs-logo');

if (!global.Intl) {
    global.Intl = require('intl');
}

const IntlRelativeFormat = require('intl-relativeformat');
const rf = new IntlRelativeFormat('es-ES');

const handleError = function (error) {
    // eslint-disable-next-line no-console
    console.error(error.response.body);
};

got('https://api.meetup.com/burgerjs/events')
    .then(res => JSON.parse(res.body)[0])
    .then(event => {
        if (!event) {
            // eslint-disable-next-line no-console
            console.log('No hay una Burger.js programada :(');

            // eslint-disable-next-line no-console
            console.log(colors.yellow.bold('¿Por qué no nos mandas un tweet a @burgerjsba?'));

            return;
        }

        got(`https://api.meetup.com/burgerjs/events/${event.id}/rsvps`)
            .then(res => JSON.parse(res.body))
            .then(rsvps => rsvps.filter(rsvp => rsvp.response === 'yes'))
            .then(rsvps => {
                const missingTime = rf.format(new Date(event.time + event.utc_offset));

                logo.print();

                // eslint-disable-next-line no-console
                console.log(colors.yellow.bold(`\nEl próximo burger.js es ${missingTime}`));

                // eslint-disable-next-line no-console
                console.log(`Más info: ${event.link}\n`);

                if (rsvps.length) {
                    // eslint-disable-next-line no-console
                    console.log('Los valientes anotados por ahora son:');

                    // eslint-disable-next-line no-console
                    rsvps.map(rsvp => console.log(`${rsvp.member.name} ${rsvp.guests > 0 ? colors.green('+ ' + rsvp.guests + ' invitados') : ''}`));
                }
            })
            .catch(handleError);
    })
    .catch(handleError);
