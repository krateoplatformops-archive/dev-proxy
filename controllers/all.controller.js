const express = require('express')
const router = express.Router()
const axios = require('axios')

router.all('/*', async (req, res, next) => {
  try {
    let url = null

    const svc = req.baseUrl.split('/')[1]
    const params = req.baseUrl.split('/').slice(2).join('/')

    if (req.baseUrl === '/auth/user') {
      // return res.status(403).json({ message: 'unauthenticated' })
      return res.status(200).json({
        id: 'krateo',
        displayName: 'krateo',
        username: 'krateo',
        provider: 'basic',
        email: 'krateo@krateo.io'
      })
    }

    switch (svc) {
      case 'package':
        url = `http://localhost:8091`
        break
      case 'auth':
        // url = 'https://api.krateo.site/auth/'
        url = 'http://localhost:8093/'
        break
      case 'deployment':
        url = 'http://localhost:8085/'
        break
      case 'pipeline':
        url = 'http://localhost:8090/'
        break
      case 'codequality':
        // url = 'http://localhost:8085/'
        break
      case 'doc':
        url = 'http://localhost:8089/'
        break
      case 'capi':
        url = 'http://localhost:8091/'
        break
      case 'notification':
        url = 'http://localhost:4000/'
        break
      case 'secret':
        url = 'http://localhost:8095/'
        break
      case 'template':
        // url = 'https://api.krateo.site/template/'
        url = 'http://localhost:8086/'
        break
      case 'component':
        url = 'http://localhost:8092/'
        break
      case 'event':
        url = 'https://api.krateo.site/event/'
        break
      default:
        url = null
    }

    if (!url) {
      return res.status(505).send()
    }

    url += params

    url += req.query
      ? '?' +
        Object.keys(req.query)
          .map((key) => key + '=' + req.query[key])
          .join('&')
      : ''

    await axios({
      method: req.method,
      headers: req.headers,
      url: url,
      data: req.body
    })
      .then((response) => {
        res.status(response.status).json(response.data)
      })
      .catch((error) => {
        res
          .status(error.response.status || 500)
          .json({ message: error.response?.data?.message || error.message })
      })
  } catch (err) {
    next(err)
  }
})

module.exports = router
