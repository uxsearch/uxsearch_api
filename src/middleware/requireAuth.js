import { verify } from 'api/util/jwt'

const requireAuth = (req, res, next) => {
  const user = verify(req.headers.authorization, process.env.SECRET_KEY)
  req.user = user
  if (!req.user) {
    return res.status(401).send({
      error: {
        type: 'Unauthorization',
        message: 'Token is not provide or invalid'
      }
    })
  }
  next()
}

export default requireAuth