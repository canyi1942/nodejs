function jsonMiddleWare(options) {
    return (req, resp, next) => {
        const method = req.method
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            req.setEncoding('utf-8')

            let data = ''
            req.on('data', (chunk) => {
                console.log('chunk', chunk)
                data += chunk
            })

            req.on('end', () => {
                try {
                    console.log('origin str', data)
                    req.body = JSON.parse(data)
                    console.log('json.parse', req.body)
                    next()
                } catch (error) {
                    resp.status(400).send('invaid json')
                }
            })

            req.on('error', (error) => {
                next(error)
            })
        } else {
            next()
        }
    }
}

module.exports = jsonMiddleWare