const got = require('got')
if (!global.Intl) {
  global.Intl = require('intl')
}
const IntlRelativeFormat = require('intl-relativeformat')
const rf = new IntlRelativeFormat('en')
got('https://api.meetup.com/burgerjs/events')
    .then(r => JSON.parse(r.body)[0])
    .then(r => {
      const nextIn = rf.format(new Date(r.time + r.utc_offset))
      console.log(`The next BurgerJS is ${nextIn}`)
      console.log(r.link)
    })
    .catch(error => {
        console.log(error.response.body)
    })
