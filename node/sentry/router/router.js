var router = require('express').Router()
var querystring = require('querystring')
var moment = require('moment')
var request = require('../utils/request')

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authentication,Origin, X-Requested-With, Content-Type, Accept,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method == 'OPTIONS') {
        // 让options请求快速返回
        res.sendStatus(200);
    } else {
        next(); 
    }
});
router.use(function(req, res, next){
    console.log('router intercept')
    const m = new Date();
    const dateString = `${m.getFullYear()}/${m.getMonth() +
        1}/${m.getDate()}  ${m.getHours()}:${m.getMinutes()}:${m.getSeconds()}`;
    console.log('Time: ', dateString);
    next();
})

// 获取项目列表
router.get('/projects',function(req, res){
    request('/api/0/projects/', {}, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.json({
                code: response.statusCode,
                result: 'error',
                data: JSON.parse(body)
            })
        } else {
            res.json({
                code: '200',
                result: 'success',
                data: JSON.parse(body)
            })
        }
    })
})

// 获取项目详情
router.get('/projects/:organizationName/:projectName',function(req, res){
    const organizationName = req.params.organizationName
    const projectName = req.params.projectName
    request(`/api/0/projects/${organizationName}/${projectName}/`, {}, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.json({
                code: response.statusCode,
                result: 'error',
                data: JSON.parse(body)
            })
        } else {
            res.json({
                code: '200',
                result: 'success',
                data: JSON.parse(body)
            })
        }
    })
})

// 获取项目issue统计数据
/**
 * body
 * @ since 统计开始时间
 * @ resolution 时间片 一小时时间片: 10s  一天时间片: 1h  一周时间片: 1d
 */
router.post('/projects/:organizationName/:projectName/stats',function(req, res){
    const organizationName = req.params.organizationName
    const projectName = req.params.projectName
    let queryStr = ''
    if (req.body) {
        if (Object.keys(req.body).length !== 2) {
            console.error('参数缺省');
            return;
        }
        Object.keys(req.body).forEach((key) => {
            if (key === 'since') {
                // 转为unix毫秒数
                req.body[key] = moment(req.body[key]).unix()
            }
        })
        queryStr = `?${querystring.stringify(req.body)}`
    }
    request(`/api/0/projects/${organizationName}/${projectName}/stats/${queryStr}`, {}, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.json({
                code: response.statusCode,
                result: 'error',
                data: JSON.parse(body)
            })
        } else {
            res.json({
                code: '200',
                result: 'success',
                data: JSON.parse(body)
            })
        }
    })
})

// 获取issue列表
/**
 * body
 * @ sort 排序方式: 时间倒序 date 时间顺序 new 异常频繁次数 freq
 * @ keyword 关键字
 * @ logger 异常类型
 * @ level 异常级别
 * @ release 版本
 * @ device 设备
 * @ rangeTime 异常时间
 */
router.post('/projects/:organizationName/:projectName/issues',function(req, res){
    const organizationName = req.params.organizationName
    const projectName = req.params.projectName
    let queryStr = ''
    if (req.body) {
        let connectStr = ''
        Object.keys(req.body).forEach((key) => {
            if (key !== 'sort' && req.body[key]!=='') {
                if (key === 'keyword') {
                    connectStr += (connectStr.length > 0 ? ` ${req.body[key]}` : `${req.body[key]}`)
                } else if (key === 'rangeTime') {
                    if (req.body[key] && req.body[key].length > 0) {
                        // 转为2018-08-18T08:18:18格式
                        const startTime = moment(req.body[key][0]).format('YYYY-MM-DDTHH:mm:ss')
                        const endTime = moment(req.body[key][1]).format('YYYY-MM-DDTHH:mm:ss')
                        const timeQuery = `event.timestamp:>${startTime} event.timestamp:<${endTime}`
                        connectStr += (connectStr.length > 0 ? ` ${timeQuery}` : `${timeQuery}`)
                    }
                } else {
                    connectStr += (connectStr.length > 0 ? ` ${key}:${req.body[key]}` : `${key}:${req.body[key]}`)
                }
            }
        })
        const postQuery = { sort: req.body.sort || 'date', query: connectStr}
        queryStr = `?${querystring.stringify(postQuery)}`
    }
    request(`/api/0/projects/${organizationName}/${projectName}/issues/${queryStr}`, {}, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.json({
                code: response.statusCode,
                result: 'error',
                data: JSON.parse(body)
            })
        } else {
            res.json({
                code: '200',
                result: 'success',
                data: JSON.parse(body)
            })
        }
    })
})

// 获取issue详情
router.get('/issues/:id',function(req, res){
    const id = req.params.id
    request(`/api/0/issues/${id}/`, {}, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.json({
                code: response.statusCode,
                result: 'error',
                data: JSON.parse(body)
            })
        } else {
            res.json({
                code: '200',
                result: 'success',
                data: JSON.parse(body)
            })
        }
    })
})

// 更新issue详情
router.post('/issues/:id',function(req, res){
    const id = req.params.id
    request(`/api/0/issues/${id}/`, { method: 'PUT', body: JSON.stringify(req.body) }, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.json({
                code: response.statusCode,
                result: 'error',
                data: JSON.parse(body)
            })
        } else {
            res.json({
                code: '200',
                result: 'success',
                data: JSON.parse(body)
            })
        }
    })
})

// 获取issue最新的event详情
router.get('/issues/:id/events/latest',function(req, res){
    const id = req.params.id
    request(`/api/0/issues/${id}/events/latest/`, {}, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.json({
                code: response.statusCode,
                result: 'error',
                data: JSON.parse(body)
            })
        } else {
            res.json({
                code: '200',
                result: 'success',
                data: JSON.parse(body)
            })
        }
    })
})

// 获取搜索条件下拉列表值
/**
 * body
 * @ name 搜索条件名称: type, level, logger, release, user, url, browser, browser.name, device, device.family, os, os.name, 
 */
router.post('/projects/:organizationName/:projectName/tags',function(req, res){
    const organizationName = req.params.organizationName
    const projectName = req.params.projectName
    let tagName = ''
    if (req.body) {
        tagName = req.body.name
    }
    request(`/api/0/projects/${organizationName}/${projectName}/tags/${tagName}/values/?query=`, {}, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.json({
                code: response.statusCode,
                result: 'error',
                data: JSON.parse(body)
            })
        } else {
            res.json({
                code: '200',
                result: 'success',
                data: JSON.parse(body)
            })
        }
    })
})

// 获取项目成员
router.get('/projects/:organizationName/:projectName/members',function(req, res){
    const organizationName = req.params.organizationName
    const projectName = req.params.projectName
    request(`/api/0/projects/${organizationName}/${projectName}/members/`, {}, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.json({
                code: response.statusCode,
                result: 'error',
                data: JSON.parse(body)
            })
        } else {
            res.json({
                code: '200',
                result: 'success',
                data: JSON.parse(body)
            })
        }
    })
})
module.exports = router;