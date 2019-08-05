import express from 'express'
import bodyParser from 'body-parser'

import router from 'api/routers'

const port = parseInt(process.env.PORT, 10) || 3000

var app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
});

app.listen(port, function () {
  console.log('Ready on http://localhost:', port)
})

app.get('/', (req, res) => {
  res.send('#UX SEARCH API is RUNNING !')
})

app.use(bodyParser.json())
app.use('/api', router)

app.use(bodyParser.urlencoded({ extended: false }))

export default app