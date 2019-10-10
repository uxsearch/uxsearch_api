import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'

import router from 'api/routers'

const port = parseInt(process.env.PORT, 10) || 3000

var app = express();
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', '*')
//   next()
// });
app.use(cors())

app.get('/', (req, res) => {
  res.send('#UX SEARCH API is RUNNING !')
})

var upload = multer()
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api',upload.fields([{ name: 'file'}]), router)

global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.listen(port, function () {
  console.log('Ready on http://localhost:', port)
})
// app.use(bodyParser.urlencoded({ extended: false }))

export default app