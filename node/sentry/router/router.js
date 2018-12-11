var router = require('express').Router()
var querystring = require('querystring')
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
            res.send(body);
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
            res.send(body);
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
router.get('/projects/:organizationName/:projectName/stats',function(req, res){
    const organizationName = req.params.organizationName
    const projectName = req.params.projectName
    request(`/api/0/projects/${organizationName}/${projectName}/stats/`, {}, (error, response, body) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!error && response.statusCode !== 200) {
            res.send(body);
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
 * @ type 异常类型
 * @ level 异常级别
 */
router.post('/projects/:organizationName/:projectName/issues',function(req, res){
    const organizationName = req.params.organizationName
    const projectName = req.params.projectName
    let queryStr = ''
    if (req.body) {
        let connectStr = ''
        Object.keys(req.body).forEach((key) => {
            if (key !== 'sort') {
                if (key === 'keyword') {
                    connectStr += (connectStr.length > 0 ? ` ${req.body[key]}` : `${req.body[key]}`)
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
            res.send(body);
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
            res.send(body);
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
            res.send(body);
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