import express from 'express'
import router from 'api/routers'

const port = parseInt(process.env.PORT, 10) || 3000

var app = express();

app.listen(port, function () {
  console.log('Ready on http://localhost:', port)
})

app.use('api', router)
app.use(express.json())

export default app