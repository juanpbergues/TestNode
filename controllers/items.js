const express = require('express')

const api = express.Router()
const service = require('../services/items')
const usuario = require('../auth/auth')

// Endpoint /api/items?q=:query
api.get('/',
    (req, res) => {
        let headers = req.headers
        let qParam = req.query.q
        if (headers.name === usuario.firm.name && headers.lastname === usuario.firm.lastname) {
            service.getItemsByQueryParams(qParam).then((response) => {
                res.status(200).send(response.data)
            })
        } else {
            res.status(401).send('UNAUTHORIZED')
        }
    }
)

// Endpoint /api/items/:id
api.get('/:id',
    (req, res) => {
        let headers = req.headers
        let idParam = req.params.id
        if (headers.name === usuario.firm.name && headers.lastname === usuario.firm.lastname) {
            service.getItemDetailAndDescription(idParam).then((response) => {
                res.status(200).send(response.data)
            })
        }
        else {
            res.status(401).send('UNAUTHORIZED')
        }
    }
)

module.exports = api