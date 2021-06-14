const usuario = require('../auth/auth')

// Funcion para encontrar la categoria mas repetida y para empezar a formatear el objeto a devolver de Search
function formatSearchResponse(response) {
    const categoriesToSave = []
    const itemsToSave = []

    response.results.forEach((product, index) => {
        if (index < 4) {
            const priceToSave = (product.price.toString()).split(".")
            itemsToSave.push({
                id: product.id,
                title: product.title,
                price: {
                    currency: product.currency_id,
                    amount: parseInt(priceToSave[0], 10),  // devuelvo la parte entera
                    decimals: parseInt(priceToSave[1], 10) // devuelvo la parte decimal
                },
                picture: product.thumbnail,
                condition: product.condition,
                free_shipping: product.shipping.free_shipping,
                location: product.address.state_name
            })
        }
        if (!(categoriesToSave.includes(product.category_id))) {
            categoriesToSave.push(product.category_id)
        }
    }
    )

    const mostFrequentCategory = getMostFrequent(categoriesToSave)

    console.log(itemsToSave)
    return {
        author: {
            name: usuario.firm.name,
            lastName: usuario.firm.lastname
        },
        items: itemsToSave,
        categories: mostFrequentCategory
    }
}

// Funcion que obtiene el valor mas frecuente de un array
function getMostFrequent(arr) {
    const hashmap = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {})
    return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
}

// Funcion para formatear el objeto de Item
function formatItemResponse(item, descripcion, categorias) {
    const priceToSave = (item.price.toString()).split(".")
    return {
        author: {
            name: usuario.firm.name,
            lastName: usuario.firm.lastname
        },
        item: {
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: parseInt(priceToSave[0], 10),
                decimals: parseInt(priceToSave[1], 10),
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            sold_quantity: item.sold_quantity,
            description: descripcion.plain_text,
            categories: categorias.path_from_root
        }
    }
}

module.exports = { formatItemResponse, formatSearchResponse }