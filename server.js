const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.static('public'))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
  if (req.cookies['cookieyes-consent']) {
    const set = 'set'
    const str = req.cookies['cookieyes-consent']
    const arr = str.split(',')
    const result = {}

    for (const item of arr) {
      const [key, value] = item.split(':')
      result[key] = value
    }

    // if user has rejected all cookies
    if (
      ![
        'functional',
        'analytics',
        'performance',
        'advertisement',
        'other',
      ].some((key) => filterBoolean(result[key]))
    ) {
      res.send(
        'The user has opted out of cookies, set strictly necessary cookies only'
      )
    } else {
      // Checking for user preferences
      // checking whether functional cookies are accepted
      if (filterBoolean(result['functional'])) {
        res.send('The user has accepted functional cookies')
      } else {
        res.send('The user has NOT accepted functional cookies')
      }

      // checking whether analytics cookies are accepted
      if (filterBoolean(result['analytics'])) {
        res.send('The user has accepted analytics cookies')
      } else {
        res.send('The user has NOT accepted analytics cookies')
      }

      // checking whether performance cookies are accepted
      if (filterBoolean(result['performance'])) {
        res.send('The user has accepted performance cookies')
      } else {
        res.send('The user has NOT accepted performance cookies')
      }

      // checking whether advertisement cookies are accepted
      if (filterBoolean(result['advertisement'])) {
        res.send('The user has accepted advertisement cookies')
      } else {
        res.send('The user has NOT accepted advertisement cookies')
      }

      // checking whether other cookies are accepted
      if (filterBoolean(result['other'])) {
        res.send('The user has accepted other cookies')
      } else {
        res.send('The user has NOT accepted other cookies')
      }
    }
  } else {
    res.send('Cookies are not set')
  }
})

function filterBoolean(str) {
  return str === 'true'
}

app.listen(3001, () => console.log('Server running on port 3001'))
