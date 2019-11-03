import firebase from 'api/firebase-config'
import { auth } from 'api/firebasehelper'
import { getUxerById } from 'api/modules/uxers/model'
import { createToken } from 'api/util/jwt'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  signIn: async (req, res) => {
    const { email, password } = req.body
    const login = await auth.signInWithEmailAndPassword(email, password)
    const acccessToken = login.user.ma
    if (!acccessToken) {
      res.status(400).send({ status: statusCallback.ERROR })
    }
    const { data } = await getUxerById(login.user.uid)
    let user = {
      uid: login.user.uid,
      data: data
    }

    const token = createToken(user, process.env.SECRET_KEY)
    res.setHeader('x-token', token)
    user = {
      uid: login.user.uid,
      data: data,
      token: token
    }
    res.send(user)
  },
  signOut: async (req, res) => {
    const token = req.headers['authorization']
    if (token) {
      res.setHeader('x-token', null)
      await auth.signOut()
    }
    res.send({ status: statusCallback.SUCCESS })
  }
}