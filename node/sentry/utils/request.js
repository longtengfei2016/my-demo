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
            Authorization: 'Bearer fef3777bf485423380f59e57896e5f97881b185ef4a44c5ab308554500857c77'
        }
    }
    const requestOptions = Object.assign(defaultOptions, options)
    request(requestOptions, function (error, response, body) {
        callback(error, response, body)
    })
}

module.exports = Request