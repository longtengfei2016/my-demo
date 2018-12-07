var request = require('request')
const host = 'http://47.94.211.9:9000'
/**
 * Request方法
 */
function Request(url, options = {}, callback = null) {
	var defaultOptions = {
        url: `${host}${url}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 46e692c17a45408fb5c40178b4e75229ba945c92c82b4c2e977fc707ad1f94fb'
        }
    }
    const requestOptions = Object.assign(defaultOptions, options)
    request(requestOptions, function (error, response, body) {
        callback(error, response, body)
    })
}

module.exports = Request