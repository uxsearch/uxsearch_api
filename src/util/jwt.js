import jwt from 'jsonwebtoken'

export const createToken = (user, secret) => {
  const token = jwt.sign(user , secret, { expiresIn: 24 * 60 * 60 }) //1 day
  return token
}

export const verify = (token, secret) => {
  const decode = jwt.verify(token, secret)
  return decode
}