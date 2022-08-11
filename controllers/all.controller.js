const express = require('express')
const router = express.Router()
const axios = require('axios')

router.all('/*', async (req, res, next) => {
  try {
    let url = null

    const svc = req.baseUrl.split('/')[1]
    const params = req.baseUrl.split('/').slice(2).join('/')

    switch (svc) {
      case 'auth':
        url = 'http://localhost:8093/'
        break
      case 'deployment':
        url = 'http://localhost:8085/'
        break
      case 'pipeline':
        // url = 'http://localhost:8085/'
        break
      case 'codequality':
        // url = 'http://localhost:8085/'
        break
      case 'doc':
        // url = 'http://localhost:8085/'
        break
      case 'capi':
        url = 'http://localhost:8091/'
        break
      default:
        url = null
    }

    if (!url) {
      return res.status(500).send()
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
        res.status(500).json(error)
      })
  } catch (err) {
    next(err)
  }
})

module.exports = router
