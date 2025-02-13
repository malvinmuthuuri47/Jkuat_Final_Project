const auditModel = require('../models/auditModel')

const methodMappers = {
    "GET": "Fetching",
    "POST": "Adding",
    "PUT": "Updating",
    "DELETE": "Deleting"
}

exports.logAuditTrails = (req, res, next) => {
    try {
        const originalJson = res.json
        res.json = async function (body) {
            console.log(req)
            await auditModel.create({
                url: req.originalUrl,
                activity: methodMappers[req.method] + ' ' + req.originalUrl.split("/")[req.originalUrl.split("/").length - 1] || "",
                params: JSON.stringify(req.params),
                query: JSON.stringify(req.query),
                payload: JSON.stringify(req.body),
                response: JSON.stringify(body)
            })
            return originalJson.call(this, body)
        }
        next()
    } catch (error) {
        console.log("An error occurred logging audit trail")
        console.log(error.message)
        next()
    }
}