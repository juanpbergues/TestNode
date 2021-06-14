
const axios = require('axios').default
const functions = require('../functions/functions')

// Servicio que consulta la API Mercado Libre y luego formatea la info necesaria
async function getItemsByQueryParams(query) {
    try {
        const response = await axios({
            url: `https://api.mercadolibre.com/sites/MLA/search?q=${query}`,
            method: 'get'
        })

        const formatedObject = functions.formatSearchResponse(response.data)

        await axios({
            url: `https://api.mercadolibre.com/categories/${formatedObject.categories}`,
            method: 'get'
        }).then((arrawCategories) => {
            formatedObject.categories = arrawCategories.data.path_from_root
        })

        return {
            status: 'OK',
            data: formatedObject
        }
    }
    catch (err) {
        return {
            status: 'ERROR',
            data: err
        }
    }

}

// Servicio que se conecta con la api de Mercado Libre y luego formatea la info
async function getItemDetailAndDescription(id) {
    console.log(id)
    try {
        const itemDetail = await axios({
            url: `https://api.mercadolibre.com/items/${id}`,
            method: 'get'
        })
        const categories = await axios({
            url: `https://api.mercadolibre.com/categories/${itemDetail.data.category_id}`,
            method: 'get'
        })
        const itemDescription = await axios({
            url: `https://api.mercadolibre.com/items/${id}/description`,
            method: 'get'
        })

        const formatedObject = functions.formatItemResponse(itemDetail.data, itemDescription.data, categories.data)

        return {
            status: 'OK',
            data: formatedObject
        }
    }
    catch (err) {
        return {
            status: 'ERROR',
            data: err
        }
    }

}

module.exports = { getItemsByQueryParams, getItemDetailAndDescription }